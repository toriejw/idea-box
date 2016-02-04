$(document).ready(function(){
  upVoteIdea()
  downVoteIdea()
})

window.CONSTANTS = {}
CONSTANTS.swill = {value: 0, name: "swill"}
CONSTANTS.plausible = {value: 1, name: "plausible"}
CONSTANTS.genius = {value: 2, name: "genius"}

CONSTANTS.upVoting = {
  0: CONSTANTS.plausible,
  1: CONSTANTS.genius,
  2: CONSTANTS.genius,
}

CONSTANTS.downVoting = {
  0: CONSTANTS.swill,
  1: CONSTANTS.swill,
  2: CONSTANTS.plausible,
}

function upVoteIdea() {
  $('#idea-list').on('click', '.up-vote-btn', function(){
    var ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + ideaId + ']')
    var $previousRating = $idea.find('.rating')
    var newQualityRating = findNewQualityRatingAfterUpVote($previousRating.text())

    updateIdeaRating(ideaId, newQualityRating, $previousRating)
  })
}

function downVoteIdea() {
  $('#idea-list').on('click', '.down-vote-btn', function(){
    var ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + ideaId + ']')
    var $previousRating = $idea.find('.rating')
    var newQualityRating = findNewQualityRatingAfterDownVote($previousRating.text())

    updateIdeaRating(ideaId, newQualityRating, $previousRating)
  })
}

function updateIdeaRating(ideaId, newQualityRating, $previousRating){
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + ideaId,
    data: {quality: newQualityRating.value},
    success: ( function(response){
      $previousRating.html(" Rating: " + newQualityRating.name)
    })
  })
}

function findNewQualityRatingAfterUpVote($previousRating){
  var oldRating = quantifyRating($previousRating)
  return CONSTANTS.upVoting[oldRating]
}

function findNewQualityRatingAfterDownVote($previousRating){
  var oldRating = quantifyRating($previousRating)
  return CONSTANTS.downVoting[oldRating]
}

function quantifyRating(previousRating){
  var oldRating = previousRating.split(" ")[2]

  if (oldRating === "swill") {
    return 0
  } else if (oldRating === "plausible") {
    return 1
  } else {
    return 2
  }
}
