const CITIES = [
  "Aevum",
  "Chongqing",
  "Sector-12",
  "New Tokyo",
  "Ishima",
  "Volhaven",
];
const JOBS = {
  Operations: 0,
  Engineer: 0,
  Business: 0,
  Management: 0,
  "Research & Development": 0,
  Intern: 0,
  Unassigned: 0,
};

/** @param {import(".").NS} ns*/
function checkDivisionStats(ns) {
  const corp = ns.corporation.getCorporation();
  corp.divisions.forEach((division) => {
    CITIES.forEach((city) => {
      try {
        ns.tprint(ns.corporation.getOffice(division, city));
      } catch (error) {
        ns.tprintf(`${division} has not expanded to ${city} yet`);
      }
    });
  });
}

/**
 * @param {import(".").NS} ns
 * */
function hireEmployee(ns) {
  let count = 0;

  /**
   * @param {import(".").NS} ns
   * @param {string} division
   * @param {string} city
   * @param {number} employeesCount
   * */
  const hire = (ns, division, city) => {
    if (count % 5 === 0)
      ns.corporation.hireEmployee(division, city, "Engineer");
    else if (
      count % 3 === 0 &&
      ns.corporation.getDivision(division).products.length > 0
    )
      ns.corporation.hireEmployee(division, city, "Business");
    else if (count % 50 === 0)
      ns.corporation.hireEmployee(division, city, "Management");
    else ns.corporation.hireEmployee(division, city, "Operations");

    count++;
  };

  return hire;
}

/** @param {import(".").NS} ns*/
function upgradeWarehouse(ns, division, city) {
  if (!ns.corporation.hasWarehouse(division, city)) {
    ns.corporation.purchaseWarehouse(division, city);
  }

  const warehouse = ns.corporation.getWarehouse(division, city);
  if (warehouse.size - warehouse.sizeUsed < 500)
    ns.corporation.upgradeWarehouse(division, city);
}

/** @param {import(".").NS} ns*/
function levelCorporationUpgrades(ns) {
  const constants = ns.corporation.getConstants();
  const upgradeables = constants.upgradeNames.map((corpUpgradeName) => {
    const obj = {};
    obj[corpUpgradeName] = ns.corporation.getUpgradeLevel(corpUpgradeName);
    return obj;
  });
  const entries = Object.entries(upgradeables);

  entries.sort((a, b) => Object.values(a[1])[0] - Object.values(b[1])[0]);
  entries.forEach((corpUpgradeNameObj) => {
    const upgradeName = Object.keys(corpUpgradeNameObj[1])[0];
    if (
      ns.corporation.getCorporation().funds >
      ns.corporation.getUpgradeLevelCost(upgradeName)
    )
      ns.corporation.levelUpgrade(upgradeName);
  });
}

/** @param {import(".").NS} ns*/
function redistributeEmployees(ns, division, city) {
  const office = ns.corporation.getOffice(division, city);
  const employees = office.numEmployees;

  ns.corporation.setAutoJobAssignment(division, city, "Intern", 0);
  ns.corporation.setAutoJobAssignment(division, city, "Operations", 0);
  ns.corporation.setAutoJobAssignment(division, city, "Engineer", 0);
  ns.corporation.setAutoJobAssignment(division, city, "Business", 0);
  ns.corporation.setAutoJobAssignment(division, city, "Management", 0);
  ns.corporation.setAutoJobAssignment(
    division,
    city,
    "Research & Development",
    0
  );
  const hasProduct = ns.corporation.getDivision(division).products.length > 0;
  const operations = Math.ceil(employees / 5);
  const business = hasProduct
    ? Math.ceil(employees / 2)
    : Math.ceil(employees / 10);
  const management = hasProduct
    ? Math.ceil(employees / 20)
    : Math.ceil(employees / 50);
  const researchAndDevelopment = hasProduct ? Math.ceil(employees / 100) : 0;
  const engineer = hasProduct
    ? Math.ceil(employees / 5)
    : employees - (operations + business + management + researchAndDevelopment);

  // ns.corporation.setAutoJobAssignment(division, city, "Unassigned", 0);
  ns.corporation.setAutoJobAssignment(division, city, "Operations", operations);
  ns.corporation.setAutoJobAssignment(division, city, "Engineer", engineer);
  ns.corporation.setAutoJobAssignment(division, city, "Business", business);
  ns.corporation.setAutoJobAssignment(division, city, "Management", management);
  ns.corporation.setAutoJobAssignment(
    division,
    city,
    "Research & Development",
    researchAndDevelopment
  );

  const remainingJobs = ns.corporation.getOffice(division, city).employeeJobs;
  if (remainingJobs["Intern"] > 0 || remainingJobs["Unassigned"] > 0) {
    if (hasProduct)
      ns.corporation.setAutoJobAssignment(
        division,
        city,
        "Business",
        remainingJobs["Business"] +
          remainingJobs["Intern"] +
          remainingJobs["Unassigned"]
      );
    else
      ns.corporation.setAutoJobAssignment(
        division,
        city,
        "Operations",
        remainingJobs["Operations"] +
          remainingJobs["Intern"] +
          remainingJobs["Unassigned"]
      );
  }
}

/** @param {import(".").NS} ns*/
async function manageCorporation(ns) {
  ns.disableLog("sleep");
  if (!ns.corporation.hasCorporation()) {
    ns.tprintf(`currently has no corporation yet! create one in city hall!`);
    return;
  }

  let hire = hireEmployee(ns);
  let counter = 0;

  while (true) {
    let corporation = ns.corporation.getCorporation();
    corporation.divisions.forEach((division) => {
      CITIES.forEach((city) => {
        try {
          upgradeWarehouse(ns, division, city);
          ns.corporation.upgradeOfficeSize(division, city, 3);
          hire(ns, division, city);
          levelCorporationUpgrades(ns);

          if (counter % 10 === 0) redistributeEmployees(ns, division, city);
        } catch (error) {
          // ns.tprint(`error occurred: ${error}`);
          ns.printf(`${division} has not expanded to ${city} yet`);
        }
      });
    });
    await ns.sleep(1000);
    counter++;
  }
}

/** @param {import(".").NS} ns*/
function test(ns) {
  ns.tprint();
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  // checkDivisionStats(ns);
  await manageCorporation(ns);
}
