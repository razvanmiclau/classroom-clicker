var data = [];
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

var barChart, pieChart;
var answers = [];
// var voteAvailable = false;
// var count = 0;

$(function(){
  // DATA URLs
  var totalURL = '/questions/' + question_id + '/total';
  var wordsURL = '/questions/' + question_id + '/words';
  var dataURL = '/questions/' + question_id + '/data';

  // AJAX REQUESTS OBJECT
  var ajaxRequests = {
    getCardsData : function(){
      return $.ajax({
        url: dataURL,
        dataType: 'json',
        async: false,
        success: function(data){
          draw_answers(data);
          setTimeout(ajaxRequests.getCardsData)
        }
      });
    },

    getWordsData : function(){
      return $.ajax({
        url: wordsURL,
        dataType: 'json',
        async: false,
        success: function(data){
          // After data has been received
          // var parsed = JSON.parse(data);
          var parsedArray = [];
          for(var element in data){
            parsedArray.push(data[element]);
          };
          var words_array = createObjectArray(data);
          $('#cloud').jQCloud(words_array, {
            autoResize: true,
            colors: colors,
            fontSize: {
              from: 0.1,
              to: 0.04
            }
          });

          $('#cloud').jQCloud('update', words_array);
          setTimeout(ajaxRequests.getWordsData, 1000)
        } // end done
      })
    },

    getColumnData : function(){
      return $.ajax({
        url: totalURL,
        dataType: 'json',
        async: false,
        success: function(data){
          // After data has been received
          var answers = [];
          var answerValues = [];
            $.each(data, function(k,v){
              answers.push(k);
              answerValues.push(parseInt(v));
            });
          // Add data to chart
          barChart.xAxis[0].setCategories(answers);
          barChart.series[0].setData(answerValues);
          setTimeout(ajaxRequests.getColumnData, 1000)
        }
      })
    },

    getPieData : function(){
      return $.ajax({
        url: totalURL,
        dataType: 'json',
        async: false,
        success: function(data){
          // After data has been received
          var pieDataArray = [];
            $.each(data, function(k,v){
              var dataObject = new Object();
              dataObject.name = k;
              dataObject.y = v;
              pieDataArray.push(dataObject);
            });
          // Add data to chart
          pieChart.series[0].setData(pieDataArray);
          setTimeout(ajaxRequests.getPieData, 1000)
        }
      })
    },
  };

  // Functions here...

  function drawColumnChart() {
    barChart = new Highcharts.Chart({
      chart: {
        renderTo : 'bar-chart',
        type: 'column',
        events: {
          load: function() {
            barChart = this;
            ajaxRequests.getColumnData();
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

  function drawPieChart() {
    pieChart = new Highcharts.Chart({
      chart: {
        renderTo : 'pie-chart',
        type: 'pie',
        events: {
          load: function() {
            pieChart = this;
            ajaxRequests.getPieData();
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
  };

  // RUN CODE HERE
  ajaxRequests.getCardsData();
  ajaxRequests.getWordsData();
  drawColumnChart();
  drawPieChart();

}); // end document.ready

// FUNCTIONS / METHODS
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
