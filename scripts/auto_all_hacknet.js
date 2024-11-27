import { HOME } from './constants'

/** @param {import(".").NS} ns */
export async function main(ns) {
  const args = ns.flags([["pct", 50]]);
  const hacknetScriptName = "hacknet.js";
  const hacknetScriptCost = ns.getScriptRam(hacknetScriptName)
  if (ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) >= hacknetScriptCost) ns.run("hacknet.js", 1, "--mode", "node", "--pct", args.pct);
  if (ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) >= hacknetScriptCost) ns.run("hacknet.js", 1, "--mode", "level", "--pct", args.pct);
  if (ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) >= hacknetScriptCost) ns.run("hacknet.js", 1, "--mode", "ram", "--pct", args.pct);
  if (ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) >= hacknetScriptCost) ns.run("hacknet.js", 1, "--mode", "cores", "--pct", args.pct);
  if (ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) >= hacknetScriptCost) ns.run("hacknet.js", 1, "--mode", "cache", "--pct", args.pct);
}
