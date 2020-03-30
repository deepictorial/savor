chrome.contextMenus.create({
  "id": "addRecipe",
  "title": "Add Recipe",
  "contexts": ["selection"],
  onclick: addRecipeFn
});

function addRecipeFn(info, tab){
  chrome.contextMenus.create({
    title: info.selectionText,
    parentId: "addRecipe",
    id: info.selectionText + Math.random(),
    contexts:["selection"],
    onclick: addSubMenusFn
  });
};

function addSubMenusFn(info, tab) {
  chrome.contextMenus.create({
    title: "Add shopping list",
    parentId: info.menuItemId,
    id: "list",
    contexts:["selection"],
    onclick: addListFn
  });

  chrome.contextMenus.create({
    title: "Add ingredients",
    parentId: info.menuItemId,
    id: "ingredients",
    contexts:["selection"],
    onclick: addIngsFn
  });

  chrome.contextMenus.create({
    title: "Add cooking steps",
    parentId: info.menuItemId,
    id: "steps",
    contexts:["selection"],
    onclick: addStepsFn
  });
}

function addListFn(info, tab){
  console.log("added list");
}

function addIngsFn(info, tab){
  console.log("added ingredients");
}

function addStepsFn(info, tab){
  console.log("added steps");
}
