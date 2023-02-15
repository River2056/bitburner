/** @param {import(".").NS} ns */
const scriptName = "miner.js";
const home = "home";

const execCustomScript = (host, moneyThresh, securityThresh, ns) => {
  const availableServerRam =
    ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const threadsToOpen = Math.floor(
    availableServerRam / ns.getScriptRam(scriptName, home)
  );

  if (threadsToOpen > 0) {
    ns.exec(scriptName, host, threadsToOpen, host, moneyThresh, securityThresh);
    ns.tprint(`server available ram: ${availableServerRam}`);
    ns.tprint(`script ram: ${ns.getScriptRam(scriptName, home)}`);
    ns.tprint(
      `successfully ran ${scriptName} on target ${host} with ${threadsToOpen} threads`
    );
  }
};

const deployAndRun = (node, ns, moneyThresh, securityThresh) => {
  const servers = new Set();
  const queue = [];
  const activatedServers = [];

  if (!servers.has(node)) servers.add(node);
  const networks = ns.scan(node).filter((n) => !servers.has(n));
  networks.forEach((n) => queue.push(n));

  while (queue.length > 0) {
    const host = queue.shift();
    ns.rm(scriptName, host);
    if (!ns.scp(scriptName, host, home)) {
      ns.tprint(`failed to scp ${scriptName} to target ${host}`);
    }

    ns.killall(host);

    if (ns.getServerNumPortsRequired(host) != 0) {
      if (ns.fileExists("BruteSSH.exe", home)) ns.brutessh(host);
      if (ns.fileExists("FTPCrack.exe", home)) ns.ftpcrack(host);
      if (ns.fileExists("relaySMTP.exe", home)) ns.relaysmtp(host);
      if (ns.fileExists("HTTPWorm.exe", home)) ns.httpworm(host);
      if (ns.fileExists("SQLInject.exe", home)) ns.sqlinject(host);
    }

    if (!ns.hasRootAccess(host)) {
      ns.tprint(`no root access on target ${host}`);
      const hostServer = ns.getServer(host);
      if (hostServer.openPortCount === ns.getServerNumPortsRequired(host)) {
        ns.tprint(`enough ports opened, attempting to nuke target ${host}...`);
        if (ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel()) {
          ns.tprint(`hacking levels meets requirement, nuking...`);
          ns.nuke(host);
          ns.tprint(`target ${host} nuke successful`);
          execCustomScript(host, moneyThresh, securityThresh, ns);
          activatedServers.push(host);
        }
      } else {
        ns.tprint(`not enough ports opened on target ${host}, aborting...`);
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
