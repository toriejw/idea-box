function renderIdea(idea){
  $('#idea-list').append(
    "<div class='idea' data-id='" + idea.id + "'><h3>" +
    idea.title + "</h3><p>" +
    idea.body + "</p><p> Rating: " +
    idea.rating + "</p><button class='btn btn-danger' id='delete-btn' data-id='" + idea.id + "'>Delete</button></div>"
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

$(document).ready(function(){
  loadIdeas();

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

})
