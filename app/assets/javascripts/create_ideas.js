$(document).ready(function(){
  createIdea();
})

function clearTextBoxes() {
  clearFormTitle();
  clearFormBody();
}

function createIdea() {
  $('#create-idea-btn').on('click', function(){
    var ideaParams = getFormParams();

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

function getFormParams() {
  return { title: $('#form-title').val(), body: $('#form-body').val() };
}

function clearFormTitle() {
  $('#form-title').val('');
}

function clearFormBody() {
  $('#form-body').val('');
}
