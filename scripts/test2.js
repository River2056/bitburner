/** @param {import(".").NS} ns*/
export async function main(ns) {
    // Object.defineProperty(Object.prototype, "home", { get() { return this; }});
    /* let servers = ns.getServer("home");
    ns.tprint(servers); */
    
    let player = ns.getPlayer();
    player.setMoney(1000000000);
}

