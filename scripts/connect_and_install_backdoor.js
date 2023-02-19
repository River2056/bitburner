import { openPorts, nuke } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const route = [];
  const visited = new Set();

  async function connect(host) {
    route.push(host);
    if (!visited.has(host))
      visited.add(host);
    ns.singularity.connect(host);
    const children = ns.scan(host).filter(s => !visited.has(s));
    if (children == null && children.length <= 0) {
      if (host === HOME) return;
      openPorts(host, ns);
      nuke(host, ns);
      const backdoorSuccessful = await ns.singularity.installBackdoor();
      ns.tprint(`host: ${host}, install backdoor: ${backdoorSuccessful}`);
      const parent = route.pop();
      ns.singularity.connect(parent);
      connect(parent);
    }
    connect(children[0]);
  }

  await connect(HOME);
}

