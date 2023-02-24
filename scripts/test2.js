/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["target", ""],
    ["mode", ""],
    ["list", []],
    ["help", false],
  ]);

  ns.tprintf(args.list);
}
