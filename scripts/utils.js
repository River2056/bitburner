import { HOME } from "./constants";

/** @param {import(".").NS} ns */
export function openPorts(host, ns) {
  const home = "home";
  if (ns.getServerNumPortsRequired(host) != 0) {
    if (ns.fileExists("BruteSSH.exe", home)) ns.brutessh(host);
    if (ns.fileExists("FTPCrack.exe", home)) ns.ftpcrack(host);
    if (ns.fileExists("relaySMTP.exe", home)) ns.relaysmtp(host);
    if (ns.fileExists("HTTPWorm.exe", home)) ns.httpworm(host);
    if (ns.fileExists("SQLInject.exe", home)) ns.sqlinject(host);
  }
}

/** @param {import(".").NS} ns */
export function nuke(host, ns) {
  if (!ns.hasRootAccess(host)) {
    ns.tprintf(`no root access on target ${host}`);
    const hostServerInfo = ns.getServer(host);
    if (hostServerInfo.openPortCount >= ns.getServerNumPortsRequired(host)) {
      ns.tprintf(`enough ports opened, attempting to nuke target ${host}...`);
      if (ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel()) {
        ns.tprintf(`hacking levels meets requirement, nuking...`);
        ns.nuke(host);
        ns.tprintf(`target ${host} nuke successful`);
        return true;
      }
    } else {
      ns.tprintf(`not enough ports opened on target ${host}, aborting...`);
      return false;
    }
  }

  // already has root access
  return true;
}

/** @param {import(".").NS} ns */
export function exec(name = "", host = "", moneyThresh = 0.2, securityThresh = 5, ns) {
  if (!host) {
    ns.tprintf(`please provide host name!`);
    return;
  }

  if (!name) {
    ns.tprintf(`please provide script name!`);
    return;
  }

  const availableServerRam =
    ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const threadsToOpen = Math.floor(
    availableServerRam / ns.getScriptRam(name, HOME)
  );

  if (threadsToOpen > 0) {
    ns.exec(name, host, threadsToOpen, host, moneyThresh, securityThresh);
    ns.tprintf(`server available ram: ${availableServerRam}`);
    ns.tprintf(`script ram: ${ns.getScriptRam(name, HOME)}`);
    ns.tprintf(
      `successfully ran ${name} on target ${host} with ${threadsToOpen} threads`
    );
  }
}
