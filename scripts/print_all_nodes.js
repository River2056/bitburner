import { findEveryNodeServer } from "./utils";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const nodes = findEveryNodeServer(ns);
  nodes.forEach(server => {
    ns.tprintf(`hostname: ${server.hostname}`);
    ns.tprintf(`level required: ${ns.getServerRequiredHackingLevel(server.hostname)}`);
    ns.tprintf(`route: ${server.route}`);
    ns.tprint(server);
  });
}
