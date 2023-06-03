import { HOME } from "./constants"

/** @param {import(".").NS} ns*/
export async function main(ns) {
  ns.singularity.purchaseTor();

  if (!ns.fileExists("BruteSSH.exe", HOME)) ns.singularity.purchaseProgram("BruteSSH.exe");
  if (!ns.fileExists("FTPCrack.exe", HOME)) ns.singularity.purchaseProgram("FTPCrack.exe");
  if (!ns.fileExists("relaySMTP.exe", HOME)) ns.singularity.purchaseProgram("relaySMTP.exe");
  if (!ns.fileExists("HTTPWorm.exe", HOME)) ns.singularity.purchaseProgram("HTTPWorm.exe");
  if (!ns.fileExists("SQLInject.exe", HOME)) ns.singularity.purchaseProgram("SQLInject.exe");
}
