// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var data = [];
var colours = ['red', 'green', 'orange', 'blue', 'light-blue'];

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

  $('.toggle-fullscreen').on('click', function(){
    var targetElement = $('.screen')[0];
    if(screenfull.enabled){
      screenfull.toggle(targetElement);
    }
  });

  colours.sort(pickRandom);
  $('.answer-card').each(function(i){
    $(this).addClass(colours[i]);
  });

  $('#binary-choice-form input[type=submit]').on('click', function(){
    var button_value = $(this).val();
    console.log(button_value);
    $('#binary-choice-form input[type=text]').val(button_value);
  });
});

function pickRandom(){
  return Math.round(Math.random());
}

function get_data(){
  $.get('/questions/' + question_id + '/data', function(dt){
    data = dt;
    //draw_answers(data);
    $(window).resize(function(){
      drawChart();
    });
    drawWordCloud();
  });
}

// function draw_answers(data){
//   $('#lect-answers').children().remove();
//     for (var i = 0; i < data.length; i++) {
//       var strVar = "";
//       //stringVal += "<p class=\"bg-info answer-line\"><strong>Anonymus: <\/strong>"+data[i].value+"</p>";
//       strVar += "<div class=\"col-sm-3\">";
//       strVar += "<div class=\"panel\">";
//       strVar += "<div class=\"panel-body\">";
//       strVar += "<h4>" + data[i].value + "</h4>";
//       strVar += "<\/div>";
//       strVar += "<\/div>";
//       strVar += "<\/div>";
//       $('#lect-answers').append(strVar);
//     }
// }

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
  var barOptions = {
    focusTarget: 'category',
		backgroundColor: 'transparent',
		colors: ['cornflowerblue', 'tomato'],
		fontName: 'Open Sans',
		chartArea: {
			left: 50,
			top: 10,
			width: '100%',
			height: '70%'
		},
		bar: {
			groupWidth: '80%'
		},
		hAxis: {
			textStyle: {
				fontSize: 11
			}
		},
		vAxis: {
			minValue: 0,
			maxValue: 1500,
			baselineColor: '#DDD',
			gridlines: {
				color: '#DDD',
				count: 4
			},
			textStyle: {
				fontSize: 11
			}
		},
		legend: {
			position: 'bottom',
			textStyle: {
				fontSize: 12
			}
		},
		animation: {
			duration: 1200,
			easing: 'out',
			startup: true
		}
  };

  var pieOptions = {
    width: '100%',
    height: '350',
    backgroundColor: 'transparent',
		pieHole: 0.4,
		colors: ["cornflowerblue",
			"olivedrab",
			"orange",
			"tomato",
			"crimson",
			"purple",
			"turquoise",
			"forestgreen",
			"navy",
			"gray"
		],
		pieSliceText: 'value',
		tooltip: {
			text: 'percentage'
		},
		fontName: 'Roboto',
		chartArea: {
			width: '55%',
			height: '250',
      left: 0,
      top: 20
		},
		legend: {
			textStyle: {
				fontSize: 16
			},
      position: 'bottom'
		}

  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('bar-chart'));
  var pie = new google.visualization.PieChart(document.getElementById('pie-chart'));
  chart.draw(dataTable, barOptions);
  pie.draw(dataTable, pieOptions);
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
    colors: ["cornflowerblue",
			"olivedrab",
			"orange",
			"tomato",
			"crimson",
			"purple",
			"turquoise",
			"forestgreen",
			"navy",
			"gray"
		],
    fontSize: {
      from: 0.1,
      to: 0.04
    }
  });

  $('#cloud').jQCloud('update', word_array);

}

setInterval(get_data,2000);
