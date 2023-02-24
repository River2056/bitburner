/** @param {import(".").NS} ns */
export async function main(ns) {
  const args = ns.flags([
    ["target", ""],
    ["mode", ""],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprintf("custom script that runs specific task on a focus target");
    ns.tprintf("e.g. run miner_custom.js --target foodnstuff --mode grow");
    ns.tprintf("**only works on custom servers for the moment**");
    return;
  }

  if (args && !args.target) {
    ns.tprintf("please provide target to perform task!");
    ns.tprintf("e.g. run miner_custom.js --target foodnstuff");
    return;
  }

  if (args && !args.mode) {
    ns.tprintf("please provide which mode to perform!");
    ns.tprintf("e.g. run miner_custom.js --mode grow");
    return;
  }

  while (true) {
    switch (args.mode) {
      case "grow":
        await ns.grow(args.target, { stock: true });
        break;
      case "weaken":
        await ns.weaken(args.target, { stock: true });
        break;
      case "hack":
        if (
          ns.getServerRequiredHackingLevel(args.target) > ns.getHackingLevel()
        ) {
          ns.tprintf("hacking level did not meet required server level!");
          ns.tprintf(
            `server: ${
              args.target
            }, required level: ${ns.getServerRequiredHackingLevel(
              args.target
            )}, hacking level: ${ns.getHackingLevel()}`
          );
          break;
        }

        await ns.hack(args.target, { stock: true });
        break;
    }
  }
}
