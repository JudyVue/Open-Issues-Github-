(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers:true*/
  'use strict';

  let daysPassed = 7;
  $('form').submit((e) => {
    e.preventDefault();
    $('.issue-list').empty();
    issues.data = [];


    issueView.getInputURL(helpers.parseInputURL);


    issues.fetchData(helpers.setLocalStorage, () => {
      helpers.getNumberOfIssues(daysPassed, '.issue-template', issueView.appendData);
    }, issueView.badRequest);

  });



})();
