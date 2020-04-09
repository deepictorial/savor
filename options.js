$(function(){
  chrome.storage.sync.get('name', function(value){
    $('#name').val(value.name);
  })

  $('#saveRecipe').click(function(){
    var name = $('#name').val();
    if(name){
      chrome.storage.sync.set({'name': name}, function(){
          close();
      });
    }
  });

  $('#resetRecipe').click(function(){
    chrome.storage.sync.set({'recipeName': ''});
  });
});
