/** @param {import(".").NS} ns*/
export async function main(ns) {
  ns.tprint("purchase and upgrade servers script");
  ns.tprint(ns.getPurchasedServers());
  ns.tprint(ns.getPurchasedServerCost(Math.pow(2, 1)));
}
