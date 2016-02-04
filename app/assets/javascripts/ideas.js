$(document).ready(function(){
  loadIdeas();
  createIdea();
  deleteIdea();
  upVoteIdea();
  downVoteIdea();
  editIdeaContent();
  filterIdeas();
})

function filterIdeas(){
  $('#filter-bar').keyup(function(){
    var $filterQuery = $('#filter-bar').val()

    showFilteredIdeas($filterQuery)
  })
}

function showFilteredIdeas(filterQuery) {
  var $ideas = $('#idea-list').find('.idea')

  $.each($ideas, function (index, idea){
    ideaTitle = $(idea).find('.idea-title').text()
    ideaBody = $(idea).find('.idea-body').text()

    if (ideaTitle.indexOf(filterQuery) >= 0 || ideaBody.indexOf(filterQuery) >= 0) {
      $(idea).show()
    } else {
      $(idea).hide()
    }
  })
}

function editIdeaContent() {
  $('#idea-list').on('click', '.edit-btn', function(){
    var $ideaId = $(this).attr('data-id')
    var $idea = $('.idea[data-id=' + $ideaId + ']')

    if ($idea.find('form')) {
      $idea.find('form').remove()
    }

    var $editForm = "<form class='form-group'>" +
    "<br><label>Title:</label>" +
    "<input type='text' name='title' class='form-control title-input'value='" + $idea.find('.idea-title').text() + "'><br>" +
    "<label>Body:</label>" +
    "<input type='text' name='body' class='form-control body-input' value='" + $idea.find('.idea-body').text() + "'><br>" +
    "<button class='save-edited-idea-btn btn btn-info'>Save</button>" +
    "</form>"

    $idea.append($editForm)
    saveEditedIdea($ideaId, $idea)
  })
}

function saveEditedIdea(id, ideaDiv) {
  ideaDiv.on('click', '.save-edited-idea-btn', function(e){
    e.preventDefault()
    var $ideaParams = { title: ideaDiv.find('.title-input').val(),
                        body: ideaDiv.find('.body-input').val() }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id,
      data: $ideaParams,
      success: function(response){
        ideaDiv.find('form').remove()
      }
    })
  })
}

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
