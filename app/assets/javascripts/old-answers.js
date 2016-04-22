// // Place all the behaviors and hooks related to the matching controller here.
// // All this logic will automatically be available in application.js.
//
// var data = [];
// var colours = ['red', 'green', 'orange', 'blue', 'light-blue'];
//
// var barChart;
// var pieChart;
// var answers = [];
// var voteAvailable = false;
// var count = 0;
//
//
// $(document).ready(function(){
//   $('#choices-form input[type=submit]').on('click', function(){
//     var button_value = $(this).val();
//     console.log(button_value);
//     $('#choices-form input[type=text]').val(button_value);
//   });
//
//   $('.toggle-fullscreen').on('click', function(){
//     var targetElement = $('.screen')[0];
//     if(screenfull.enabled){
//       screenfull.toggle(targetElement);
//     }
//   });
//
//   colours.sort(pickRandom);
//   $('.answer-card').each(function(i){
//     $(this).addClass(colours[i]);
//   });
//
//   $('#binary-choice-form input[type=submit]').on('click', function(){
//     var button_value = $(this).val();
//     console.log(button_value);
//     $('#binary-choice-form input[type=text]').val(button_value);
//   });
//
//   $('#startVote').on('click', function() {
//       if(count%2 == 0){
//         voteAvailable = true;
//         count++;
//         $(this).text('Stop Voting');
//       } else {
//         voteAvailable = false;
//         count++;
//         $(this).text('Start Voting');
//       }
//   });
//
//   get_data();
//   drawColumnChart();
//   drawPieChart();
// });
//
// function drawColumnChart() {
//   barChart = new Highcharts.Chart({
//     chart: {
//       renderTo : 'bar-chart',
//       type: 'column',
//       events: {
//         load: function() {
//           barChart = this;
//           requestData();
//         }
//       }
//     },
//     title: {
//       text: null
//     },
//     xAxis: {
//       answers: answers
//     },
//     yAxis: {
//       title: {
//         text: null
//       }
//     },
//     series: [{
//       name: 'Votes',
//       data: []
//     }]
//   });
// }
//
// function drawPieChart() {
//   pieChart = new Highcharts.Chart({
//     chart: {
//       renderTo : 'pie-chart',
//       type: 'pie',
//       events: {
//         load: function() {
//           pieChart = this;
//           requestDataPie();
//         }
//       }
//     },
//     plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                     style: {
//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                     }
//                 },
//                 showInLegend: true
//             }
//         },
//
//     title: {
//       text: null
//     },
//     xAxis: {
//       answers: answers
//     },
//     yAxis: {
//       title: {
//         text: null
//       }
//     },
//     series: [{
//       name: 'Votes',
//       data: []
//     }]
//   });
// }
//
// function get_data(){
//   $.ajax({
//     url: '/questions/' + question_id + '/data',
//     dataType: 'json',
//     async: true,
//     success: function(dt){
//       data = dt;
//       draw_answers(data);
//       drawWordCloud();
//     },
//     cache: false
//   })
// }
//
//
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
//
// function requestData() {
//   $.ajax({
//     url: '/questions/' + question_id + '/total',
//     dataType: 'json',
//     async: true,
//     success: function(data) {
//       var answers = [];
//       var answerValues = [];
//       $.each(data, function(i,e) {
//         answers.push(i);
//         answerValues.push(parseInt(e));
//       });
//       // chart.series.addPoint([categories, seriesData], true, true);
//       barChart.xAxis[0].setCategories(answers);
//       barChart.series[0].setData(answerValues);
//       setTimeout(requestData, 2000);
//     },
//     cache: false
//   });
// }
//
// function requestDataPie() {
//   $.ajax({
//     url: '/questions/' + question_id + '/total',
//     dataType: 'json',
//     async: true,
//     success: function(data) {
//       var dataObjectArray = [];
//       $.each(data, function(i,e) {
//         dataobj = {
//           name: i,
//           y: e
//         }
//         dataObjectArray.push(dataobj);
//       });
//       // chart.series.addPoint([categories, seriesData], true, true);
//       pieChart.series[0].setData(dataObjectArray);
//       setTimeout(requestDataPie, 2000);
//     },
//     cache: false
//   });
// }
//
// function pickRandom(){
//   return Math.round(Math.random());
// }
//
// function randomColor(){
//   var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };
//
// function createObjectArray(wordsArray){
//   var objectArray = [];
//   var copyArray = wordsArray.slice(0);
//
//   for(var i=0; i<wordsArray.length;i++){
//     var counter = 0;
//     for(var w=0; w<copyArray.length;w++){
//       if(wordsArray[i] == copyArray[w]){
//         counter++;
//         delete copyArray[w];
//       }
//     }
//     if(counter > 0){
//       var obj = new Object();
//       obj.text = wordsArray[i];
//       obj.weight = counter;
//       objectArray.push(obj);
//     }
//   }
//   return objectArray;
// }
//
// function drawWordCloud() {
//   var words = $.ajax({
//     url: '/questions/' + question_id + '/words',
//     dataType: 'json',
//     async: true
//   }).responseText;
//   /*
//     word_array = [
//       {text: "word1", weight: 15},
//       {text: "word2", weight: 20}
//     ]
//   */
//   var parsed = JSON.parse(words);
//   var arr = [];
//
//   for(var element in parsed){
//     arr.push(parsed[element]);
//   }
//   var word_array = createObjectArray(arr);
//   // console.log(JSON.stringify(word_array));
//
//   $("#cloud").jQCloud(word_array ,{
//     autoResize: true,
//     colors: ["cornflowerblue",
// 			"olivedrab",
// 			"orange",
// 			"tomato",
// 			"crimson",
// 			"purple",
// 			"turquoise",
// 			"forestgreen",
// 			"navy",
// 			"gray"
// 		],
//     fontSize: {
//       from: 0.1,
//       to: 0.04
//     }
//   });
//
//   $('#cloud').jQCloud('update', word_array);
//
// }
//
// setInterval(get_data,2000);
