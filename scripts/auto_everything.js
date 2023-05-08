import { formatDateTime } from "./utils";

/** @param {import(".").NS} ns*/
export function checkForHackingPrograms(ns) {
  let hasCount = 0;
  if (ns.fileExists("brutessh.exe", "home")) hasCount++;
  if (ns.fileExists("ftpcrack.exe", "home")) hasCount++;
  if (ns.fileExists("relaysmtp.exe", "home")) hasCount++;
  if (ns.fileExists("httpworm.exe", "home")) hasCount++;
  if (ns.fileExists("sqlinject.exe", "home")) hasCount++;
  return hasCount;
}

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const args = ns.flags([
    ["freq", 180],
    ["help", false],
  ]);

  if (!args || args.help) {
    ns.tprintf(
      "automatically redeploys deploy_and_run & deploy_custom_scripts"
    );
    ns.tprintf("on set frequency (in minutes, default 20 mins)");
    ns.tprintf("use --freq to provide custom minutes");
    ns.tprintf("> run auto_everything --freq 30");
    return;
  }

  let customServers = [];
  let playerHackLevel = 1;
  let hasHackingProgramCount = 0;
  let freq = args.freq * 60 * 1000; // in milliseconds

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

      ns.print("attempt to install backdoor on servers...");
      ns.run("connect_and_install_backdoor.js");
      ns.print(`SUCCESS finished installing backdoors on all servers`);
    }
    playerHackLevel = currentPlayerLevel;
    hasHackingProgramCount = currentHackingProgramsCount;
    date.setMilliseconds(date.getMilliseconds() + freq);
    ns.print(`next execution time: ${formatDateTime(date)}`);
    await ns.sleep(freq);
  }
}
