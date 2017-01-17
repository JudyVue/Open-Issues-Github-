(function(module){
  'use strict';

  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers:true*/


  //attach this module as a property on the window
  let helpers = {};
  module.helpers = helpers;


  //parses the date format of the the Github date property so format on my constructor is YYYY-MM-DD, i.e.:
  helpers.parseGitHubDate = function(input){

    //Github's created_at = 2017-01-17T05:53:21Z (a string)
    //I parse this into 2017-01-17
    input = input.split('T')[0].split('-');

    //need to subtract 1 from the month because JavaScript reads months starting with zero index, i.e. January = 0, December = 11
    input[1] -= 1;

    //instantiates a new date for my constructor
    input = new Date(input[0], input[1], input[2]);
    return input;
  };

  //sets received data to localstorage in case persistance is needed
  helpers.setLocalStorage = function(input, callback){
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
    callback();
    return input;
  };

  //parses the input URL to retrieve user name and repo name and adds them to API request
  helpers.parseInputURL = function(input){
    input = input.split('/');
    issues.owner = input[3];
    issues.repo = input[4];
  };

  //calculates the #days ago the issue was opened, used as the value for the 'daysAgo' property on constructor
  helpers.numberOfDaysAgo = function(date){
    let today = new Date();

    //provides whole number rounded down
    let daysAgo = Math.floor((parseInt(today-date))/60/60/24/1000);

    //returns the string 'today' if issue was created today. <0 is accounted for because one of my returned creation dates was timestamped with a timezone that was ahead of me, so they were technically 1 day ahead, which made 'daysAgo' a negative number
    if (daysAgo <= 0) return `today`;
    return daysAgo;
  };

  //gets number of issues created last 24 hours, 7 days, or >7 days ago if 7 is passed as num
  helpers.getNumberOfIssues = function(num, template, callback){
    let viewObj = {};
    let filteredToday;
    let filteredLessThan;
    let filteredMoreThan;

    //returns issues opened today because the 'daysAgo' property of my constructor is set to the string 'today' when an issue is created the same day
    filteredToday = issues.data.filter((element) => {
      return typeof element.daysAgo !== 'number';
    });

    //returns issues opened last 7 days
    filteredLessThan = issues.data.filter((element) => {
      return element.daysAgo <= num;
    });

    //returns issues opened more than 7 days ago
    filteredMoreThan = issues.data.filter((element) => {
      return element.daysAgo > num;
    });

    //set the length in the view object so we can compile with Handlebars
    viewObj = {
      today: filteredToday.length,
      less: filteredLessThan.length,
      more: filteredMoreThan.length,
    };

    //compile with Handlebars
    let rendered = issueView.render(template, viewObj);

    //invoke our callback passing in the table to append to and the Handlebars function above
    callback('.issue-list', rendered);
  };


})(window);
