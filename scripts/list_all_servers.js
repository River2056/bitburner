import { HOME } from "./constants";

/** @type import(".").NS */
let ns = null;
let print = null;

/**
  * @param {string} target
  * @param {object} adjList
  * */
const scanSpot = (target, adjList) => {
  if (target in adjList)
    return;

  const children = ns.scan(target);
  adjList[target] = children;
  for (const child of children) {
    if (child in adjList) {
      continue;
    }
    scanSpot(child, adjList);
  }
}

/**
  * @param {string} parent
  * @param {string} target
  * @param {object} route
  * @param {object} map
  * @param {Set} visited
  */
const find = (parent, target, route, map, visited) => {

  const f = (parent, target, route, map, visited) => {
    if (visited.has(parent))
      return;

    visited.add(parent);
    const children = map[parent].filter(c => c !== parent);
    for (const child of children) {
      if (child === parent)
        continue;

      if (child === target) {
        return true;
      }

      if (f(child, target, route, map, visited)) {
        route.push(child);
        return true;
      }

    }
    return false;
  }

  route.push(target);
  f(parent, target, route, map, visited);
  route.push(parent);
  route.reverse();
  print("route: %s", route.join(" > "));
}



export async function main(_ns) {
  ns = _ns;
  print = ns.tprintf;
  const args = ns.flags([
    ["target", ""],
    ["help", false]
  ]);

  if (args && args.help) {
    print("recursive find all servers within the network in an adjacency list");
    print("--target: the target to find (Optional), will print route if found");
    return;
  }

  const adjacencyList = {};
  scanSpot(HOME, adjacencyList);
  for (const key in adjacencyList) {
    print("%s: [%s]", key, adjacencyList[key]);
  }

  if (args && args.target) {
    const route = [];
    const target = args.target;
    if (!(target in adjacencyList)) {
      print("target %s not in network, abort...", target);
      return;
    }

    find(HOME, target, route, adjacencyList, new Set());
  }
}
