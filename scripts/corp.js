const CITIES = [
  "Aevum",
  "Chongqing",
  "Sector-12",
  "New Tokyo",
  "Ishima",
  "Volhaven",
];

const possibleDivisionNames = {
  Software: [
    "Google",
    "Netflix",
    "Facebook",
    "Microsoft",
    "Apple",
    "Amazon",
    "Trend Micro",
  ],
  Restaurant: [
    "Habour",
    "Eatogether",
    "Buffalo City",
    "Gustoso",
    "Din Tai Fung",
  ],
  Tobacco: ["Seven Stars", "Mevius", "Mild Seven", "Japan Tobacco"],
  Pharmaceutical: ["Umbrella", "Neo Umbrella", "Tricell"],
};
possibleDivisionNames["Real Estate"] = [
  "FundHive",
  "Sinyi Realty",
  "Eastern Realty",
  "YonQin Realty",
];
possibleDivisionNames["Computer Hardware"] = ["Intel", "Nvidia", "MSI", "ASUS"];

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
  const products = ns.corporation.getDivision(division).products;
  const hasFullyDeveloped = products.filter(
    (product) =>
      ns.corporation.getProduct(division, city, product).developmentProgress >=
      100
  );
  const hasProduct = hasFullyDeveloped.length > 0;
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
function manageProducts(ns, division, city) {
  const products = ns.corporation.getDivision(division).products;

  if (products.length > 0) {
    products.forEach((product) => {
      if (
        ns.corporation.getProduct(division, city, product)
          .developmentProgress >= 100
      ) {
        ns.corporation.sellProduct(division, city, product, "MAX", "MP", true);
        try {
          ns.corporation.setProductMarketTA1(division, product, true);
          ns.corporation.setProductMarketTA2(division, product, true);
        } catch (error) {
          ns.print(`no market ta available`);
        }
      }
    });
  }

  try {
    if (ns.corporation.getDivision(division).makesProducts) {
      const designBudget = (Math.floor(Math.random() * 5) + 1) * 1000000000;
      const marketBudget = (Math.floor(Math.random() * 5) + 1) * 1000000000;
      ns.corporation.makeProduct(
        division,
        city,
        division + products.length + 1,
        designBudget,
        marketBudget
      );
    }
  } catch (error) {
    ns.print(`already reach maximum products! ${products.length}`);
  }
}

/** @param {import(".").NS} ns*/
function expandCities(ns, division) {
  const citiesOfDivision = ns.corporation.getDivision(division).cities;
  if (citiesOfDivision.length < CITIES.length) {
    const citiesNotExpanded = CITIES.filter(
      (city) => !citiesOfDivision.includes(city)
    );
    citiesNotExpanded.forEach((city) => {
      ns.corporation.expandCity(division, city);
    });
  }
}

/** @param {import(".").NS} ns*/
function hireAdvert(ns, division) {
  if (
    ns.corporation.getCorporation().funds >
    ns.corporation.getHireAdVertCost(division)
  )
    ns.corporation.hireAdVert(division);
}

/** @param {import(".").NS} ns*/
function purchaseUnlocks(ns) {
  const constants = ns.corporation.getConstants();
  constants.unlockNames.forEach((unlock) => {
    if (
      !ns.corporation.hasUnlock(unlock) &&
      ns.corporation.getCorporation().funds >
      ns.corporation.getUnlockCost(unlock)
    )
      ns.corporation.purchaseUnlock(unlock);
  });
}

/** @param {import(".").NS} ns*/
function autoResearch(ns, division) {
  const researchNames = ns.corporation.getConstants().researchNames;
  researchNames.forEach((research) => {
    if (
      !ns.corporation.hasResearched(division, research) &&
      ns.corporation.getResearchCost(division, research) <
      ns.corporation.getDivision(division).researchPoints
    )
      ns.corporation.research(division, research);
  });
}

/** @param {import(".").NS} ns*/
function expandIndustries(ns) {
  if (ns.corporation.getCorporation().divisions.length >= 16) return;

  const industryNames = ns.corporation.getConstants().industryNames;
  const pickFromNames = industryNames.filter((name) =>
    Object.keys(possibleDivisionNames).includes(name)
  );
  const selectedIndustry =
    pickFromNames[Math.floor(Math.random() * pickFromNames.length)];
  const divisionNames = possibleDivisionNames[selectedIndustry];
  try {
    ns.corporation.expandIndustry(
      selectedIndustry,
      divisionNames[Math.floor(Math.random() * divisionNames.length)] +
      "_" +
      Date.now()
    );
  } catch (error) {
    ns.print("ERROR unable to expand! check if you have space to expand");
  }
}

