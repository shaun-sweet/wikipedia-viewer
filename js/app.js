$(document).ready(function() {
  var magnifyingGlass = $("#mag-glass");
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=JSON_CALLBACK';
  var pageURL = 'https://en.wikipedia.org/?curid=';
  var input;

  magGlassListener();

  function magGlassListener(){
      magnifyingGlass.on('click', function() {
      magnifyingGlass.slideUp();
      addSearchBar();
    });
  };

  function addSearchBar() {
    $('body').append("<input id='search-query' type='text' placeholder='Query Parameters...'>");
    $("#search-query").fadeIn("slow");
    input = $("#search-query");
    input.focus();
    input.on('keyup', function(e) {
      if (e.keyCode == 13) {
        $(".wiki-entries").remove();
        wikiAjaxCall();
      }
    })
  };

  function wikiAjaxCall() {
    var queryParams = encodeURIComponent($('input').val());
    var url = api + queryParams + cb;

    $.ajax({
      dataType: "jsonp",
      url: url
    }).done(function(res) {
      for (var entry in res.query.pages) {
        var title = res.query.pages[entry].title;
        var body = res.query.pages[entry].extract;
        var pageID = res.query.pages[entry].pageid;
        appendWikiEntries(title, body, pageID);
      }

    });
  };

  function appendWikiEntries(title, body, pageID) {
    $(`<div class='wiki-entries'>
    <h3>`+title+`</h3>
    <p>`+body+`</p>
    </div>`).hide().appendTo("body").fadeIn().on('click', function() {
      window.open(pageURL + pageID);
    });
  };
});
