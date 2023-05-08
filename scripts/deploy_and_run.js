import { openPorts, nuke, exec } from "./utils";
import { HOME, MINER, CUSTOM_SERVER, HACKNET_SERVER } from "./constants";

/** @param {import(".").NS} ns */
export function deployAndRun(node, ns, moneyThresh, securityThresh) {
  const servers = new Set();
  const queue = [];
  const activatedServers = [];

  if (!servers.has(node)) servers.add(node);
  const networks = ns.scan(node).filter((n) => !servers.has(n));
  networks.forEach((n) => queue.push(n));

  while (queue.length > 0) {
    const host = queue.shift();
    if (host.startsWith(CUSTOM_SERVER) || host.startsWith(HACKNET_SERVER))
      continue;
    ns.rm(MINER, host);
    if (!ns.scp(MINER, host, HOME)) {
      ns.tprintf(`failed to scp ${MINER} to target ${host}`);
    }

    ns.killall(host);
    openPorts(host, ns);

    if (!ns.hasRootAccess(host)) {
      ns.tprintf(`no root access on target ${host}`);
      if (nuke(host, ns)) {
        exec(MINER, host, moneyThresh, securityThresh, ns);
        activatedServers.push(host);
      }
    } else {
      ns.tprintf(`target ${host} has root access, running script...`);
      exec(MINER, host, moneyThresh, securityThresh, ns);
      activatedServers.push(host);
    }

    servers.add(host);
    ns.scan(host)
      .filter((f) => !servers.has(f))
      .forEach((fh) => queue.push(fh));
  }

  return activatedServers;
};

/** @param {import(".").NS} ns */
export async function main(ns) {
  const commandArgs = ns.flags([
    ["money", 0.2],
    ["secr", 5],
  ]);
  const activatedServers = deployAndRun(
    ns.getHostname(),
    ns,
    commandArgs.money,
    commandArgs.secr
  );
  ns.tprintf("activated servers: ");
  activatedServers.unshift("");
  ns.tprintf(activatedServers.map((elem, index) => index !== 0 && index % 5 === 0 ? elem + "\n" : elem).join(" "));
  ns.tprintf(`activated server count: ${activatedServers.length}`);
}
