/** @param {NS} ns */
export async function main(ns) {
  ns.run("hacknet.js", 1, "--mode", "node", "--pct", 50);
  ns.run("hacknet.js", 1, "--mode", "level", "--pct", 50);
  ns.run("hacknet.js", 1, "--mode", "ram", "--pct", 50);
  ns.run("hacknet.js", 1, "--mode", "cores", "--pct", 50);
}
