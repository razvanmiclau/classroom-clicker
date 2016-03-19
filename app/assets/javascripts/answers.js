// GLOBAL VARIABLES
var colors = ["cornflowerblue",
  "olivedrab",
  "orange",
  "tomato",
  "crimson",
  "purple",
  "turquoise",
  "forestgreen",
  "navy",
  "gray"
];

var barChart;
var pieChart;
var answers = [];

$('.questions.show').ready(function(){
  var fetchData = function(){
    var dataRequest = $.ajax({
      url: '/questions/' + question_id + '/data',
      dataType: 'json',
      cache: false,
      async: true,
      success: function(data){
        getData(data.answers);
        getWords(data.words);
        getColumnData(data.total);
        getPieData(data.total);
        setTimeout(fetchData, 2000);
      }
    });
  };

  drawColumnChart(fetchData);
  drawPieChart(fetchData);

});

var getColumnData = function(dt){
  var categories = [] ;
  var answer = [];
    $.each(dt, function(i,e){
      categories.push(i);
      answer.push(parseInt(e));
    });
  barChart.xAxis[0].setCategories(categories);
  barChart.series[0].setData(answer);
};

var getPieData = function(dt){
  var dataObjectArray = [];
    $.each(dt, function(i,e){
      dataobj = {
        name: i, y: e
      }
      dataObjectArray.push(dataobj);
    });
  pieChart.series[0].setData(dataObjectArray);
};

var getData = function(dt){
  $('#lect-answers').children().remove();
    for (var i = 0; i < dt.length; i++) {
      var strVar = "";
      //stringVal += "<p class=\"bg-info answer-line\"><strong>Anonymus: <\/strong>"+data[i].value+"</p>";
      strVar += "<div class=\"col-sm-3\">";
      strVar += "<div class=\"panel\">";
      strVar += "<div class=\"panel-body\">";
      strVar += "<h4>" + dt[i].value + "</h4>";
      strVar += "<\/div>";
      strVar += "<\/div>";
      strVar += "<\/div>";
      $('#lect-answers').append(strVar);
    }
};

var getWords = function(dt){
  var initialArray = [];
  var words_array = [];
  for(var element in dt){
    initialArray.push(dt[element]);
  }
  words_array = createObjectArray(initialArray);
  $("#cloud").jQCloud(words_array ,{
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

    $('#cloud').jQCloud('update', words_array);

};

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

function drawColumnChart(fetch) {
  barChart = new Highcharts.Chart({
    chart: {
      renderTo : 'bar-chart',
      type: 'column',
      events: {
        load: function() {
          barChart = this;
          fetch();
        }
      }
    },
    title: {
      text: null
    },
    xAxis: {
      answers: answers
    },
    yAxis: {
      title: {
        text: null
      }
    },
    series: [{
      name: 'Votes',
      data: []
    }]
  });
}

function drawPieChart(fetch) {
  pieChart = new Highcharts.Chart({
    chart: {
      renderTo : 'pie-chart',
      type: 'pie',
      events: {
        load: function() {
          pieChart = this;
          fetch();
        }
      }
    },
    plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
            }
        },

    title: {
      text: null
    },
    xAxis: {
      answers: answers
    },
    yAxis: {
      title: {
        text: null
      }
    },
    series: [{
      name: 'Votes',
      data: []
    }]
  });
}
