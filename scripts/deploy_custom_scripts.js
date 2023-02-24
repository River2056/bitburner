import { openPorts, nuke } from "./utils";
import { HOME, MINER_CUSTOM, CUSTOM_SERVER } from "./constants";

/** @param {import(".").NS} ns
 * @param {string} host
 * */
function findMostProfitableTarget(host, ns) {
  const servers = new Set();
  const queue = [];
  let maxServerMoney = 0;
  let profitableServer = "";

  servers.add(host);
  ns.scan(host)
    .filter((s) => !s.startsWith(CUSTOM_SERVER) && !servers.has(s))
    .forEach((s) => queue.push(s));

  while (queue.length > 0) {
    const child = queue.shift();
    if (
      ns.getServerRequiredHackingLevel(child) <= ns.getHackingLevel() &&
      ns.getServerMaxMoney(child) > maxServerMoney
    ) {
      maxServerMoney = Math.max(maxServerMoney, ns.getServerMaxMoney(child));
      profitableServer = child;
    }

    servers.add(child);
    ns.scan(child)
      .filter((s) => !s.startsWith(CUSTOM_SERVER) && !servers.has(s))
      .forEach((s) => queue.push(s));
  }

  return profitableServer;
}

/** @param {import(".").NS} ns
 * @param {string} target
 * @param {string} mode
 * @param {string[]} list
 * */
function deployCustomAndRun(target, mode, list, ns) {
  const memRequired = ns.getScriptRam(MINER_CUSTOM, HOME);
  if (memRequired > ns.getServerMaxRam(host)) {
    ns.tprintf(`script required memory larger than server itself!`);
    return;
  }
  const servers = new Set();
  const queue = [];

  if (list && list.length > 0) queue.push(...list);

  while (queue.length > 0) {
    const host = queue.shift();
    if (!servers.has(host)) servers.add(host);

    ns.rm(MINER_CUSTOM, host);
    if (!ns.scp(MINER_CUSTOM, host, HOME)) {
      ns.tprintf(`failed to scp ${MINER_CUSTOM} to host ${host}`);
      return;
    }

    ns.killall(host);
    const threads = Math.floor(
      (ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / memRequired
    );
    ns.exec(MINER_CUSTOM, host, threads, "--target", target, "--mode", mode);
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

  const purchasedServers = ns.getPurchasedServers();
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
  openPorts(profitableServer, ns);
  nuke(profitableServer, ns);
  if (!args.mode) {
    deployCustomAndRun(profitableServer, "grow", growServers, ns);
    deployCustomAndRun(profitableServer, "weaken", weakenServers, ns);
    deployCustomAndRun(profitableServer, "hack", hackServers, ns);
  } else {
    deployCustomAndRun(profitableServer, args.mode, growServers, ns);
    deployCustomAndRun(profitableServer, args.mode, weakenServers, ns);
    deployCustomAndRun(profitableServer, args.mode, hackServers, ns);
  }
}
