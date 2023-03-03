import { HOME } from "./constants";
import { recursiveScan } from "./utils";

/** @param {import(".").NS} ns */
export async function main(ns) {
  const args = ns.flags([["help", false]]);
  const route = [];
  const target = args._[0];
  if (!target || args.help) {
    ns.tprint("recursive finds server on the network.");
    ns.tprint("e.g. > run find_server.js n00dles");
    ns.tprint("// home > n00dles");
  }

  recursiveScan("", HOME, target, route, ns);
  if (route) {
    ns.tprint("routes: ");
    ns.tprint(route.join(" > "));
  }
}
