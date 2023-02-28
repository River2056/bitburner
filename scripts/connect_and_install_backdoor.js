import { openPorts, nuke } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const stack = [];
  const visited = new Set();

  stack.push(HOME);
  visited.add(HOME);

  while (stack.length > 0) {
    const host = stack.pop();
    const children = ns.scan(host);
    if (children != undefined && children.length > 0) {

    }
  }
}

/** @param {import(".").NS} ns*/
/* export async function main(ns) {
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
      ns.tprintf(`host: ${host}, install backdoor: ${backdoorSuccessful}`);
      const parent = route.pop();
      ns.singularity.connect(parent);
      connect(parent);
    }
    connect(children[0]);
  }

  await connect(HOME);
} */

