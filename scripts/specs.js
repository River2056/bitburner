/** @param {import(".").NS} ns*/
export async function main(ns) {
  const purchasedServers = ns.getPurchasedServers();
  purchasedServers.forEach((ps) => {
    const server = ns.getServer(ps);
    ns.tprintf(
      `server: ${server.hostname} ram: ${server.maxRam} next: ${ns
        .getPurchasedServerUpgradeCost(
          server.hostname,
          Math.pow(server.maxRam, 2)
        )
        .toLocaleString("en-US")}`
    );
  });

  if (purchasedServers.length < ns.getPurchasedServerLimit()) {
    ns.tprintf("\n");
    ns.tprintf(
      `next server cost: ${ns
        .getPurchasedServerCost(Math.pow(2, 1))
        .toLocaleString("en-US")}`
    );
  }
}
