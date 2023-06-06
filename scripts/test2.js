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
  ns.tprint(ns.corporation.getOffice("Harbour", "Aevum"));
  ns.tprint(ns.corporation.getOffice("Harbour", "Aevum").numEmployees);
  ns.tprint(ns.corporation.getOffice("Harbour", "Aevum").size);
  ns.tprint(ns.corporation.getOffice("Harbour", "Aevum").employeeJobs);

  /* const office = ns.corporation.getOffice("Seven Stars", "Sector-12");
  const employees = office.employeeJobs;
  const totalEmployees = Object.entries(employees).reduce(
    (a, b) => a + b[1],
    0
  );
  ns.tprint(`totalEmployees: ${totalEmployees}`); */
}
