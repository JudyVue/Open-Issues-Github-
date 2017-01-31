(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers highChart d3Chart:true*/
  'use strict';


  let daysPassed = 7;
  $('form').submit((e) => {

    e.preventDefault();
    $('h4').hide();
    issues.data = [];


    issueView.getInputURL(helpers.parseInputURL);
    issues.getIt(1, d3Chart.makeCircles);



    // issues.fetchData(1);

    // issues.fetchData(helpers.setLocalStorage, () => {
    //   helpers.getNumberOfIssues(daysPassed, '.issue-template', issueView.appendData);
    // }, issueView.badRequest);

  });



})();
