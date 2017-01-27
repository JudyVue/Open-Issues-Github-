(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers highChart:true*/
  'use strict';


  let daysPassed = 7;
  $('form').submit((e) => {

    e.preventDefault();
    $('h4').hide();
    $('.issue-list').empty();
    issues.data = [];


    issueView.getInputURL(helpers.parseInputURL);
    issues.getIt(1, (data) => {
      console.log(data, 'what are you?', data.length);
      highChart.makeChart(data);
    });



    // issues.fetchData(1);

    // issues.fetchData(helpers.setLocalStorage, () => {
    //   helpers.getNumberOfIssues(daysPassed, '.issue-template', issueView.appendData);
    // }, issueView.badRequest);

  });



})();
