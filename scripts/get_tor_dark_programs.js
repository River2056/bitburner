import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const purchasedTor = ns.singularity.purchaseTor();
  ns.tprintf("purchaseTor: %s", purchasedTor);
  if (!purchasedTor) {
    ns.tprint("purchased tor failed, abort...");
    return;
  }

  const allPrograms = ns.singularity.getDarkwebPrograms();
  ns.tprint(allPrograms);

  while (true) {
    allPrograms.forEach((program) => {
      if (!ns.fileExists(program, HOME)) {
        ns.singularity.purchaseProgram(program);
      }
    });

    const allFiles = ns.ls(HOME);
    const ownedFiles = allFiles.filter((file) => allPrograms.includes(file));
    if (allPrograms.length === ownedFiles.length) {
      ns.tprintf(`SUCCESS bought every dark web program`);
      return;
    }
    await ns.sleep(1000);
  }
}
