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
  ns.tprintf("----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
  ns.tprintf("|\tservers\t|\targs\t|\tramUsage\t|\tthreads\t|\tonlineMoneyMade\t|\tofflineMoneyMade\t");
  ns.tprintf("----------------------------------------------------------------------------------------------------------------------------------------------------------------------");
  for (const server of runningServers) {
    ns.tprintf(`|\t${server.name}\t|`);
    /* ns.tprintf("----------------------------");
    ns.tprintf(`server: ${server.name}`);
    ns.tprintf(`args: ${server.args}`);
    ns.tprintf(`ramUsage: ${server.ramUsage}`);
    ns.tprintf(`threads: ${server.threads}`);
    ns.tprintf(`onlineExpGained: ${server.onlineExpGained}`);
    totalAmount += server.onlineMoneyMade;
    ns.tprintf(
      `onlineMoneyMade: ${server.onlineMoneyMade.toLocaleString("en-US")}`
    );
    ns.tprintf(`onlineRunningTime: ${server.onlineRunningTime}`);
    ns.tprintf(`offlineExpGained: ${server.offlineExpGained}`);
    totalAmount += server.offlineMoneyMade;
    ns.tprintf(
      `offlineMoneyMade: ${server.offlineMoneyMade.toLocaleString("en-US")}`
    );
    ns.tprintf(`offlineRunningTime: ${server.offlineRunningTime}`);
    ns.tprintf("----------------------------"); */
  }
  ns.tprintf(`total amount earned: ${totalAmount.toLocaleString("en-US")}`);
}
