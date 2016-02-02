// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require ideas

// function renderIdea(idea){
//   $('#idea-list').append(
//     "<div class='idea' data-id='" + idea.id + "'><h3>" +
//     idea.title + "</h3><p>" +
//     idea.body + "</p><p>" +
//     idea.rating + "</p></div>"
//   )
// }
//
// function loadIdeas() {
//   $.ajax({
//     type: 'GET',
//     url: '/api/v1/ideas.json',
//     success: function(response){
//       $.each(response.ideas, function(index, idea){
//         renderIdea(idea)
//       })
//     }
//   })
// }
//
// $(document).ready(function(){
//   loadIdeas();
//
//   $('#create-idea-btn').on('click', function(){
//     var ideaParams = { title: $('#form-title').val(), body: $('#form-body').val() }
//
//     $.ajax({
//       type: 'POST',
//       url: '/api/v1/ideas',
//       data: ideaParams,
//       success: function(idea){
//         renderIdea(idea)
//       },
//       error: function(xhr){
//         console.log(xhr)
//       }
//     })
//   })
// })
