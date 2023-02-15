/** @param {import(".").NS} ns */
export async function main(ns) {
  const HOME = "home";
  const MINER = "miner.js";
  const hasVisited = new Set();
  const queue = [];
  const runningServers = [];

  function recursiveScan(host, scriptRunningServers) {
    const children = ns.scan(host);
    if (hasVisited.has(host)) hasVisited.add(host);

    children.forEach((c) => queue.push(c));
    while (queue.length > 0) {
      const server = queue.shift();
      const processes = ns.ps(server);
      processes.forEach((p) => {
        if (p.filename === MINER) {
          const serverInfo = ns.getRunningScript(p.pid, server);
          scriptRunningServers.push({
            name: serverInfo.server,
            args: serverInfo.args,
            ramUsage: serverInfo.ramUsage,
            threads: serverInfo.threads,
            onlineExpGained: serverInfo.onlineExpGained,
            onlineMoneyMade: serverInfo.onlineMoneyMade,
            onlineRunningTime: serverInfo.onlineRunningTime,
            offlineExpGained: serverInfo.offlineExpGained,
            offlineMoneyMade: serverInfo.offlineMoneyMade,
            offlineRunningTime: serverInfo.offlineRunningTime,
          });
        }
      });
      hasVisited.add(server);
      ns.scan(server)
        .filter((s) => !hasVisited.has(s))
        .forEach((s) => {
          queue.push(s);
        });
    }
  }

  recursiveScan(HOME, runningServers);

  let totalAmount = 0;
  for (const server of runningServers) {
    ns.tprint("----------------------------");
    ns.tprint(`server: ${server.name}`);
    ns.tprint(`args: ${server.args}`);
    ns.tprint(`ramUsage: ${server.ramUsage}`);
    ns.tprint(`threads: ${server.threads}`);
    ns.tprint(`onlineExpGained: ${server.onlineExpGained}`);
    totalAmount += server.onlineMoneyMade;
    ns.tprint(
      `onlineMoneyMade: ${server.onlineMoneyMade.toLocaleString("en-US")}`
    );
    ns.tprint(`onlineRunningTime: ${server.onlineRunningTime}`);
    ns.tprint(`offlineExpGained: ${server.offlineExpGained}`);
    totalAmount += server.offlineMoneyMade;
    ns.tprint(
      `offlineMoneyMade: ${server.offlineMoneyMade.toLocaleString("en-US")}`
    );
    ns.tprint(`offlineRunningTime: ${server.offlineRunningTime}`);
    ns.tprint("----------------------------");
  }
  ns.tprint(`total amount earned: ${totalAmount.toLocaleString("en-US")}`);
}
