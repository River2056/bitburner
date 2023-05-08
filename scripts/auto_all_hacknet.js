/** @param {import(".").NS} ns */
export async function main(ns) {
  const args = ns.flags([["pct", 50]]);
  ns.run("hacknet.js", 1, "--mode", "node", "--pct", args.pct);
  ns.run("hacknet.js", 1, "--mode", "level", "--pct", args.pct);
  ns.run("hacknet.js", 1, "--mode", "ram", "--pct", args.pct);
  ns.run("hacknet.js", 1, "--mode", "cores", "--pct", args.pct);
  ns.run("hacknet.js", 1, "--mode", "cache", "--pct", args.pct);
}
