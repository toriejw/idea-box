$(document).ready(function(){
  loadIdeas();
  createIdea();
  deleteIdea();
  upVoteIdea();
  downVoteIdea();
})

function upVoteIdea() {
  $('#idea-list').on('click', '.up-vote-btn', function(){
    var $ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + $ideaId + ']')
    var $previousRating = $idea.find('.rating')
    var $newQualityRating = findNewQualityRatingAfterUpVote($previousRating.text())

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $ideaId,
      data: {quality: $newQualityRating[0]},
      success: function(response){
        $previousRating.html(" Rating: " + $newQualityRating[1])
      }
    })

  })
}

function downVoteIdea() {
}

function findNewQualityRatingAfterUpVote(previousRating){
  oldRating = quantifyRating(previousRating)

  if (oldRating === 0) {
    return [1, "plausible"]
  } else {
    return [2, "genius"]
  }
}

function quantifyRating(previousRating){
  oldRating = previousRating.split(" ")[2]

  if (oldRating === "swill") {
    return 0
  } else if (oldRating === "plausible") {
    return 1
  } else {
    return 2
  }
}

function renderIdea(idea){
  $('#idea-list').append(
    "<div class='idea' data-id='" + idea.id + "'><h3>" +
    idea.title + "</h3><p>" +
    idea.body + "</p><p class='rating'> Rating: " +
    idea.rating + "</p><button class='btn btn-primary up-vote-btn' data-id='" +
    idea.id + "'><i class='glyphicon glyphicon-thumbs-up'></i></button>" +
    "<button class='btn btn-primary'><i class='glyphicon glyphicon-thumbs-down' data-id='" +
    idea.id + "'></i></button>" +
    "<button class='btn btn-danger' id='delete-btn' data-id='" +
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

function clearTextBoxes() {
  $('#form-title').val('');
  $('#form-body').val('');
}

function createIdea() {
  $('#create-idea-btn').on('click', function(){
    var ideaParams = { title: $('#form-title').val(), body: $('#form-body').val() }

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: ideaParams,
      success: function(response){
        renderIdea(response.idea);
        clearTextBoxes();
      },
      error: function(xhr){
        console.log(xhr)
      }
    })
  })
}

function deleteIdea() {
  $('#idea-list').on('click', '#delete-btn', function(){
    var $ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + $ideaId + ']')

    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + $ideaId,
      success: function(){
        $idea.remove()
      },
      error: function(xhr){
        console.log(xhr)
      }
    })
  })
}
