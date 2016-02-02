function renderIdea(idea){
  $('#idea-list').append(
    "<div class='idea' data-id='" + idea.id + "'><h2>" +
    idea.title + "</h2><p>" +
    idea.body + "</p></div>"
  )
}

var load_ideas function() {
  $.ajax({
    type: 'GET',
    url: 'https://idea-box-tjw.herokuapp.com/api/v1/ideas.json',
    success: function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
      })
    }
  })
}

$(document).ready(function(){
  load_ideas;
})
