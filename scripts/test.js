/** @param {import(".").NS} ns*/
export async function main(ns) {
  ns.tprint("hello world");
  ns.tprint(ns.ps("home"));
  ns.tprint("changed");
}
