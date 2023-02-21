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
