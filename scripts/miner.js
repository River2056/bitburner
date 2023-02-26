/** @param {import(".").NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const maxMoney = ns.getServerMaxMoney(target);
  const minSecurity = ns.getServerMinSecurityLevel(target);
  const moneyThresh = maxMoney * ns.args[1];
  const securityThresh = minSecurity + ns.args[2];
  ns.printf(`server available money: ${ns.getServerMoneyAvailable(target).toLocaleString("en-US")}`);
  ns.printf(`server security level: ${ns.getServerMinSecurityLevel(target)}`);

  while (true) {
    let hacked = await ns.hack(target, { stock: true });
    if (hacked <= 0) {
      while (ns.getServerMoneyAvailable(target) < moneyThresh) {
        ns.printf(`target server max money: ${maxMoney.toLocaleString("en-US")}`);
        await ns.grow(target, { stock: true });
        ns.printf(`done growing, server money: ${ns.getServerMoneyAvailable(target).toLocaleString("en-US")}`);
      }

      while (
        ns.getServerSecurityLevel(target) > securityThresh &&
        ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel()
      ) {
        ns.printf(`target min security: ${minSecurity}`);
        await ns.weaken(target, { stock: true });
        ns.printf(`done weaken, server security: ${ns.getServerSecurityLevel(target)}`);
      }
    }
  }
}
