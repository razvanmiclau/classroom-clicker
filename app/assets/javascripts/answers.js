// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var data = [];


// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

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



function get_data(){
  $.get('/questions/' + question_id + '/data', function(dt){
    data = dt;
    draw_answers(data);
    drawChart();
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

function drawChart() {

  // Create the data table.
  var jsonData = $.ajax({
    url: '/questions/' + question_id + '/total',
    dataType: 'json',
    async: false
  }).responseText;

  var obj = $.parseJSON(jsonData);
  var dataArray = [["Answer", "Votes"]];
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        var item = [key, obj[key]];
        dataArray.push(item);
      }
    }
  var dataTable = google.visualization.arrayToDataTable(dataArray);

  // Set chart options
  var options = {
                 'width':400,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(dataTable, options);
}

setInterval(get_data,2000);
