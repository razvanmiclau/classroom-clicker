// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var data = [];
var colours = ['red', 'green', 'orange', 'blue', 'light-blue'];

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

function randomColor(){
  var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function get_data(){
  $.get('/questions/' + question_id + '/data', function(dt){
    data = dt;
    //draw_answers(data);
    drawChart();
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
  console.log(obj);
  var labelsArray = [];
  var dataArray = [];

    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        labelsArray.push(key);
        dataArray.push(obj[key]);
      }
    };

  var data = {
    labels: labelsArray,
    datasets: [
        {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: dataArray
        }
    ]
  };

  var pieData = [];
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        var objectData = {
          value: obj[key],
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: key
        };
        pieData.push(objectData);
      }
    };

  var ctx = document.getElementById('barChart').getContext("2d");
  var ctxPie = document.getElementById('pieChart').getContext("2d");

  var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    responsive: true,
    animation: false
  };

  var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,
        responsive: true,
        animation: false
  };

  var barChart = new Chart(ctx).Bar(data, options);
  var pieChart = new Chart(ctxPie).Pie(pieData, pieOptions);

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
