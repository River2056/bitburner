/** @param {import(".").NS} ns */
const recursiveScan = (parent, server, target, route, ns) => {
  const children = ns.scan(server);
  for (const child of children) {
    if (child === parent) continue;

    if (child === target) {
      route.unshift(child);
      route.unshift(server);
      return true;
    }

    if (recursiveScan(server, child, target, route, ns)) {
      route.unshift(server);
      return true;
    }
  }
  return false;
};

export async function main(ns) {
  const args = ns.flags([["help", false]]);
  const route = [];
  const target = args._[0];
  if (!target || args.help) {
    ns.tprint("recursive finds server on the network.");
    ns.tprint("e.g. > run find_server.js n00dles");
    ns.tprint("// home > n00dles");
  }

  recursiveScan("", "home", target, route, ns);
  if (route) {
    ns.tprint("routes: ");
    ns.tprint(route.join(" > "));
  }
}
