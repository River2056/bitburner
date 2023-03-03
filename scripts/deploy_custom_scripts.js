import { findProfitableTargets } from "./utils";
import { HOME, MINER } from "./constants";

/** @param {import(".").NS} ns
 * @param {string} target
 * @param {string} mode
 * @param {string[]} list
 * */
function deployCustomAndRun(target, host, moneyThreshold, securityThreshold, ns) {
  const memRequired = ns.getScriptRam(MINER, HOME);

  ns.rm(MINER, host)
  if (!ns.scp(MINER, host, HOME)) {
    ns.tprintf(`failed to scp ${MINER} to host ${host}`);
    return;
  }

  ns.killall(host);
  const threads = Math.floor(
    (ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / memRequired
  );
  ns.exec(MINER, host, threads, target, moneyThreshold, securityThreshold);
  ns.tprintf(`deployed on server: ${host}, ram ${ns.getServerMaxRam(host)}, target is ${target}, ${threads} threads, target max money: ${ns.getServerMaxMoney(target).toLocaleString("en-US")}`);
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["money", 0.8],
    ["security", 0],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprintf("deploys miner.js on a custom server");
    ns.tprintf("will automatically figure out most profitable servers to deploy script");
    ns.tprintf("e.g. run deploy_custom_scripts.js");
    ns.tprintf("eatra arguments can flexibily control monetThreshold and sercurityThreshold");
    ns.tprintf("e.g. run deploy_custom_scripts.js --money 0.9 (default 0.8) --securiry 5 (default 0)");
    ns.tprintf("**only works on custom servers for the moment**");
    return;
  }

  const purchasedServers = ns.getPurchasedServers()
    .filter(ps => ns.getServer(ps).maxRam > ns.getScriptRam(MINER, HOME));

  if (purchasedServers == null || purchasedServers.length <= 0) {
    ns.tprintf(`not enough servers that meets miner script requirement!`);
    return;
  }

  const profitableServers = findProfitableTargets(ns);
  for (let i = 0; i < purchasedServers.length; i++) {
    deployCustomAndRun(
      profitableServers[i % profitableServers.length].hostname,
      purchasedServers[i],
      args.money,
      args.security,
      ns);
  }
}
