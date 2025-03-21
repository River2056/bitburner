import { HOME } from "./constants";
import { findEveryNodeServer } from "./utils"

/** @type {import(".").NS} ns */
let ns = null;
let print = null;

export async function main(_ns) {
  ns = _ns;
  print = ns.tprintf;
  const servers = findEveryNodeServer(ns).filter(c => c.hostname !== HOME);

  for (const target of servers) {
    const hackPercent = ns.formulas.hacking.hackPercent(target, ns.getPlayer());
    const targetServer = ns.getServer(target.hostname);
    const growThreads = ns.formulas.hacking.growThreads(target, ns.getPlayer(), targetServer.moneyMax);
    ns.formulas.hacking.growAmount
    print("target: %s", target.hostname);
    print("hack percent: %s", hackPercent);
    print("growThreads: %s", growThreads);
  }
}
