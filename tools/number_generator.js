const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

const prompt = (promptText) => {
    return new Promise((resolve) => {
        rl.question(promptText, input => resolve(input));
    })
}

const unitMap = {
    k: 1000,
    m: 1e+6,
    b: 1e+9,
    t: 1e+12,
    q: 1e+15,
    qt: 1e+18,
    s: 1e+21,
    se: 1e+24,
    o: 1e+27,
    n: 1e+30
}

const main = async () => {
    const unit = await prompt("Enter unit: ");
    const amount = await prompt("Enter amount: ");
    console.log(unitMap[unit] * amount);

    rl.close();
}

main();
