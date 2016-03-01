$(document).ready(function(){
  editIdeaContent();
});

function editIdeaContent() {
  $('#idea-list').on('click', '.edit-btn', function(){
    var $ideaId = $(this).attr('data-id');
    var $idea = $('.idea[data-id=' + $ideaId + ']');

    if ($idea.find('form')) {
      $idea.find('form').remove();
    }

    var $editForm = "<form class='form-group'>" +
    "<br><label>Title:</label>" +
    "<input type='text' name='title' class='form-control title-input'value='" + $idea.find('.idea-title').text() + "'><br>" +
    "<label>Body:</label>" +
    "<input type='text' name='body' class='form-control body-input' value='" + $idea.find('.idea-body').text() + "'><br>" +
    "<button class='save-edited-idea-btn btn btn-info'>Save</button>" +
    "<button class='close-edit-form-btn btn btn-danger'>Cancel</button>" +
    "</form>"

    $idea.append($editForm);
    saveEditedIdea($ideaId, $idea);
    closeEditForm($idea);
  });
}

function saveEditedIdea(id, ideaDiv) {
  ideaDiv.on('click', '.save-edited-idea-btn', function(e){
    e.preventDefault();
    var $ideaParams = getFormParams(ideaDiv);
    
    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id,
      data: $ideaParams,
      success: function(response){
        hideForm(ideaDiv);
      }
    });
  });
}

function closeEditForm(ideaDiv){
  ideaDiv.on('click', '.close-edit-form-btn', function(e){
    e.preventDefault();
    hideForm(ideaDiv);
  });
}

function hideForm(withinDiv){
  withinDiv.find('form').remove();
}

function getFormParams(ideaDiv) {
  return { title: getFormTitle(ideaDiv), body: getFormBody(ideaDiv) };
}

function getFormTitle(ideaDiv) {
  return ideaDiv.find('.title-input').val();
}

function getFormBody(ideaDiv) {
  return ideaDiv.find('.body-input').val();
}
