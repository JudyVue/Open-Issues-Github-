// (function(module){
//   'use strict';
//   /*global Highcharts issues :true*/
//
//   let highChart = {};
//   module.highChart = highChart;
//
//   highChart.xAxis = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//
//   highChart.makeChart = function(data){
//     // console.log(data);
//
//     highChart.chart = Highcharts.chart('container', {
//       chart: {
//         type: 'bubble',
//       },
//       title: {
//         text: 'THIS IS A TEST',
//       },
//       xAxis: {
//         categories: highChart.xAxis,
//       },
//       yAxis: {
//         title: {
//           text: 'THIS IA A YAXIS TEST',
//         },
//       },
//
//       plotOptions: {
//         bubble: {
//           cursor: 'pointer',
//           dataLabels: {
//             enabled: true,
//             format: '{point.name}',
//             y: -50,
//           },
//         },
//       },
//
//       series: [{
//         data: highChart.xAxis,
//       }],
//       tooltip: {
//         useHTML: true,
//         headerFormat: '<h3>TEST</h3>',
//         pointFomat: 'hahahahaha testing',
//       },
//     });
//
//     return highChart.chart;
//
//   };
//
//
// })(window);
