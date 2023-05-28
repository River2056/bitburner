/** @param {import(".").NS} ns*/
export async function main(ns) {
    const corp = ns.corporation.getCorporation();
    corp.divisions.forEach(d => {
        ns.tprint(ns.corporation.getOffice(d));
    });
}

