$(document).ready(function(){
  editIdeaContent();
})

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
