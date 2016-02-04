$(document).ready(function(){
  upVoteIdea();
  downVoteIdea();
})

function upVoteIdea() {
  $('#idea-list').on('click', '.up-vote-btn', function(){
    var $ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + $ideaId + ']')
    var $previousRating = $idea.find('.rating')
    var $newQualityRating = findNewQualityRatingAfterUpVote($previousRating.text())

    updateIdeaRating($ideaId, $newQualityRating, $previousRating)
  })
}

function downVoteIdea() {
  $('#idea-list').on('click', '.down-vote-btn', function(){
    var $ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + $ideaId + ']')
    var $previousRating = $idea.find('.rating')
    var $newQualityRating = findNewQualityRatingAfterDownVote($previousRating.text())

    updateIdeaRating($ideaId, $newQualityRating, $previousRating)
  })
}

function updateIdeaRating(ideaId, newQualityRating, previousRating){
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + ideaId,
    data: {quality: newQualityRating[0]},
    success: function(response){
      previousRating.html(" Rating: " + newQualityRating[1])
    }
  })
}

function findNewQualityRatingAfterUpVote(previousRating){
  oldRating = quantifyRating(previousRating)

  if (oldRating === 0) {
    return [1, "plausible"]
  } else {
    return [2, "genius"]
  }
}

function findNewQualityRatingAfterDownVote(previousRating){
  oldRating = quantifyRating(previousRating)

  if (oldRating === 2) {
    return [1, "plausible"]
  } else {
    return [0, "swill"]
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
