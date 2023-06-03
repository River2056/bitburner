/**
  * helper function to quickly click on buttons
  * @param btn js path
  * @param times number of times to click
  * */
function clickOnBtn(btn, times) {
  for (let i = 0; i < times; i++) {
    btn.click();
  }
}

/**
  * navigate to purchase augmentations page
  * @param {int} index augment index on the page starting from 0, 
  * first = 0, second = 1
  * */
function purchaseTopMostAugmentation(index) {
  document.querySelector(`#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${index + 1}) > div.MuiBox-root.css-70qvj9 > button`).click();
  document.querySelector("body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button").click();
  document.querySelector("body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4").click();
}

/**
  * navigate to corporations page
  * running this function will manually buy all upgrades once on the page
  * */
function corpUpgrade(times) {
  for (let i = 0; i < times; i++) {
    // Smart Factories
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(1) > div > button").click();
    // Wilson Analytics
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(4) > div > button").click();
    // Neural Accelerators
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(7) > div > button").click();
    // Project Insight
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(10) > div > button").click();
    // Smart Storage
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(2) > div > button").click();
    // Nuoptimal Nootropic Injector Implants
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(5) > div > button").click();
    // FocusWires
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(8) > div > button").click();
    // DreamSense
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(3) > div > button").click();
    // Speech Processor Implants
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(6) > div > button").click();
    // ABC SalesBots
    document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div:nth-child(13) > div > div:nth-child(9) > div > button").click();
  }
}

function upgradeGovernor() {
  document.querySelector("#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-wveda5 > div.MuiBox-root.css-70qvj9 > button").click();
  document.querySelector("body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button").click();
  document.querySelector("body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4").click();
}

/**
  * fetch elements on the page
  * acts as a helper function as well
  * */
function checkElements() {
  const nodeList = Array.from(document.querySelectorAll(".MuiBox-root"));
  const objs = nodeList.map(e => Object.entries(e));
  console.log(objs);
  return objs;
}

/**
  * navigate to the hacknet page
  * run this function in your console
  * adjust below stats to your liking
  * */
function hacknetServers() {
  const arr = Array.from(document.querySelectorAll(".MuiBox-root"));
  const obj = arr.map(e => Object.entries(e));
  const hacknetServerList = obj[obj.length - 1][1][1].children;
  hacknetServerList.forEach(server => {
    const node = server.props.node;
    node.level = 300;
    node.maxRam = Math.pow(2, 20);
    node.cores = Math.pow(2, 16);
    node.cache = 500;
  });
  console.log(hacknetServerList);
}

/**
  * navigate to the gang page
  * add massive amount of experience to every stats of your
  * gang members
  * feel free to adjust stats to add to your liking
  * */
function gangMembers() {
  const objs = checkElements();
  const list = objs.map(e => e[1][1].children); // .filter(arr => arr[0]["key"] !== undefined);

  let member;
  list.forEach(e => {
    if (Array.isArray(e)) {
      const temp = e.filter(el => el["key"] !== undefined && el["key"] !== null && el["key"].startsWith("ab"));
      if (temp.length > 0) member = temp;
    }
  });
  console.log(member);

  member.forEach(m => {
    m.props.member.hack_exp += 1e+200;
    m.props.member.str_exp += 1e+200;
    m.props.member.agi_exp += 1e+200;
    m.props.member.def_exp += 1e+200;
    m.props.member.dex_exp += 1e+200;
  });
}

/**
  * 1. work for some faction you want to max out rep with
  * 2. navigate to the augmentations page of that faction while working for them
  * 3. run this function in your chrome dev tools console
  * */
function maxFactionRep() {
  const objs = checkElements();
  const obj = objs[5];
  const faction = obj[1][1].children[1].props.children.props;
  console.log(faction);

  faction.faction.playerReputation = Infinity;
}

/**
  * navigate to the hacknet page
  * hopefully you have upgraded your hacknet nodes into hacknet servers
  * open up the "Spend Hashes on Upgrades"
  * a dialog popup will appear with all possible upgrades you can spend your hashes on
  * now open up you chrome dev tools and run this function
  * you should now see that "Sell for Money" becomes 0.001 for it's cost
  * press buy and get infinite money
  * */
function exploitHashesInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForMoney = hashList[0];
  console.log(sellForMoney.props.upg);

  sellForMoney.props.upg.cost = 0.001;
  sellForMoney.props.upg.value = Infinity;
}

/**
  * see exploitHashesInfiniteMoney() function
  * */
function exploitHashesCorpInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForCoprFund = hashList[1];
  console.log(sellForCoprFund.props.upg);

  // sellForCoprFund.props.upg.costPerLevel = 10;
  sellForCoprFund.props.upg.value = 9e+200;
}
