function clickOnBtn(btn, times) {
  for (let i = 0; i < times; i++) {
    btn.click();
  }
}

function purchaseTopMostAugmentation(index) {
  document
    .querySelector(
      `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${index + 1
      }) > div.MuiBox-root.css-70qvj9 > button`
    )
    .click();
  document
    .querySelector(
      "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
    )
    .click();
  document
    .querySelector(
      "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
    )
    .click();
}

function purchaseAllAugmentation(index = 1) {
  let idx = index;
  let btn = document.querySelector(
    `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${idx + 1
    }) > div.MuiBox-root.css-70qvj9 > button`
  );
  while (btn !== null && !btn.disabled && btn.innerText === "Buy") {
    btn.click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
      )
      .click();
    idx++;
    btn = document.querySelector(
      `#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div:nth-child(${idx + 1
      }) > div.MuiBox-root.css-70qvj9 > button`
    );
  }
}

function upgradeGovernor(num = 1) {
  for (let i = 0; i < num; i++) {
    document
      .querySelector(
        "#root > div.MuiBox-root.css-1ik4laa > div.jss1.MuiBox-root.css-0 > div.MuiContainer-root.MuiContainer-maxWidthLg.MuiContainer-disableGutters.css-1orai50 > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-wveda5 > div.MuiBox-root.css-70qvj9 > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.jss20 > div > button"
      )
      .click();
    document
      .querySelector(
        "body > div.jss19.MuiModal-root.css-8ndowl > div.MuiBackdrop-root.css-919eu4"
      )
      .click();
  }
}

function checkElements() {
  const nodeList = Array.from(document.querySelectorAll(".MuiBox-root"));
  const objs = nodeList.map((e) => Object.entries(e));
  console.log(objs);
  return objs;
}

function hacknetServers(
  index = -1,
  level = 5000,
  maxRam = Math.pow(2, 30),
  cores = Math.pow(2, 26),
  cache = 2500
) {
  const opts = {
    level,
    maxRam,
    cores,
    cache,
  };
  const arr = Array.from(document.querySelectorAll(".MuiBox-root"));
  const obj = arr.map((e) => Object.entries(e));
  const hacknetServerList = obj[obj.length - 1][1][1].children;
  if (index === -1) {
    hacknetServerList.forEach((server) => {
      const node = server.props.node;
      node.level = opts.level;
      node.maxRam = opts.maxRam;
      node.cores = opts.cores;
      node.cache = opts.cache;
    });
    return;
  }
  hacknetServerList.forEach((server, idx) => {
    if (index === idx) {
      const node = server.props.node;
      node.level = opts.level;
      node.maxRam = opts.maxRam;
      node.cores = opts.cores;
      node.cache = opts.cache;
    }
  });
  console.log(hacknetServerList);
}

function gangMembers(index, num) {
  const objs = checkElements();
  const list = objs.map((e) => e[1][1].children); // .filter(arr => arr[0]["key"] !== undefined);

  let member;
  list.forEach((e) => {
    if (Array.isArray(e)) {
      const temp = e.filter(
        (el) =>
          el["key"] !== undefined &&
          el["key"] !== null &&
          el["key"].startsWith("ab")
      );
      if (temp.length > 0) member = temp;
    }
  });
  console.log(member);

  if (index === -1) {
    member.forEach((m) => {
      m.props.member.hack_exp += num; // 1e+200;
      m.props.member.str_exp += num; // 1e+200;
      m.props.member.agi_exp += num; // 1e+200;
      m.props.member.def_exp += num; // 1e+200;
      m.props.member.dex_exp += num; // 1e+200;
    });
    return;
  }

  member.forEach((m, idx) => {
    if (index === idx) {
      m.props.member.hack_exp += num; // 1e+200;
      m.props.member.str_exp += num; // 1e+200;
      m.props.member.agi_exp += num; // 1e+200;
      m.props.member.def_exp += num; // 1e+200;
      m.props.member.dex_exp += num; // 1e+200;
    }
  });
}

function maxFactionRep() {
  const objs = checkElements();
  const obj = objs[5];
  const faction = obj[1][1].children[1].props.children.props;
  console.log(faction);

  faction.faction.playerReputation = Infinity;
}

function exploitHashesInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForMoney = hashList[0];
  console.log(sellForMoney.props.upg);

  sellForMoney.props.upg.cost = 0; // 0.001;
  sellForMoney.props.upg.value = Infinity;
}

function exploitHashesCorpInfiniteMoney() {
  const objs = checkElements();
  let obj = objs[objs.length - 1];
  let hashList = obj[1][1].children.props.children;
  hashList = hashList[hashList.length - 1];
  let sellForCoprFund = hashList[1];
  console.log(sellForCoprFund.props.upg);

  sellForCoprFund.props.upg.costPerLevel = 0;
  sellForCoprFund.props.upg.value = 9e200;
}

function sleevesRefresh() {
  const propsToLook = ["children", "props", "sleeve"];
  const objs = checkElements();
  const sleeves = [];
  const lookForSleeves = (element) => {
    if (!Array.isArray(element)) {
      for (let key in element) {
        if (propsToLook.includes(key)) {
          if (key === "sleeve") {
            sleeves.push(element[key]);
            break;
          }
          lookForSleeves(element[key]);
        }
      }
    } else {
      for (let arr of element) {
        lookForSleeves(arr);
      }
    }
  };
  lookForSleeves(objs);

  sleeves.forEach(s => {
    s.memory = 100;
    s.sync = 100;
    s.shock = 0;

    for (let e in s.exp) {
      s.exp[e] += 1e+100;
    }
  });
}
