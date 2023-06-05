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
export async function main(ns) {
  levelCorporationUpgrades(ns);
}
