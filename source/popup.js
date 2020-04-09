$(function(){
  chrome.storage.sync.get(['recipeName', 'name'], function(recipe){
    $('#recipeName').text(recipe.item1);
    $('#name').text(recipe.item1);
  });

  $('#addRecipe').click(function(){
    chrome.storage.sync.get('recipeName', function(recipe){
      var newRecipe = '';
      if (recipe){
        console.log("getting recipe:"+newRecipe);
        newRecipe += recipe;
      }

      var addedRecipe = $('#item1').val();
      if (addedRecipe){
        newRecipe = 'it adds ' + addedRecipe;
        console.log("addedRecipe:"+newRecipe);
      }

      chrome.storage.sync.set({'recipeName': newRecipe});
      $('#recipeName').text(newRecipe);
      $('#item1').val('');

    });
  });
});
