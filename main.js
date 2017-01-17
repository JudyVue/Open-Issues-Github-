(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers:true*/
  'use strict';


  $('button').click(() => {
    //Empty out the table so it can be replaced with new data
    $('.issue-list').empty();

    //Empty out the array for same reason
    issues.data = [];

    //Get URL entered in input field and parse out the user name and repo in the callback function
    issueView.getInputURL(helpers.parseInputURL);
    issues.fetchData(helpers.setLocalStorage, () => {
      helpers.getNumberOfIssues(7, '.issue-template', issueView.appendData);
    });

  });



})();
