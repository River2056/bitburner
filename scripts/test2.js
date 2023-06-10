/** @param {import(".").NS} ns*/
function levelCorporationUpgrades(ns) {
  const constants = ns.corporation.getConstants();
  ns.tprint(constants.upgradeNames);
  constants.upgradeNames.forEach((corpUpgradeName) => {
    ns.tprint(corpUpgradeName);
  });
  // ns.corporation.levelUpgrade();
}

/** @param {import(".").NS} ns*/
function purchaseUnlocks(ns) {
  const constants = ns.corporation.getConstants();
  constants.unlockNames.forEach((unlock) => {
    ns.tprint(unlock);
  });
}

/** @param {import(".").NS} ns*/
function purchaseDarkWebPrograms(ns) {
  ns.tprint(ns.singularity.getDarkwebPrograms());
  ns.tprint(ns.ls("home").find(e => e === "123.js"));
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  purchaseDarkWebPrograms(ns);
  ns.singularity.getAugmentationsFromFaction
  ns.singularity.getAugmentationPrice
  ns.singularity.purchaseAugmentation
}
