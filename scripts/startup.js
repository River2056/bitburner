import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export function getAvailableRam(ns, host) {
  return ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
}

/**
 * @param {import(".").NS} ns
 * @param {number} count
 * */
export function runScript(ns, scriptName, ...args) {
  if (
    ns.getRunningScript(scriptName, HOME, ...args) === null &&
    getAvailableRam(ns, HOME) > ns.getScriptRam(scriptName)
  ) {
    ns.run(scriptName, 1, ...args);
  }
  return 1;
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  while (true) {
    let count = 0;
    count += runScript(ns, "hacknet.js", "--mode", "node", "--pct", 50);
    count += runScript(ns, "hacknet.js", "--mode", "level", "--pct", 50);
    count += runScript(ns, "hacknet.js", "--mode", "ram", "--pct", 50);
    count += runScript(ns, "hacknet.js", "--mode", "cores", "--pct", 50);
    count += runScript(ns, "hacknet.js", "--mode", "cache", "--pct", 50);

    count += runScript(ns, "servers.js", "--mode", "ram");
    count += runScript(ns, "servers.js", "--mode", "server");

    count += runScript(ns, "auto_everything.js");

    count += runScript(
      ns,
      "spend_hashes.js",
      "--type",
      "corpFund",
      "--loop",
      "true"
    );
    count += runScript(
      ns,
      "spend_hashes.js",
      "--type",
      "money",
      "--loop",
      "true"
    );
    count += runScript(
      ns,
      "spend_hashes.js",
      "--type",
      "improveStudy",
      "--loop",
      "true"
    );
    count += runScript(
      ns,
      "spend_hashes.js",
      "--type",
      "exchangeCorpResearch",
      "--loop",
      "true"
    );

    // count += runScript(ns, "gang.js");
    count += runScript(ns, "corp.js");

    if (ns.ps(HOME).length > count) {
      ns.tprint(`SUCCESS running all essential scripts`);
      return;
    }

    await ns.sleep(1000);
  }
}
