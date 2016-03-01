$(document).ready(function(){
  filterIdeas();
});

function filterIdeas(){
  $('#filter-bar').keyup(function(){
    var $filterQuery = getFilterQuery();

    showFilteredIdeas($filterQuery);
  });
}

function showFilteredIdeas(filterQuery) {
  var $ideas = getIdeas();

  $.each($ideas, function (index, idea){
    showIdeaIfSearchedFor(idea, filterQuery);
  });
}

function getIdeas() {
  return $('#idea-list').find('.idea');
}

function getFilterQuery() {
  return $('#filter-bar').val();
}

function showIdeaIfSearchedFor(idea, filterQuery) {
  var title = findTitle(idea);
  var body = findBody(idea);

  if (title.indexOf(filterQuery) >= 0 || body.indexOf(filterQuery) >= 0) {
    $(idea).show();
  } else {
    $(idea).hide();
  }
}

function findTitle(idea) {
  return $(idea).find('.idea-title').text();
}

function findBody(idea) {
  return $(idea).find('.idea-body').text();
}
