import { HOME, MINER, MINER_CUSTOM } from "./constants";

/** @param {import(".").NS} ns */
export async function main(ns) {
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
        if (p.filename === MINER || p.filename === MINER_CUSTOM) {
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
  let len = Math.max(
    ...runningServers.map((s) => new String(s.args + "").length),
    "offlineMoneyMade".length
  );
  len += 4;

  const header = `|${formatString(len, "server")}|${formatString(
    len,
    "args"
  )}|${formatString(len, "ramUsage")}|${formatString(
    len,
    "threads"
  )}|${formatString(len, "onlineMoneyMade")}|${formatString(
    len,
    "offlineMoneyMade"
  )}|`;

  ns.tprintf("-".repeat(header.length));
  ns.tprintf(header);
  ns.tprintf("-".repeat(header.length));
  for (const server of runningServers) {
    let content = `|${formatString(len, server.name)}|${formatString(
      len,
      server.args + ""
    )}|${formatString(len, server.ramUsage + "")}|${formatString(
      len,
      server.threads + ""
    )}|${formatString(
      len,
      server.onlineMoneyMade.toLocaleString("en-US")
    )}|${formatString(len, server.offlineMoneyMade.toLocaleString("en-US"))}|`;
    ns.tprintf(content);
    totalAmount += server.onlineMoneyMade;
    totalAmount += server.offlineMoneyMade;
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
  ns.tprintf("-".repeat(header.length));
  ns.tprintf(`total amount earned: ${totalAmount.toLocaleString("en-US")}`);
}

export function formatString(formatLength, s) {
  return " ".repeat(2) + s + " ".repeat(formatLength - s.length - 2);
}
