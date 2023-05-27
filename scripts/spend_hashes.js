import { hacknetHashTarget } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  ns.disableLog("sleep");
  const args = ns.flags([
    ["type", "money"],
    ["loop", false],
  ]);

  if (!args) {
    ns.tprintf("money argument not specified, aborting...");
    ns.tprintf(
      "specifiy argument money to spend all hashes in exchange for maximum money"
    );
    ns.tprintf("> run spendHashes.js --money true");
    ns.tprintf("specify --loop true => for continuous run of script");
    ns.tprintf(`total hashes in store: ${ns.hacknet.numHashes()}`);
    return;
  }

  const TYPE = hacknetHashTarget(args.type);

  while (true) {
    const totalHashes = ns.hacknet.numHashes();
    const moneyCostHash = ns.hacknet.hashCost(TYPE);
    if (totalHashes > moneyCostHash) {
      const purchaseResult = ns.hacknet.spendHashes(
        TYPE,
        HOME,
        Math.floor(totalHashes / moneyCostHash)
      );
      const msg = `SUCCESS succeded in exchanging all hashes for ${TYPE}: $${
        Math.floor(totalHashes / moneyCostHash) * 1000000
      }`;
      if (purchaseResult) {
        if (args && args.loop) ns.printf(msg);
        else {
          ns.tprintf(msg);
          return;
        }
      }
    }
    await ns.sleep(1000);
  }
}
