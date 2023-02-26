import { findMostProfitableTarget } from "./utils";
import { HOME, MINER } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const threads = Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME)) / ns.getScriptRam(MINER));
  if (ns.isRunning(MINER, HOME, HOME, 0.8, 0)) {
    ns.scriptKill(MINER, HOME);
  }

  const target = findMostProfitableTarget(HOME, ns);
  ns.run(MINER, threads, target, 0.8, 0);
}

