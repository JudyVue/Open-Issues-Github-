(function(module){
  'use strict';

  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers:true*/


  //attach this module as a property on the window
  let helpers = {};
  module.helpers = helpers;


  //parses the date format of the the Github date property so format on my constructor is YYYY-MM-DD, i.e.:
  helpers.parseGitHubDate = function(input){
    //instantiates a new JavaScript date for my constructor
    input = new Date(input);
    return input;
  };

  //sets received data to localstorage in case persistance is needed
  helpers.setLocalStorage = function(input){
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
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

  helpers.parseLinkHeader = function(request){
    let respHeaders = request.getAllResponseHeaders();
    if (respHeaders.includes('link: ') || respHeaders.includes('Link: ')){
      respHeaders = respHeaders.split(/link: /gi);
      respHeaders = respHeaders[1];
      respHeaders = respHeaders.split(',');
      respHeaders[0] = respHeaders[0].replace(/[<>]/g, '');
      respHeaders[0] = respHeaders[0].split(';');
      let rel = respHeaders[0][1];
      rel = rel.split('=');
      rel[1] = rel[1].replace(/['""']/g, '').trim();

      respHeaders[1] = respHeaders[1].replace(/[<>]/g, '');

      let parsedLink = {
        rel: rel[1],
        url: respHeaders[0][0].trim(),
      };
      return parsedLink;
    } else {
      // issueView.noIssuesAlert();
      return null;
    }
  };


})(window);
