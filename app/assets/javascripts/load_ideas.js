$(document).ready(function(){
  loadIdeas();
})

function renderIdea(idea){
  $('#idea-list').prepend(
    "<div class='idea' data-id='" + idea.id + "'><h3 class='idea-title'>" +
    idea.title + "</h3><p class='idea-body'>" +
    idea.body + "</p><p class='rating'> Rating: " +
    idea.rating + "</p><button class='btn btn-primary up-vote-btn' data-id='" +
    idea.id + "'><i class='glyphicon glyphicon-thumbs-up'></i></button>" +
    "<button class='btn btn-primary down-vote-btn' data-id='" +
    idea.id + "'><i class='glyphicon glyphicon-thumbs-down' data-id='" +
    idea.id + "'></i></button>" +
    "  <button type='button' class='btn btn-info edit-btn' data-id='" +
    idea.id + "'>Edit</button>" +
    "  <button class='btn btn-danger' id='delete-btn' data-id='" +
    idea.id + "'>Delete</button></div>"
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
