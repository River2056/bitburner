# custom bitburner scripts repo

## how to use this repository:
1. clone this repository
2. install `node`
3. cd into bitburner
4. `npm install`
5. `npm start`
6. connect to localhost:12525 on bitburner web version using Options > Remote API

## what this repository does in the background?
- opens up a server
- watch for file changes configured in `filesync.json`
- pushes scripts to your in-game `Terminal` if changes happen

## things to watch out for
- this repository only **PUSHES TO** your in-game terminal, **NOT** pulling stuff from your game, in other words, file flow only go one way

---

A short guide that describes how to set up autocompletion for the games own code classes inside Visual Studio Code, 
so you can write your scripts outside of the game.

How to do it.
1. Create a new empty folder/directory for your scripts.
2. Go to the games official github, and download the “NetscriptDefinitions.d.ts” file: https://github.com/danielyxie/bitburner/blob/dev/src/ScriptEditor/NetscriptDefinitions.d.ts
3. Put this file in your script directory.
4. Rename the file to “index.d.ts”.
5. Open the folder in VS Code.
6. Make a new file for your new script. In this example, we’ll call it “hack.js”.

You now have two options…
Both options do the same thing, but different ways. Pick your poison.

Option 1: JSDoc params
This option uses a JSDoc params tag on every function that uses the `NS` object type.

/** @param {import(".").NS } ns */
export async function main(ns) {
    // you now have autocomplete for all `ns.` commands.
    const hackingLevel = ns.getHackingLevel();
}

Option 2: JSDoc type
This option uses a JSDoc type tag on a global `ns` object. This is safe, internally its the same object being reused anyways.

/** @type import(".").NS */
let ns = null;
export async function main(_ns) {
  ns = _ns;
  // you now have autocomplete for all `ns.` commands.
  const hackingLevel = ns.getHackingLevel();
}
