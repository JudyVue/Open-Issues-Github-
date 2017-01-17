(function(){

  //this comment set up here to turn off my eslint warnings about unused vars
  /*global issues issueView helpers:true*/
  'use strict';

  //set variable so we can pass it in to helpers.getNumberOfIssues, and easily change it at the top of this module if we need to. I.e. to see how many issues were opened 10 days ago instead of 7, we can just change it here instead of hunting for #helpers.getNumberOfIssues in the bottom clutter.
  let daysPassed = 7;


  $('button').click(() => {
    //Empty out the table so it can be replaced with new data
    $('.issue-list').empty();

    //Empty out the array for same reason
    issues.data = [];

    //Get URL entered in input field and parse out the user name and repo in the callback function
    issueView.getInputURL(helpers.parseInputURL);

    //Make Github API request now that we have a user name and repo name from the input field, set the returned data to local storage, calculate #issues and render to to the page, OR show the bad request h5 if user did not input valid URL
    issues.fetchData(helpers.setLocalStorage, () => {
      helpers.getNumberOfIssues(daysPassed, '.issue-template', issueView.appendData);
    }, issueView.badRequest);

  });



})();
