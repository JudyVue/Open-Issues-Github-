(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers highChart d3Chart:true*/
  'use strict';

  $('form').submit((e) => {

    e.preventDefault();
    $('h4').hide();
    issues.data = [];

    $('svg').remove();
    d3Chart.makeSVG();

    // d3Chart.removeStuff();
    issueView.getInputURL(helpers.parseInputURL);

    issues.getIt(1, (data) => {
      d3Chart.makeCircles(data);
    });
  });



})();
