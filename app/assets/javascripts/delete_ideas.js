$(document).ready(function(){
  deleteIdea();
})

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
