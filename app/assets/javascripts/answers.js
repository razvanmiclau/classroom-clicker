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
    drawWordCloud();
  });
}

function draw_answers(data){
  $('#lect-answers').children().remove();
    for (var i = 0; i < data.length; i++) {
      var strVar = "";
      //stringVal += "<p class=\"bg-info answer-line\"><strong>Anonymus: <\/strong>"+data[i].value+"</p>";
      strVar += "<div class=\"col-sm-3\">";
      strVar += "<div class=\"panel\">";
      strVar += "<div class=\"panel-body\">";
      strVar += "<h4>" + data[i].value + "</h4>";
      strVar += "<\/div>";
      strVar += "<\/div>";
      strVar += "<\/div>";
      $('#lect-answers').append(strVar);
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
    'width':800,
    'height':700,
    'is3D': true
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('chart'));
  var pie = new google.visualization.PieChart(document.getElementById('pie'));
  chart.draw(dataTable, options);
  pie.draw(dataTable, options);
}

function createObjectArray(wordsArray){
  var objectArray = [];
  var copyArray = wordsArray.slice(0);

  for(var i=0; i<wordsArray.length;i++){
    var counter = 0;
    for(var w=0; w<copyArray.length;w++){
      if(wordsArray[i] == copyArray[w]){
        counter++;
        delete copyArray[w];
      }
    }
    if(counter > 0){
      var obj = new Object();
      obj.text = wordsArray[i];
      obj.weight = counter;
      objectArray.push(obj);
    }
  }
  return objectArray;
}

function drawWordCloud() {
  var words = $.ajax({
    url: '/questions/' + question_id + '/words',
    dataType: 'json',
    async: false
  }).responseText;
  /*
    word_array = [
      {text: "word1", weight: 15},
      {text: "word2", weight: 20}
    ]
  */
  var parsed = JSON.parse(words);
  var arr = [];
  for(var element in parsed){
    arr.push(parsed[element]);
  }
  var word_array = createObjectArray(arr);
  // console.log(JSON.stringify(word_array));

  $("#cloud").jQCloud(word_array ,{
    autoResize: true,
  });

  $('#cloud').jQCloud('update', word_array);

}

setInterval(get_data,2000);
