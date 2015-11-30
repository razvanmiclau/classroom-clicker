// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){
  $('.selectpicker').change(function(){
    var selection = $(this).val();

    if(selection === 'Multiple-choice'){
      $('#custom_fields').fadeIn();
      $('input[type=text]').focus();
    } else {
      $('#custom_fields').fadeOut();
    };
  });
})
