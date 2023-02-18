import utils from "./utils";
import c from "./constants";
const scriptName = "miner.js";
const home = "home";

/** @param {import(".").NS} ns */
const execCustomScript = (host, moneyThresh, securityThresh, ns) => {
  const availableServerRam =
    ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const threadsToOpen = Math.floor(
    availableServerRam / ns.getScriptRam(c.MINER, c.HOME)
  );

  if (threadsToOpen > 0) {
    ns.exec(c.MINER, host, threadsToOpen, host, moneyThresh, securityThresh);
    ns.tprint(`server available ram: ${availableServerRam}`);
    ns.tprint(`script ram: ${ns.getScriptRam(c.MINER, c.HOME)}`);
    ns.tprint(
      `successfully ran ${c.MINER} on target ${host} with ${threadsToOpen} threads`
    );
  }
};

/** @param {import(".").NS} ns */
const deployAndRun = (node, ns, moneyThresh, securityThresh) => {
  const servers = new Set();
  const queue = [];
  const activatedServers = [];

  if (!servers.has(node)) servers.add(node);
  const networks = ns.scan(node).filter((n) => !servers.has(n));
  networks.forEach((n) => queue.push(n));

  while (queue.length > 0) {
    const host = queue.shift();
    ns.rm(c.MINER, host);
    if (!ns.scp(c.MINER, host, c.HOME)) {
      ns.tprint(`failed to scp ${c.MINER} to target ${host}`);
    }

    ns.killall(host);
    utils.openPorts(host, ns);

    if (!ns.hasRootAccess(host)) {
      ns.tprint(`no root access on target ${host}`);
      if (utils.nuke(host, ns)) {
        execCustomScript(host, moneyThresh, securityThresh, ns);
        activatedServers.push(host);
      }
    } else {
      ns.tprint(`target ${host} has root access, running script...`);
      execCustomScript(host, moneyThresh, securityThresh, ns);
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
  ns.tprint("activated servers: ", activatedServers);
  ns.tprint(`activated server count: ${activatedServers.length}`);
}