/** @param {import(".").NS} ns*/
function manageCorpStocks(ns) {
  let previousSellPrice = 0;

  /** @param {import(".").NS} ns*/
  const manageStocks = () => {
    if (ns.corporation.getCorporation().shareSaleCooldown !== 0) return;

    const eightyPercentShares = Math.floor(
      ns.corporation.getCorporation().totalShares * 0.8
    );
    if (ns.corporation.getCorporation().numShares < eightyPercentShares) {
      ns.print("don't have enough shares to sell, skip");
      return;
    }

    if (
      ns.corporation.getCorporation().sharePrice < 1000000 ||
      previousSellPrice > ns.corporation.getCorporation().sharePrice
    ) {
      ns.print("share prices too low, skip");
      return;
    }

    previousSellPrice = ns.corporation.getCorporation().sharePrice;
    ns.corporation.sellShares(eightyPercentShares);
    try {
      ns.corporation.issueNewShares();
    } catch (error) {
      ns.print("unable to issue new shares, check if it's on cooldown");
    }

    if (ns.corporation.getCorporation().sharePrice < previousSellPrice) {
      let sharesToBuyBack = Math.floor(
        ns.getPlayer().money / ns.corporation.getCorporation().sharePrice
      );
      const notOwned =
        ns.corporation.getCorporation().totalShares -
        ns.corporation.getCorporation().numShares;
      sharesToBuyBack = sharesToBuyBack > notOwned ? notOwned : sharesToBuyBack;
      ns.corporation.buyBackShares(sharesToBuyBack);
    }
  };

  return manageStocks;
}

/** @param {import(".").NS} ns*/
function manageDivisions(ns) {
  const divisions = ns.corporation.getCorporation().divisions;
  divisions.sort((a, b) => {
    return (
      ns.corporation.getDivision(a).lastCycleRevenue -
      ns.corporation.getDivision(b).lastCycleRevenue
    );
  });

  // unable to sell divisions programatically, print out result to sell manually
  ns.print(`lowest profit division: ${divisions[0]}`);
  ns.print(
    `profit: ${ns.corporation.getDivision(divisions[0]).lastCycleRevenue}`
  );
}

/** @param {import(".").NS} ns*/
async function manageCorporation(ns) {
  ns.disableLog("sleep");
  if (!ns.corporation.hasCorporation()) {
    ns.tprintf(`currently has no corporation yet! create one in city hall!`);
    return;
  }

  let hire = hireEmployee(ns);
  const manageStocks = manageCorpStocks(ns);
  let counter = 0;

  while (true) {
    let corporation = ns.corporation.getCorporation();
    corporation.divisions.forEach((division) => {
      CITIES.forEach((city) => {
        try {
          expandIndustries(ns);
          upgradeWarehouse(ns, division, city);
          ns.corporation.upgradeOfficeSize(division, city, 3);
          hire(ns, division, city);
          levelCorporationUpgrades(ns);

          if (counter % 10 === 0) redistributeEmployees(ns, division, city);
          manageProducts(ns, division, city);
          ns.corporation.setSmartSupply(division, city, true);
          expandCities(ns, division);

          if (counter % (60 * 60) === 0) hireAdvert(ns, division);
          autoResearch(ns, division);
          purchaseUnlocks(ns);
          manageStocks();
          manageDivisions(ns);
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
  ns.tprint(ns.corporation.getCorporation().shareSaleCooldown);
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  // checkDivisionStats(ns);
  const args = ns.flags([
    ["sell", false],
    ["buy", false],
    ["test", false],
    ["amount", Math.ceil(ns.corporation.getCorporation().numShares / 2)],
  ]);

  if (args && args.sell) {
    // const originalSharePrice = ns.corporation.getCorporation().sharePrice;
    try {
      if (ns.corporation.getCorporation().numShares > 0) {
        const sharesToSell = parseInt(args.amount);
        ns.corporation.sellShares(sharesToSell);
        await ns.sleep(5 * 1000);
        ns.tprint(`sold success`);
      }
    } catch (error) {
      ns.tprint(
        `sold unsuccessful, either not enough shares or sell shares on cooldown`
      );
      ns.tprint(error);
    }
    return;
  }

  if (args && args.buy) {
    try {
      // if (ns.corporation.getCorporation().sharePrice < originalSharePrice) {
      ns.tprint(`start buying back`);
      const buyBackAmount = Math.floor(
        ns.getPlayer().money / ns.corporation.getCorporation().sharePrice
      );
      ns.tprint(`buyBackAmount: ${buyBackAmount}`);
      const notOwned =
        ns.corporation.getCorporation().totalShares -
        ns.corporation.getCorporation().numShares;
      ns.tprint(`notOwned: ${notOwned}`);
      ns.corporation.buyBackShares(
        buyBackAmount > notOwned ? notOwned : buyBackAmount
      );
      // }
    } catch (error) {
      ns.tprint(`buy unsuccessful`);
      ns.tprint(error);
    }
    return;
  }

  if (args && args.test) {
    test(ns);
    return;
  }

  await manageCorporation(ns);
}
