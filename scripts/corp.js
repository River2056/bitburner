const CITIES = ["Aevum", "Chongqing", "Sector-12", "New Tokyo", "Ishima", "Volhaven"]
const JOBS = {"Operations":0,"Engineer":0,"Business":0,"Management":0,"Research & Development":0,"Intern":0,"Unassigned":0}

/** @param {import(".").NS} ns*/
function checkDivisionStats(ns) {
  const corp = ns.corporation.getCorporation();
  corp.divisions.forEach(division => {
    CITIES.forEach(city => {
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
  const hire = (ns, division, city, employeesCount = 0) => {
    count = employeesCount;
    if (count % 5 === 0)
      ns.corporation.hireEmployee(division, city, "Engineer");
    else if (count % 3 === 0 && ns.corporation.getDivision(division).products.length > 0)
      ns.corporation.hireEmployee(division, city, "Business");
    else if (count % 50 === 0)
      ns.corporation.hireEmployee(division, city, "Management");
    else
      ns.corporation.hireEmployee(division, city, "Operations");

    count++;
  }

  return hire;
}

/** @param {import(".").NS} ns*/
function upgradeOffice(ns, division, city) {
  ns.corporation.upgradeOfficeSize(division, city, 3);
}

/** @param {import(".").NS} ns*/
async function manageCorporation(ns) {
  ns.disableLog("sleep");
  if (!ns.corporation.hasCorporation()) {
    ns.tprintf(`currently has no corporation yet! create one in city hall!`);
    return;
  }

  let hire = hireEmployee(ns);
  
  while (true) {
    let corporation = ns.corporation.getCorporation();
    corporation.divisions.forEach(division => {
      CITIES.forEach(city => {
        try {
          ns.corporation.upgradeOfficeSize(division, city, 3);
          hire(ns, division, city, ns.corporation.getOffice(division, city).employees);
        } catch (error) {
          ns.printf(`${division} has not expanded to ${city} yet`);
        }
      });
    });
    await ns.sleep(1000);
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
