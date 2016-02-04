$(document).ready(function(){
  createIdea();
})

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
