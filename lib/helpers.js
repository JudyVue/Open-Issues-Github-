(function(module){
  'use strict';

  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers:true*/

  let helpers = {};

  //parses the date format of the the Github creation date so format is YYYY-MM-DD.
  helpers.parseGitHubDate = function(input){
    input = input.split('T')[0].split('-');
    input[1] -= 1;
    input = new Date(input[0], input[1], input[2]);
    return input;
  };

  //sets received data to localstorage for persistance
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

  //calculates the #days ago the issue was opened
  helpers.numberOfDaysAgo = function(date){
    let today = new Date();
    let daysAgo = Math.floor((parseInt(today-date))/60/60/24/1000);
    if (daysAgo === 0 || daysAgo < 0) return `today`;
    return daysAgo;
  };

  //gets number of issues created last 24 hours, 7 days, or >7 days ago
  helpers.getNumberOfIssues = function(num, template, callback){
    let viewObj = {};
    let filteredToday;
    let filteredLessThan;
    let filteredMoreThan;

    //filters out data where obj.daysAgo === 'today'
    filteredToday = issues.data.filter((element) => {
      return element.daysAgo === 'today';
    });

    filteredLessThan = issues.data.filter((element) => {
      return element.daysAgo <= num;
    });

    filteredMoreThan = issues.data.filter((element) => {
      return element.daysAgo > num;
    });

    viewObj = {
      today: filteredToday.length,
      less: filteredLessThan.length,
      more: filteredMoreThan.length,
    };


    let rendered = issueView.render(template, viewObj);
    callback('.issue-list', rendered);
  };


  module.helpers = helpers;
})(window);
