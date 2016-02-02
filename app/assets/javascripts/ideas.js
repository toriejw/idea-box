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
    success: function(response){
      $.each(response.ideas, function(index, idea){
        renderIdea(idea)
      })
    }
  })
}

$(document).ready(function(){
  loadIdeas();

  $('#create-idea-btn').on('click', function(){
    var ideaParams = { title: $('#form-title').val(), body: $('#form-body').val() }

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: ideaParams,
      success: function(idea){
        renderIdea(idea)
      },
      error: function(xhr){
        console.log(xhr)
      }
    })
  })
})
