import { formatString } from "./display_active_scripts";

/** @param {import(".").NS} ns*/
export async function main(ns) {
  const { numNodes, getNodeStats } = ns.hacknet;
  let maxNameLen = 0;
  for (let i = 0; i < numNodes(); i++)
    maxNameLen = Math.max(maxNameLen, getNodeStats(i).name.length);
  maxNameLen = Math.max(maxNameLen, "total production".length);
  maxNameLen += 6;

  const header = `|${formatString(maxNameLen, "name")}|${formatString(
    maxNameLen,
    "level"
  )}|${formatString(maxNameLen, "ram")}|${formatString(
    maxNameLen,
    "cores"
  )}|${formatString(maxNameLen, "production")}|${formatString(
    maxNameLen,
    "total production"
  )}|`;
  ns.tprintf("-".repeat(header.length));
  ns.tprintf(header);
  ns.tprintf("-".repeat(header.length));

  let nodeTotalProduction = 0;
  let nodeOverallTotalProduction = 0;
  for (let i = 0; i < numNodes(); i++) {
    let node = getNodeStats(i);
    let content = `|${formatString(maxNameLen, node.name)}|${formatString(
      maxNameLen,
      node.level + ""
    )}|${formatString(maxNameLen, node.ram + "")}|${formatString(
      maxNameLen,
      node.cores + ""
    )}|${formatString(maxNameLen, node.production.toLocaleString("en-US"))}|${formatString(
      maxNameLen,
      node.totalProduction.toLocaleString("en-US")
    )}|`;
    ns.tprintf(content);
    nodeTotalProduction += node.production;
    nodeOverallTotalProduction += node.totalProduction;
  }
  ns.tprintf(`total production: ${nodeTotalProduction.toLocaleString("en-US")}`);
  ns.tprintf(`overall production: ${nodeOverallTotalProduction.toLocaleString("en-US")}`);
}
