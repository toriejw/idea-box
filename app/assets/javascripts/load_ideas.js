function renderIdea(idea){
  $('#idea-list').append(
    "<div class='idea' data-id='" + idea.id + "'><h3>" +
    idea.title + "</h3><p>" +
    idea.body + "</p><p>" +
    idea.rating + "</p></div>"
  )
}

function loadIdeas() {
  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas.json',
    success: function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
      })
    }
  })
}

$(document).ready(function(){
  loadIdeas();
})
