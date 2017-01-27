(function(module){
  'use strict';
  /*global Highcharts issues :true*/

  let highChart = {};
  module.highChart = highChart;

  highChart.makeChart = function(data){
    console.log(issues.data);

    highChart.chart = Highcharts.chart('container', {
      chart: {
        type: 'bubble',
      },
      title: {
        text: 'THIS IS A TEST',
      },
      xAxis: {
        categories: ['test1', 'test2', 'test3'],
      },
      yAxis: {
        title: {
          text: 'THIS IA A YAXIS TEST',
        },
      },

      plotOptions: {
        bubble: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            y: -50,
          },
        },
      },

      series: [{
        data: data,
      }],
      tooltip: {
        useHTML: true,
        headerFormat: '<h3>TEST</h3>',
        pointFomat: 'hahahahaha testing',
      },
    });

    return highChart.chart;

  };


})(window);
