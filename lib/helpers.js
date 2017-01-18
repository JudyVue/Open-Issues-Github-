(function(module){
  'use strict';
  let helpers = {};
  module.helpers = helpers;

  helpers.parseGitHubDate = function(input){
    input = input.split('T')[0].split('-');
    input[1] -= 1;
    input = new Date(input[0], input[1], input[2]);
    return input;
  };

  helpers.setLocalStorage = function(input, callback){
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
    callback();
    return input;
  };

  helpers.parseInputURL = function(input){
    input = input.split('/');
    issues.owner = input[3];
    issues.repo = input[4];
  };

  helpers.numberOfDaysAgo = function(date){
    let today = new Date();
    let daysAgo = Math.floor((parseInt(today-date))/60/60/24/1000);

    if (daysAgo <= 0) return `today`;
    return daysAgo;
  };

  helpers.getNumberOfIssues = function(num, template, callback){
    let viewObj = {};
    let filteredToday;
    let filteredLessThan;
    let filteredMoreThan;

    filteredToday = issues.data.filter((element) => {
      return typeof element.daysAgo !== 'number';
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


})(window);
