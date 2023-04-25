import { formatDateTime } from "./utils";

/** @param {import(".").NS} ns*/
export function checkForHackingPrograms(ns) {
  let hackingPrograms = [
    "brutessh.exe",
    "ftpcrack.exe",
    "relaysmtp.exe",
    "httpworm.exe",
    "sqlinject.exe",
  ];
  let hasCount = 0;

  if (ns.fileExists("brutessh.exe", "home")) hasCount++;

  if (ns.fileExists("ftpcrack.exe", "home")) hasCount++;

  if (ns.fileExists("relaysmtp.exe", "home")) hasCount++;

  if (ns.fileExists("httpworm.exe", "home")) hasCount++;

  if (ns.fileExists("sqlinject.exe", "home")) hasCount++;
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  let customServers = [];
  let playerHackLevel = ns.getHackingLevel();
  let hasHackingProgramCount = checkForHackingPrograms(ns);
  let freq = 10 * 60 * 1000; // in milliseconds

  while (true) {
    let date = new Date();
    let restartCustomServerScript = false;
    const servers = ns.getPurchasedServers();
    if (servers.length !== customServers.length) {
      ns.print("WARN new servers detected");
      restartCustomServerScript = true;
    } else {
      servers.forEach((s) => {
        const oldServer = customServers.filter((cs) => cs.hostname === s)[0];
        const newServer = ns.getServer(s);
        if (oldServer.maxRam !== newServer.maxRam) {
          ns.print(`WARN server ram upgraded: ${newServer.hostname}`);
          restartCustomServerScript = true;
        }
      });
    }

    customServers = servers.map((s) => ns.getServer(s));
    if (restartCustomServerScript) {
      if (ns.run("deploy_custom_scripts.js") !== 0) {
        ns.print("SUCCESS rerun deploy_custom_scripts.js...");
        ns.print(formatDateTime(date));
      }
    }

    const currentPlayerLevel = ns.getHackingLevel();
    const currentHackingProgramsCount = checkForHackingPrograms(ns);
    if (
      currentPlayerLevel !== playerHackLevel ||
      currentHackingProgramsCount !== hasHackingProgramCount
    ) {
      ns.print(`WARN player hacking level difference detected`);
      ns.print(`SUCCESS rerun deploy_and_run.js...`);
      ns.run("deploy_and_run.js");
      ns.print(formatDateTime(date));
    }
    playerHackLevel = currentPlayerLevel;
    hasHackingProgramCount = currentHackingProgramsCount;
    date.setMilliseconds(date.getMilliseconds() + freq);
    ns.print(`next execution time: ${formatDateTime(date)}`);
    await ns.sleep(freq);
  }
}
