import { hacknetHashTarget } from "./utils";
import { HOME } from "./constants";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([["money", false]]);

  if (!args || !args.money) {
    ns.tprintf("money argument not specified, aborting...");
    ns.tprintf(
      "specifiy argument money to spend all hashes in exchange for maximum money"
    );
    ns.tprintf("> run spendHashes.js --money true");
    ns.tprintf(`total hashes in store: ${ns.hacknet.numHashes()}`);
    return;
  }

  const totalHashes = ns.hacknet.numHashes();
  const moneyCostHash = ns.hacknet.hashCost(hacknetHashTarget("money"));
  if (totalHashes > moneyCostHash) {
    const purchaseResult = ns.hacknet.spendHashes(hacknetHashTarget("money"), HOME, Math.floor(totalHashes / moneyCostHash));
    ns.tprintf(purchaseResult ? "SUCCESS succeded in exchanging all hashed for money" : "ERROR exchange failed!");
  }
}
