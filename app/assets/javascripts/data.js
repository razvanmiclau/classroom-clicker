// //
// // // Object calls
// // var ajaxRequests = {
// //   getColumnData = $.ajax({
// //     url: 'localhost:3000',
// //     dataType: 'json',
// //     done: function(){
// //       //do stuff
// //     }
// //     setTimeout(getColumnData, 1000)
// //   }),
// //
// //   getPieData = $.ajax({
// //     url: 'localhost:3000',
// //     dataType: 'json',
// //     done: function(){
// //       //do stuff
// //     }
// //     setTimeout(getPieData, 1000)
// //   }),
// // };
// //
// // ajaxRequests.getPieData.abort() //Stop getting PieData requests.
// //
// // if (open == false) {
// //   $.each(ajaxRequests, function(key,value){
// //     key.abort()
// //   })
// // }
//
// var getColumnData = $.getJSON("/localhost:3000", function(data){
//   // do something
// });
//
// // MULTIPLE CHARTS - DIFFERENT CHARTS
//
// var defaultChart = {
//   chartContent: null,
//   highchart: null,
//   defaults: {
//     chart: {
//
//     },
//     series: []
//   },
//
//   init: function(options){
//     this.highchart = $.extend({}, this.defaults, options);
//     this.highchart.chart.renderTo = this.chartContent;
//   },
//
//   create: function(){
//     new Highcharts.Chart(this.highchart);
//   }
// };
//
// // column chart
// var columnChart = {
//   chartContent: '#chartContent',
//   options: {
//     // options
//   }
// };
//
// columnChart = $.extend(true, {}, defaultChart, columnChart);
// columnChart = init(columnChart.options);
// columnChart.create();
//
// // MULTIPLE CHARTS - SIMILAR CHARTS
// Highcharts.setOptions(options);
//
// var chart1 = Highcharts.Chart({
//   chart: {
//     renderTo: 'container1'
//   },
//   series: []
// });
//
// var chart2 = Highcharts.Chart({
//   chart: {
//     renderTo: 'container2'
//   },
//   series: []
// });
