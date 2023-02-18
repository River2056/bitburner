const utils = {
  /** @param {import(".").NS} ns */
  openPorts: (host, ns) => {
    const home = "home";
    if (ns.getServerNumPortsRequired(host) != 0) {
      if (ns.fileExists("BruteSSH.exe", home)) ns.brutessh(host);
      if (ns.fileExists("FTPCrack.exe", home)) ns.ftpcrack(host);
      if (ns.fileExists("relaySMTP.exe", home)) ns.relaysmtp(host);
      if (ns.fileExists("HTTPWorm.exe", home)) ns.httpworm(host);
      if (ns.fileExists("SQLInject.exe", home)) ns.sqlinject(host);
    }
  },
  /** @param {import(".").NS} ns */
  nuke: (host, ns) => {
    if (!ns.hasRootAccess(host)) {
      ns.tprint(`no root access on target ${host}`);
      const hostServerInfo = ns.getServer(host);
      if (hostServerInfo.openPortCount >= ns.getServerNumPortsRequired(host)) {
        ns.tprint(`enough ports opened, attempting to nuke target ${host}...`);
        if (ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel()) {
          ns.tprint(`hacking levels meets requirement, nuking...`);
          ns.nuke(host);
          ns.tprint(`target ${host} nuke successful`);
          return true;
        }
      } else {
        ns.tprint(`not enough ports opened on target ${host}, aborting...`);
        return false;
      }
    }

    // already has root access
    return true;
  },
};

export default utils;
