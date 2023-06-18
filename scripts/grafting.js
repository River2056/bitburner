/** @param {import(".").NS} ns*/
function manageGrafting(ns) {
  if (ns.singularity.isBusy()) {
    ns.print("currently busy with something...");
    ns.print("abort...");
    return;
  }

  try {
    ns.singularity.travelToCity("New Tokyo");
  } catch (error) {
    ns.print(`unable to travel to New Tokyo, error: ${error}`);
    ns.print("check if you are already in New Tokyo");
  }

  const availableGraftings = ns.grafting.getGraftableAugmentations();
  availableGraftings.sort((a, b) => {
    const compareA = ns.grafting.getAugmentationGraftTime(a) * ns.grafting.getAugmentationGraftPrice(a);
    const compareB = ns.grafting.getAugmentationGraftTime(b) * ns.grafting.getAugmentationGraftPrice(b);
    return compareA - compareB;
  });

  ns.grafting.graftAugmentation(availableGraftings[0], false);
}

/** @param {import(".").NS} ns*/
function test(ns) {
  const availableGraftings = ns.grafting.getGraftableAugmentations();
  availableGraftings.sort((a, b) => {
    const compareA = ns.grafting.getAugmentationGraftTime(a) * ns.grafting.getAugmentationGraftPrice(a);
    const compareB = ns.grafting.getAugmentationGraftTime(b) * ns.grafting.getAugmentationGraftPrice(b);
    return compareA - compareB;
  });

  ns.tprint(availableGraftings);
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["test", false]
  ]);

  if (args && args.test) {
    test(ns);
    return;
  }

  while (true) {
    manageGrafting(ns);
    await ns.sleep(1000);
  }
}

