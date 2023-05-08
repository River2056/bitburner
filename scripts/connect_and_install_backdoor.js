import { openPorts, nuke, findEveryNodeServer } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const nodes = findEveryNodeServer(ns).filter(
    (node) =>
      !node.hostname.startsWith("hacknet") && !node.hostname.startsWith("home")
  );
  for (const node of nodes) {
    openPorts(node.hostname, ns);
    nuke(node.hostname, ns);
    const routeArr = node.route.split(" > ");
    for (const r of routeArr) {
      if (ns.singularity.connect(r)) {
        if (
          r !== HOME &&
          !ns.getServer(r).backdoorInstalled &&
          ns.getHackingLevel() >= ns.getServer(r).requiredHackingSkill &&
          ns.getServer(r).openPortCount >= ns.getServer(r).numOpenPortsRequired
        ) {
          await ns.singularity.installBackdoor();
          ns.tprintf(`done installing backdoor on ${r}`);
        }
      }
    }
  }
  const installedBackdoorNodes = findEveryNodeServer(ns)
    .filter(node => !node.hostname.startsWith("hacknet") && !node.hostname.startsWith("home") && node.backdoorInstalled)
    .map(serverObj => serverObj.hostname);
  ns.tprintf(`backdoor installed: ${installedBackdoorNodes}`);
}
