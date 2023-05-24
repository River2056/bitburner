import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export function getAvailableRam(ns, host) {
  return ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const serversScriptRam = ns.getScriptRam("servers.js");
  const hacknetScriptRam = ns.getScriptRam("hacknet.js");
  const autoEverythingScriptRam = ns.getScriptRam("auto_everything.js");
  const totalRamCost =
    serversScriptRam * 2 + hacknetScriptRam * 4 + autoEverythingScriptRam;
  ns.tprint(
    serversScriptRam * 2 + hacknetScriptRam * 4 + autoEverythingScriptRam
  );

  if (ns.getServerMaxRam(HOME) > totalRamCost + 10) {
    ns.run("auto_all_hacknet.js");
    ns.run("servers.js", 1, "--mode", "server");
    ns.run("servers.js", 1, "--mode", "ram");
    ns.run("auto_everything.js");
    ns.tprint(`SUCCESS rerun all essential scripts!`);
  } else {
    while (true) {
      if (
        ns.getRunningScript(
          "hacknet.js",
          HOME,
          "--mode",
          "node",
          "--pct",
          50
        ) == null &&
        getAvailableRam(ns, HOME) > hacknetScriptRam
      )
        ns.run("hacknet.js", 1, "--mode", "node", "--pct", 50);
      if (
        ns.getRunningScript(
          "hacknet.js",
          HOME,
          "--mode",
          "level",
          "--pct",
          50
        ) == null &&
        getAvailableRam(ns, HOME) > hacknetScriptRam
      )
        ns.run("hacknet.js", 1, "--mode", "level", "--pct", 50);
      if (
        ns.getRunningScript("hacknet.js", HOME, "--mode", "ram", "--pct", 50) ==
          null &&
        getAvailableRam(ns, HOME) > hacknetScriptRam
      )
        ns.run("hacknet.js", 1, "--mode", "ram", "--pct", 50);
      if (
        ns.getRunningScript(
          "hacknet.js",
          HOME,
          "--mode",
          "cores",
          "--pct",
          50
        ) == null &&
        getAvailableRam(ns, HOME) > hacknetScriptRam
      )
        ns.run("hacknet.js", 1, "--mode", "cores", "--pct", 50);
      if (
        ns.getRunningScript(
          "hacknet.js",
          HOME,
          "--mode",
          "cache",
          "--pct",
          50
        ) == null &&
        getAvailableRam(ns, HOME) > hacknetScriptRam
      )
        ns.run("hacknet.js", 1, "--mode", "cache", "--pct", 50);

      if (
        ns.getRunningScript("servers.js", HOME, "--mode", "ram") == null &&
        getAvailableRam(ns, HOME) > serversScriptRam
      )
        ns.run("servers.js", 1, "--mode", "ram");
      if (
        ns.getRunningScript("servers.js", HOME, "--mode", "server") == null &&
        getAvailableRam(ns, HOME) > serversScriptRam
      )
        ns.run("servers.js", 1, "--mode", "server");

      if (
        ns.getRunningScript("auto_everything.js") == null &&
        getAvailableRam(ns, HOME) > serversScriptRam
      )
        ns.run("auto_everything.js");

      if (ns.getRunningScript("spend_hashes.js", HOME, "--type", "corpFund", "--loop", "true") == null && getAvailableRam(ns, HOME) > ns.getScriptRam("spend_hashes.js"))
        ns.run("spend_hashes.js", 1, "--type", "corpFund", "--loop", "true");

      if (ns.ps(HOME).length > 9) {
        ns.tprint(`SUCCESS running all essential scripts`);
        return;
      }

      await ns.sleep(1000);
    }
  }
}
