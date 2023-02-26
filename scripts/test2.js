import { findProfitableTargets } from "./utils";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const targets = findProfitableTargets(ns);
  ns.tprint(targets);
}
