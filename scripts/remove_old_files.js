/** @param {NS} ns */
const servers = new Set();
servers.add("home");

const removeFiles = (scriptName, host, ns) => {
  if (!servers.has(host)) servers.add(host);
  const networks = ns.scan(host).filter((n) => !servers.has(n));
  if (networks.length > 0) {
    networks.forEach((n) => removeFiles(scriptName, n, ns));
  } else {
    if (ns.fileExists(scriptName, host)) ns.rm(scriptName, host);
  }
};

export async function main(ns) {
  removeFiles(ns.args[0], ns.getHostname(), ns);
}
