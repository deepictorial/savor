chrome.contextMenus.create({
  "id": "addRecipe",
  "title": "Add Recipe",
  "contexts": ["selection"],
  onclick: addRecipeFn
});
chrome.contextMenus.create({
  title: "Add new",
  parentId: "addRecipe",
  id: "another",
  contexts:["all"],
  onclick: addRecipeFn
});
chrome.contextMenus.create({
  type: "separator",
  parentId: "addRecipe",
  contexts: ["all"]
});

function addRecipeFn(info, tab){
  var guid = Math.random();
  chrome.contextMenus.create({
    title: info.selectionText+" recipe",
    parentId: "addRecipe",
    id: info.selectionText+guid,
    contexts:["all"]
  });
  addSubMenusFn(info.selectionText+guid, tab);
};

function addSubMenusFn(pid, tab) {
  var guid = Math.random();
  chrome.contextMenus.create({
    title: "Add to ingredients",
    parentId: pid,
    id: "ingredients"+guid,
    contexts:["all"],
    onclick: addIngsFn
  });

  chrome.contextMenus.create({
    title: "Add to cooking steps",
    parentId: pid,
    id: "steps"+guid,
    contexts:["all"],
    onclick: addStepsFn
  });
  chrome.contextMenus.create({
    title: "Add to shopping list",
    parentId: pid,
    id: "list"+guid,
    contexts:["all"],
    onclick: addListFn
  });
  chrome.contextMenus.create({
    type: "separator",
    parentId: pid,
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: "Download file",
    parentId: pid,
    id: "download"+guid,
    contexts:["all"],
    onclick: saveFile
  });
};

function saveFile(info, tab) {
    var filename = info.selectionText+"-recipe.txt";
    var shoppingText = "Shopping List for this dish:\r\n"+parseData("shoppingList");
    var ingText = "Ingredients needed:\r\n"+parseData("ingredients");
    var stepsText = "Cooking Steps:\r\n"+parseData("steps");
    var formatted = ingText+"\r\n"+stepsText+"\r\n"+shoppingText;
    var text = encodeURIComponent("Source: "+tab.url+"\r\n"+"Recipe for: "+info.selectionText+"\r\n"+formatted);
    var tempElem = document.createElement('a');
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    tempElem.setAttribute('download', filename);
    tempElem.click();
};

function addListFn(info, tab){
  var appendList = '';
  if(sessionStorage.getItem("shoppingList")) {
    appendList = sessionStorage.getItem("shoppingList");
  }
  sessionStorage.setItem("shoppingList", appendList+","+info.selectionText);
};

function addIngsFn(info, tab){
  var appendIngs = '';
  if(sessionStorage.getItem("ingredients")) {
    appendIngs = sessionStorage.getItem("ingredients");
  }
  sessionStorage.setItem("ingredients", appendIngs+","+info.selectionText);
};

function addStepsFn(info, tab){
  var appendSteps = '';
  if(sessionStorage.getItem("steps")) {
    appendSteps = sessionStorage.getItem("steps");
  }
  sessionStorage.setItem("steps", appendSteps+","+info.selectionText);
};

function parseData(data){
  var stored = sessionStorage.getItem(data);
  var parsed = '';
  var result = '';
  if(stored) {
    parsed = stored.split(",");
    for(p in parsed) {
      result += parsed[p]+"\r\n";
    }
  }
  return result;
};
