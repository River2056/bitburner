function clickOnBtn(btn, times) {
  for (let i = 0; i < times; i++) {
    btn.click();
  }
}

function purchaseTopMostAugmentation(index) {
  document
    .querySelector(
      `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${index + 1
      }) > div.MuiBox-root.css-70qvj9 > button`
    )
    .click();
  document
    .querySelector(
      "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
    )
    .click();
  document
    .querySelector(
      "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
    )
    .click();
}

function purchaseAllAugmentation(index = 1) {
  let idx = index;
  let btn = document.querySelector(
    `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${idx + 1
    }) > div.MuiBox-root.css-70qvj9 > button`
  );
  while (btn !== null && !btn.disabled && btn.innerText === "Buy") {
    btn.click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
      )
      .click();
    idx++;
    btn = document.querySelector(
      `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${idx + 1
      }) > div.MuiBox-root.css-70qvj9 > button`
    );
  }
}

function upgradeGovernor(num = 1) {
  for (let i = 0; i < num; i++) {
    document
      .querySelector(
        "#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-wveda5 > div.MuiBox-root.css-70qvj9 > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
      )
      .click();
  }
}

function checkElements() {
  const nodeList = Array.from(document.querySelectorAll(".MuiBox-root"));
  const objs = nodeList.map((e) => Object.entries(e));
  console.log(objs);
  return objs;
}

function hacknetServers(
  index = -1,
  level = 5000,
  maxRam = Math.pow(2, 30),
  cores = Math.pow(2, 26),
  cache = 2500
) {
  const opts = {
    level,
    maxRam,
    cores,
    cache,
  };
  const arr = Array.from(document.querySelectorAll(".MuiBox-root"));
  const obj = arr.map((e) => Object.entries(e));
  const hacknetServerList = obj[obj.length - 1][1][1].children;
  if (index === -1) {
    hacknetServerList.forEach((server) => {
      const node = server.props.node;
      node.level = opts.level;
      node.maxRam = opts.maxRam;
      node.ram = opts.maxRam;
      node.cores = opts.cores;
      node.cache = opts.cache;
    });
    return;
  }
  hacknetServerList.forEach((server, idx) => {
    if (index === idx) {
      const node = server.props.node;
      node.level = opts.level;
      node.maxRam = opts.maxRam;
      node.ram = opts.maxRam;
      node.cores = opts.cores;
      node.cache = opts.cache;
    }
  });
  console.log(hacknetServerList);
}

function gangMembers(index, num) {
  const objs = checkElements();
  const list = objs.map((e) => e[1][1].children); // .filter(arr => arr[0]["key"] !== undefined);

  let member;
  list.forEach((e) => {
    if (Array.isArray(e)) {
      const temp = e.filter(
        (el) =>
          el["key"] !== undefined &&
          el["key"] !== null &&
          el["key"].startsWith("ab")
      );
      if (temp.length > 0) member = temp;
    }
  });
  console.log(member);

  if (index === -1) {
    member.forEach((m) => {
      m.props.member.hack_exp += num; // 1e+200;
      m.props.member.str_exp += num; // 1e+200;
      m.props.member.agi_exp += num; // 1e+200;
      m.props.member.def_exp += num; // 1e+200;
      m.props.member.dex_exp += num; // 1e+200;
    });
    return;
  }

  member.forEach((m, idx) => {
    if (index === idx) {
      m.props.member.hack_exp += num; // 1e+200;
      m.props.member.str_exp += num; // 1e+200;
      m.props.member.agi_exp += num; // 1e+200;
      m.props.member.def_exp += num; // 1e+200;
      m.props.member.dex_exp += num; // 1e+200;
    }
  });
}

function maxFactionRep() {
  const objs = checkElements();
  const obj = objs[5];
  const faction = obj[1][1].children[1].props.children.props;
  console.log(faction);

  faction.faction.playerReputation = Infinity;
}

function exploitHashesInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForMoney = hashList[0];
  console.log(sellForMoney.props.upg);

  sellForMoney.props.upg.cost = 0; // 0.001;
  sellForMoney.props.upg.value = Infinity;
}

function exploitHashesCorpInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForCoprFund = hashList[1];
  console.log(sellForCoprFund.props.upg);

  sellForCoprFund.props.upg.costPerLevel = 0;
  sellForCoprFund.props.upg.value = 9e200;
}

