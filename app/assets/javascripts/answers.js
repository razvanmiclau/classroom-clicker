// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){
  $('#choices-form input[type=submit]').on('click', function(){
    var button_value = $(this).val();
    console.log(button_value);
    $('#choices-form input[type=text]').val(button_value);
  });

  $('#binary-choice-form input[type=submit]').on('click', function(){
    var button_value = $(this).val();
    console.log(button_value);
    $('#binary-choice-form input[type=text]').val(button_value);
  });
});

var data = [];
function get_data(){
  $.get('/questions/' + question_id + "/data", function(dt){
    data = dt;
    draw_answers(data);
  });
}

function draw_answers(data){
  $('#lect-answers').children().remove();
    for (var i = 0; i < data.length; i++) {
      var stringVal = "";
      stringVal += "<p class=\"bg-info answer-line\"><strong>Anonymus: <\/strong>"+data[i].value+"</p>";
      $('#lect-answers').append(stringVal);
    }
}

setInterval(get_data,2000);
