/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["pct", 50],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprint(
      "continuously purchase augmentations with percentage provided (defaults to 50%)",
    );
    ns.tprint("--pct ==> percentage of money delegated to script, e.g. 50");
    ns.tprint("> run purchase_all_augmentations.js --pct 50");
    return;
  }

  while (true) {
    checkFactionInvitations(ns);
    purchaseFactionAugmentations(args.pct, ns);
    await ns.sleep(1000);
  }
}

/**
 * @param {import(".").NS} ns NetScript functions
 */
function checkFactionInvitations(ns) {
  const factionInvitations = ns.singularity.checkFactionInvitations();
  ns.printf("faction invites: %s", factionInvitations);
  const ownedAugmentations = ns.singularity.getOwnedAugmentations();
  for (const faction of factionInvitations) {
    const augmentations = ns.singularity
      .getAugmentationsFromFaction(faction)
      .filter((aug) => aug !== "NeuroFlux Governor")
      .filter((aug) => !ownedAugmentations.includes(aug));
    if (augmentations && augmentations.length > 0) {
      const joined = ns.singularity.joinFaction(faction);
      if (joined) {
        ns.printf("SUCCESS successfully joined faction %s", faction);
      }
    }
  }
}

/**
 * @param {number} pct minimum percentage of money to operate
 * @param {import(".").NS} ns NetScript functions
 */
function purchaseFactionAugmentations(pct, ns) {
  const ownedAugmentations = ns.singularity.getOwnedAugmentations(true);
  const joinedFactions = ns.getPlayer().factions;
  for (const faction of joinedFactions) {
    const augmentations = ns.singularity
      .getAugmentationsFromFaction(faction)
      .filter((aug) => aug !== "NeuroFlux Governor")
      .filter((aug) => !ownedAugmentations.includes(aug));

    ns.printf(
      "faction: %s, augmentations not owned: %s",
      faction,
      augmentations,
    );
    const factionRep = ns.singularity.getFactionRep(faction);

    for (const aug of augmentations) {
      const augPrice = ns.singularity.getAugmentationPrice(aug);
      const repRequired = ns.singularity.getAugmentationRepReq(aug);
      if (
        ns.getPlayer().money * (pct / 100) >= augPrice &&
        factionRep >= repRequired
      ) {
        const purchased = ns.singularity.purchaseAugmentation(faction, aug);
        if (purchased) {
          ns.printf("SUCCESS Augmentation: %s successfully purchased", aug);
        } else {
          ns.printf(
            "ERROR Augmentation: %s purchase failed, required rep: %d, required money: %d",
            aug,
          );
          ns.printf(
            "WARNING faction: %s, required rep: %d, required money: %d",
            faction,
            repRequired - factionRep,
            augPrice - ns.getPlayer().money,
          );
        }
      }
    }
  }
}
