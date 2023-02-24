/** @param {import(".").NS} ns*/
export async function main(ns) {
  const purchasedServers = ns.getPurchasedServers();
  purchasedServers.forEach(ps => {
    const server = ns.getServer(ps);
    ns.tprintf(`server: ${server.hostname}, ram: ${server.maxRam}`);
    ns.tprintf(`next upgrade cost: ${ns.getPurchasedServerUpgradeCost(server.hostname, Math.pow(server.maxRam, 2)).toLocaleString("en-US")}`);
  });
}

