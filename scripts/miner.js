/** @param {import(".").NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const moneyThresh = ns.getServerMaxMoney(target) * ns.args[1];
  const securityThresh = ns.getServerMinSecurityLevel(target) + ns.args[2];

  while (true) {
    let hacked = await ns.hack(target);
    if (hacked <= 0) {
      while (ns.getServerMoneyAvailable(target) < moneyThresh)
        await ns.grow(target);

      while (
        ns.getServerSecurityLevel(target) > securityThresh &&
        ns.getServerRequiredHackingLevel(target) < ns.getHackingLevel()
      ) {
        await ns.weaken(target);
      }
    }
  }
}
