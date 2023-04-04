import { formatTime } from "./utils";

/** @param {import(".").NS} ns */
export async function main(ns) {
  while (true) {
    await ns.sleep(1000);
    ns.clearLog();
    ns.printf(formatTime(new Date()));
  }
}
