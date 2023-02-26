import { openPorts, nuke, findMostProfitableTarget } from "./utils";
import { HOME, MINER, MINER_CUSTOM, CUSTOM_SERVER } from "./constants";

/** @param {import(".").NS} ns
 * @param {string} target
 * @param {string} mode
 * @param {string[]} list
 * */
function deployCustomAndRun(target, mode, list, ns) {
  const memRequired = ns.getScriptRam(MINER, HOME);
  const servers = new Set();
  const queue = [];

  if (list && list.length > 0) queue.push(...list);

  while (queue.length > 0) {
    const host = queue.shift();
    if (!servers.has(host)) servers.add(host);

    ns.rm(MINER_CUSTOM, host);
    ns.rm(MINER, host)
    if (!ns.scp(MINER, host, HOME)) {
      ns.tprintf(`failed to scp ${MINER} to host ${host}`);
      return;
    }

    ns.killall(host);
    const threads = Math.floor(
      (ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / memRequired
    );
    // ns.exec(MINER_CUSTOM, host, threads, "--target", target, "--mode", mode);
    ns.exec(MINER, host, threads, target, 0.8, 0);
  }
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["target", ""],
    ["mode", ""],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprintf(
      "deploys miner_custom.js that runs specific task on a focus target"
    );
    ns.tprintf("e.g. run deploy_custom_scripts.js --target foodnstuff");
    ns.tprintf("**only works on custom servers for the moment**");
    return;
  }

  const purchasedServers = ns.getPurchasedServers()
    .filter(ps => ns.getServer(ps).maxRam > ns.getScriptRam(MINER, HOME));
  if (purchasedServers.length < 3) {
    ns.tprintf("need at least 3 or more servers to run this script");
    return;
  }
  const hackServers = [];
  for (let i = 0; i < 2; i++) hackServers.push(purchasedServers.shift());

  const groupsLenght = Math.floor(purchasedServers.length / 2);
  const growServers = [];
  for (let i = 0; i < groupsLenght; i++)
    growServers.push(purchasedServers.shift());

  const weakenServers = [];
  for (let i = 0; i < purchasedServers.length; i++)
    weakenServers.push(purchasedServers.shift());

  let profitableServer = findMostProfitableTarget(HOME, ns);
  if (args.target) profitableServer = args.target;
  if (!args.mode) {
    deployCustomAndRun(profitableServer, "grow", growServers, ns);
    deployCustomAndRun(profitableServer, "weaken", weakenServers, ns);
    deployCustomAndRun(profitableServer, "hack", hackServers, ns);
  } else {
    deployCustomAndRun(profitableServer, args.mode, growServers, ns);
    deployCustomAndRun(profitableServer, args.mode, weakenServers, ns);
    deployCustomAndRun(profitableServer, args.mode, hackServers, ns);
  }
  ns.tprintf(`deployed on server: ${profitableServer}`);
}
