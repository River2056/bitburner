/** @param {import(".").NS} ns */
const toastMsg = {
  INFO: "info",
  SUCCESS: "success",
};

/**
 * @param {string} mode modes
 * @param {number} pct money percentage
 * @param {() => void} costFunction cost function
 * @param {() => void} purchaseFunction purchase function
 * @param {import(".").NS} ns
 */
const hacknet = async (mode, pct, costFunction, purchaseFunction, ns) => {
  let nodesOwned;
  let nodeStats;
  const { print, tprint, getPlayer } = ns;
  const { numNodes } = ns.hacknet;
  const { INFO, SUCCESS } = toastMsg;
  switch (mode) {
    case "node":
      while (getPlayer().money * (pct / 100) > costFunction()) {
        print(`purchasing new hacknet node`, INFO, 1000);
        purchaseFunction();
        print(`total nodes owned: ${ns.hacknet.numNodes()}`, SUCCESS, 1000);
      }
      break;
    case "level":
    case "ram":
    case "cores":
    case "cache":
      nodesOwned = numNodes();
      for (let i = 0; i < nodesOwned; i++) {
        while (getPlayer().money * (pct / 100) > costFunction(i, 1)) {
          print(`upgrade hacknet node ${i} level`, INFO, 1000);
          purchaseFunction(i, 1);
          nodeStats = ns.hacknet.getNodeStats(i);
          print(`hacknet node ${i} ${mode}: ${nodeStats[mode]}`, SUCCESS, 1000);
        }
      }
      break;
    default:
      tprint(
        "please provide a valid argument, e.g. --mode [node, level, ram, cores]",
      );
      return;
  }

  print(`current player money: ${ns.getPlayer().money}`);
};

/**
 *  @param {import(".").NS} ns
 * */
const getFunctions = (mode, ns) => {
  const functionSets = {
    node: {
      cost: ns.hacknet.getPurchaseNodeCost,
      purchase: ns.hacknet.purchaseNode,
    },
    level: {
      cost: ns.hacknet.getLevelUpgradeCost,
      purchase: ns.hacknet.upgradeLevel,
    },
    ram: {
      cost: ns.hacknet.getRamUpgradeCost,
      purchase: ns.hacknet.upgradeRam,
    },
    cores: {
      cost: ns.hacknet.getCoreUpgradeCost,
      purchase: ns.hacknet.upgradeCore,
    },
    cache: {
      cost: ns.hacknet.getCacheUpgradeCost,
      purchase: ns.hacknet.upgradeCache,
    },
  };

  return functionSets[mode];
};

export async function main(ns) {
  const args = ns.flags([
    ["mode", ""],
    ["pct", 50],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprint(
      "continuously purchase hacknet nodes with percentage provided (defaults to 50%)",
    );
    ns.tprint("--mode ==> which mode to run, e.g. node, level, ram, cores");
    ns.tprint("--pct ==> percentage of money delegated to script, e.g. 50");
    ns.tprint("> run hacknet.js --mode level --pct 50");
  }

  const modeFunctions = getFunctions(args.mode, ns);
  while (true) {
    hacknet(
      args.mode,
      args.pct,
      modeFunctions.cost,
      modeFunctions.purchase,
      ns,
    );
    await ns.sleep(1000);
  }
}
