/**
  * @param {import(".").NS} ns
  * */
function createAndJoinGang(ns, gangName) {
  if (!ns.gang.inGang())
    ns.gang.createGang(gangName);
  else
    return;
}

/** @param {import(".").NS} ns */
function recruitMemberClosure(ns) {
  let count = 0;

  const recruit = (ns) => {
    if (ns.gang.canRecruitMember()) {
      return ns.gang.recruitMember(`ab${count++}`);
    }
    return null;
  }

  return recruit;
}

/** @param {import(".").NS} ns */
function assignMemberTasks(ns) {
  const members = ns.gang.getMemberNames();
  const tasks = ns.gang.getTaskNames();
  let count = 0;

  if (ns.gang.getGangInformation().wantedPenalty < 0.5) {
    members.forEach(m => ns.gang.setMemberTask(m, tasks.filter(t => t.toLowerCase().startsWith("ethical"))[0]));
    return;
  }

  members.forEach(m => {
    if (count % 3 === 0) {
      if (ns.gang.getMemberInformation(m).hack < 500)
        ns.gang.setMemberTask(m, tasks.filter(t => t.toLowerCase().startsWith("ransomware"))[0])
      else
        ns.gang.setMemberTask(m, tasks.filter(t => t.toLowerCase().startsWith("money"))[0])
    }
    else if (count % 5 === 0)
      ns.gang.setMemberTask(m, tasks.filter(t => t.toLowerCase().startsWith("identity"))[0])
    else
      ns.gang.setMemberTask(m, tasks.filter(t => t.toLowerCase().startsWith("ethical"))[0])
    count++;
  });
}

/** @param {import(".").NS} ns */
function ascendMembers(ns) {
  ns.gang.getMemberNames().forEach(m => ns.gang.ascendMember(m));
}

/** @param {import(".").NS} ns */
function getEquipments(ns) {
  const priorityEquipments = ["NUKE Rootkit", "Soulstealer Rootkit", "Demon Rootkit", "Hmap Node", "Jack the Ripper", "Bionic Arms", "Bionic Legs", "Bionic Spine", "BrachiBlades", "Nanofiber Weave", "Synthetic Heart", "Synfibril Muscle", "BitWire", "Neuralstimulator", "DataJack", "Graphene Bone Lacings"];
  const members = ns.gang.getMemberNames();
  members.forEach(m => {
    priorityEquipments.forEach(eq => {
      ns.gang.purchaseEquipment(m, eq);
    });
  });

  members.forEach(m => {
    ns.gang.getEquipmentNames().filter(eq => !priorityEquipments.includes(eq)).forEach(eq => {
      ns.gang.purchaseEquipment(m, eq);
    });
  })
}

/** @param {import(".").NS} ns */
async function manageGang(ns) {
  ns.disableLog("sleep");
  const ascendWait = 60 * 60;
  createAndJoinGang(ns, "NiteSec");
  const recruitMember = recruitMemberClosure();
  let counter = 0;
  while (true) {
    recruitMember(ns);
    assignMemberTasks(ns);
    if (counter === ascendWait) {
      ascendMembers(ns);
      counter = 0;
    }
    getEquipments(ns);
    await ns.sleep(1000);
    counter++;
  }
}

/** @param {import(".").NS} ns */
function test(ns) {
  ns.tprint(ns.gang.getGangInformation());
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["task", ""],
  ])

  if (args && args.task) {
    ns.gang.getMemberNames().forEach(m => {
      ns.gang.setMemberTask(m, ns.gang.getTaskNames().filter(t => t.toLowerCase().startsWith(args.task))[0]);
    });
    return;
  }

  await manageGang(ns);
  // test(ns);
}

