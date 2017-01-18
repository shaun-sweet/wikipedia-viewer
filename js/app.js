$(document).ready(function() {
  var magnifyingGlass = $("#mag-glass");
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=JSON_CALLBACK';
  var input;

  magGlassListener();

  function magGlassListener(){
      magnifyingGlass.on('click', function() {
      magnifyingGlass.slideUp();
      addSearchBar();
    });
  }

  function addSearchBar() {
    $('body').append("<input id='search-query' type='text' placeholder='Query Parameters...'>");
    $("#search-query").fadeIn("slow");
    input = $("#search-query");
    input.on('keyup', function(e) {
      if (e.keyCode == 13) {
        wikiAjaxCall();
      }
    })
  }

  function wikiAjaxCall() {
    var queryParams = $('input').val()
    $.getJSON(api + queryParams + cb, function(res) {
      console.log(res);
    })
  }
});