function sleevesRefresh() {
  const propsToLook = ["children", "props", "sleeve"];
  const objs = checkElements();
  const sleeves = [];
  const lookForSleeves = (element) => {
    if (!Array.isArray(element)) {
      for (let key in element) {
        if (propsToLook.includes(key)) {
          if (key === "sleeve") {
            sleeves.push(element[key]);
            break;
          }
          lookForSleeves(element[key]);
        }
      }
    } else {
      for (let arr of element) {
        lookForSleeves(arr);
      }
    }
  };
  lookForSleeves(objs);

  sleeves.forEach(s => {
    s.memory = 100;
    s.sync = 100;
    s.shock = 0;

    for (let e in s.exp) {
      s.exp[e] += 1e+100;
    }
  });
}

function hackingTheGame(player) {
  const AugmentationName = {
    NeuroFluxGovernor: "NeuroFlux Governor",
    Targeting1: "Augmented Targeting I",
    Targeting2: "Augmented Targeting II",
    Targeting3: "Augmented Targeting III",
    SyntheticHeart: "Synthetic Heart",
    SynfibrilMuscle: "Synfibril Muscle",
    CombatRib1: "Combat Rib I",
    CombatRib2: "Combat Rib II",
    CombatRib3: "Combat Rib III",
    NanofiberWeave: "Nanofiber Weave",
    SubdermalArmor: "NEMEAN Subdermal Weave",
    WiredReflexes: "Wired Reflexes",
    GrapheneBoneLacings: "Graphene Bone Lacings",
    BionicSpine: "Bionic Spine",
    GrapheneBionicSpine: "Graphene Bionic Spine Upgrade",
    BionicLegs: "Bionic Legs",
    GrapheneBionicLegs: "Graphene Bionic Legs Upgrade",
    SpeechProcessor: "Speech Processor Implant",
    TITN41Injection: "TITN-41 Gene-Modification Injection",
    EnhancedSocialInteractionImplant: "Enhanced Social Interaction Implant",
    BitWire: "BitWire",
    ArtificialBioNeuralNetwork: "Artificial Bio-neural Network Implant",
    ArtificialSynapticPotentiation: "Artificial Synaptic Potentiation",
    EnhancedMyelinSheathing: "Enhanced Myelin Sheathing",
    SynapticEnhancement: "Synaptic Enhancement Implant",
    NeuralRetentionEnhancement: "Neural-Retention Enhancement",
    DataJack: "DataJack",
    ENM: "Embedded Netburner Module",
    ENMCore: "Embedded Netburner Module Core Implant",
    ENMCoreV2: "Embedded Netburner Module Core V2 Upgrade",
    ENMCoreV3: "Embedded Netburner Module Core V3 Upgrade",
    ENMAnalyzeEngine: "Embedded Netburner Module Analyze Engine",
    ENMDMA: "Embedded Netburner Module Direct Memory Access Upgrade",
    Neuralstimulator: "Neuralstimulator",
    NeuralAccelerator: "Neural Accelerator",
    CranialSignalProcessorsG1: "Cranial Signal Processors - Gen I",
    CranialSignalProcessorsG2: "Cranial Signal Processors - Gen II",
    CranialSignalProcessorsG3: "Cranial Signal Processors - Gen III",
    CranialSignalProcessorsG4: "Cranial Signal Processors - Gen IV",
    CranialSignalProcessorsG5: "Cranial Signal Processors - Gen V",
    NeuronalDensification: "Neuronal Densification",
    NeuroreceptorManager: "Neuroreceptor Management Implant",
    NuoptimalInjectorImplant: "Nuoptimal Nootropic Injector Implant",
    SpeechEnhancement: "Speech Enhancement",
    FocusWire: "FocusWire",
    PCDNI: "PC Direct-Neural Interface",
    PCDNIOptimizer: "PC Direct-Neural Interface Optimization Submodule",
    PCDNINeuralNetwork: "PC Direct-Neural Interface NeuroNet Injector",
    PCMatrix: "PCMatrix",
    ADRPheromone1: "ADR-V1 Pheromone Gene",
    ADRPheromone2: "ADR-V2 Pheromone Gene",
    ShadowsSimulacrum: "The Shadow's Simulacrum",
    HacknetNodeCPUUpload: "Hacknet Node CPU Architecture Neural-Upload",
    HacknetNodeCacheUpload: "Hacknet Node Cache Architecture Neural-Upload",
    HacknetNodeNICUpload: "Hacknet Node NIC Architecture Neural-Upload",
    HacknetNodeKernelDNI: "Hacknet Node Kernel Direct-Neural Interface",
    HacknetNodeCoreDNI: "Hacknet Node Core Direct-Neural Interface",
    Neurotrainer1: "Neurotrainer I",
    Neurotrainer2: "Neurotrainer II",
    Neurotrainer3: "Neurotrainer III",
    Hypersight: "HyperSight Corneal Implant",
    LuminCloaking1: "LuminCloaking-V1 Skin Implant",
    LuminCloaking2: "LuminCloaking-V2 Skin Implant",
    HemoRecirculator: "HemoRecirculator",
    SmartSonar: "SmartSonar Implant",
    PowerRecirculator: "Power Recirculation Core",
    QLink: "QLink",
    TheRedPill: "The Red Pill",
    SPTN97: "SPTN-97 Gene Modification",
    HiveMind: "ECorp HVMind Implant",
    CordiARCReactor: "CordiARC Fusion Reactor",
    SmartJaw: "SmartJaw",
    Neotra: "Neotra",
    Xanipher: "Xanipher",
    nextSENS: "nextSENS Gene Modification",
    OmniTekInfoLoad: "OmniTek InfoLoad",
    PhotosyntheticCells: "Photosynthetic Cells",
    Neurolink: "BitRunners Neurolink",
    TheBlackHand: "The Black Hand",
    UnstableCircadianModulator: "Unstable Circadian Modulator",
    CRTX42AA: "CRTX42-AA Gene Modification",
    Neuregen: "Neuregen Gene Modification",
    CashRoot: "CashRoot Starter Kit",
    NutriGen: "NutriGen Implant",
    INFRARet: "INFRARET Enhancement",
    DermaForce: "DermaForce Particle Barrier",
    GrapheneBrachiBlades: "Graphene BrachiBlades Upgrade",
    GrapheneBionicArms: "Graphene Bionic Arms Upgrade",
    BrachiBlades: "BrachiBlades",
    BionicArms: "Bionic Arms",
    SNA: "Social Negotiation Assistant (S.N.A)",
    CongruityImplant: "violet Congruity Implant",
    HydroflameLeftArm: "Hydroflame Left Arm",
    BigDsBigBrain: "BigD's Big ... Brain",
    ZOE: "Z.O.Ë."
    // UnnamedAug2 : "UnnamedAug2",

    // Bladeburner augs
    /* EsperEyewear: "EsperTech Bladeburner Eyewear",
    EMS4Recombination: "EMS-4 Recombination",
    OrionShoulder: "ORION-MKIV Shoulder",
    HyperionV1: "Hyperion Plasma Cannon V1",
    HyperionV2: "Hyperion Plasma Cannon V2",
    GolemSerum: "GOLEM Serum",
    VangelisVirus: "Vangelis Virus",
    VangelisVirus3: "Vangelis Virus 3.0",
    INTERLINKED: "I.N.T.E.R.L.I.N.K.E.D",
    BladeRunner: "Blade's Runners",
    BladeArmor: "BLADE-51b Tesla Armor",
    BladeArmorPowerCells: "BLADE-51b Tesla Armor: Power Cells Upgrade",
    BladeArmorEnergyShielding: "BLADE-51b Tesla Armor: Energy Shielding Upgrade",
    BladeArmorUnibeam: "BLADE-51b Tesla Armor: Unibeam Upgrade",
    BladeArmorOmnibeam: "BLADE-51b Tesla Armor: Omnibeam Upgrade",
    BladeArmorIPU: "BLADE-51b Tesla Armor: IPU Upgrade",
    BladesSimulacrum: "The Blade's Simulacrum",
  
    StaneksGift1: "Stanek's Gift - Genesis",
    StaneksGift2: "Stanek's Gift - Awakening",
    StaneksGift3: "Stanek's Gift - Serenity",
  
    // Infiltrators MiniGames
    MightOfAres: "SoA - Might of Ares", // slash
    WisdomOfAthena: "SoA - Wisdom of Athena", // bracket
    TrickeryOfHermes: "SoA - Trickery of Hermes", // cheatcode
    BeautyOfAphrodite: "SoA - Beauty of Aphrodite", // bribe
    ChaosOfDionysus: "SoA - Chaos of Dionysus", // reverse
    FloodOfPoseidon: "SoA - Flood of Poseidon", // hex
    HuntOfArtemis: "SoA - Hunt of Artemis", // mine
    KnowledgeOfApollo: "SoA - Knowledge of Apollo", // wire
    WKSharmonizer: "SoA - phyzical WKS harmonizer", */
  }


  // install all augmentations
  for (key in AugmentationName) {
    player.augmentations.push({ level: 1, name: AugmentationName[key] });
  }

  // infinite money
  player.money = 999999999999999;

  // hacking level
  player.exp.hacking = 999999999999999;
}
