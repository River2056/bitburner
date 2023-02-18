/** @param {import(".").NS} ns*/
const servers = async (name, mode, pct, ns) => {
  switch (mode) {
    case "server":
      if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit() &&
        (ns.getPlayer().money * (pct / 100)) > ns.getPurchasedServerCost(Math.pow(2, 1))) {
        const newServerName = ns.purchaseServer(name, Math.pow(2, 1));
        ns.toast(`purchased new server: ${newServerName} with 2GB ram`);
      }
      break;
    case "ram":
      const serverList = ns.getPurchasedServers();
      serverList.forEach(s => {
        const childServer = ns.getServer(s);
        let totalRam = childServer.maxRam + childServer.ramUsed;
        let currentRamLevel = Math.log2(totalRam);
        if ((ns.getPlayer().money * (pct / 100)) > ns.getPurchasedServerUpgradeCost(s, totalRam * 2)) {
          ns.upgradePurchasedServer(s, totalRam * 2);
          ns.toast(`successfully upgraded server ${s} with ${totalRam * 2}GB ram`);
        }
      });
      break;
  }
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["name", "river"],
    ["mode", ""],
    ["pct", 50],
    ["help", false]
  ]);

  if (!args || args.help) {
    ns.tprint("script to automatically purchase custom servers");
    ns.tprint("sevrer name defaults to river, could provide custom");
    ns.tprint("name via arguments e.g. --name kevin");
    ns.tprint("pct ==> percentage of player money threshold");
    ns.tprint("> run servers.js --name river --mode server --pct 50");
    return;
  }

  if (!args.mode) {
    ns.tprint("please provide mode to continue script");
    ns.tprint("e.g. > run servers.js --mode [server|ram]");
    return;
  }

  while (true) {
    servers(args.name, args.mode, args.pct, ns);
    await ns.sleep(1000);
  }
}

