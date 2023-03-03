import { openPorts, nuke } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const visited = new Set();
  const route = [];

  async function connect(host) {
    ns.singularity.connect(host);
    route.push();
    const children = ns
      .scan(host)
      .filter((child) => child !== HOME && !visited.has(child));
    if (children.length > 0) {
      connect(children[0]);
    } else {
      ns.tprint(`installing backdoor on host: ${host}`);
      visited.add(host);
      while (route.length > 0) {
        ns.singularity.connect(route.pop());
      }
    }
  }

  const neighbours = ns.scan(HOME);
  /* for () {
    await connect(HOME);
  } */
}
