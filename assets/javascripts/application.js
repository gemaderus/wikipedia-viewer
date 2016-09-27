var $ = require('jquery');

var TEMPLATE = "<li class='Topic-item'><h3 class='Topic-item-title'></h3><p class='Topic-item-text'></p><a href='#' class='Btn Btn-action Btn-link'>Read more</a></li>";

//To search the contents.

$(function() {
  $("#button-search").on("click", function(e) {
    e.preventDefault();
    var searchValue = $("#search-input").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchValue +"&pwpcontinue&format=json&callback=?"

    if ($.trim(searchValue) === "") {
      e.preventDefault();
    } else {
      search(url);
    }
  });
});

//To get the data

function search(url) {
  $.getJSON(url, handleResponse);
}

//Handler api

function handleResponse(response) {
  var topicsList = response[1];
  var descList = response[2];
  var urlList = response[3];
  background();

  $('#Topic-list').empty();

  topicsList.forEach(function (topicItem, index) {
    var nodo = $(TEMPLATE);
    updateTitle(nodo, topicItem);
    updateText(nodo, descList[index]);
    readMore(nodo, urlList[index]);

    $('#Topic-list').append(nodo);
  });
}

//To get the title

function updateTitle(nodo, data) {
  nodo.find(".Topic-item-title").html(data);
}

//To get the text

function updateText(nodo, text) {
  nodo.find(".Topic-item-text").html(text);
}

function readMore(nodo, url) {
  nodo.find(".Btn-link").attr("href", url);
}

function background() {
  $(".Body").addClass("is-clicked");
}
