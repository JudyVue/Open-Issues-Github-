(function(module){
  'use strict';
  let helpers = {};
  module.helpers = helpers;

  //parse the HTML url of the repo so it doesn't link to API date
  helpers.parseRepoURL = function(input){
    if(input.includes('/issues')){
      input = input.split('/issues');
      input = input[0].trim();
      return input;
    }

    if(input.includes('/pull')){
      input = input.split('/pull');
      input = input[0].trim();
      return input;
    }
  };

  //parses the date format of the the Github date property so format on my constructor is YYYY-MM-DD, i.e.:
  helpers.parseGitHubDate = function(input){
    //instantiates a new JavaScript date for my constructor
    input = new Date(input);
    return input;
  };

  helpers.saveSearchHistory = function(input){
    if(issueView.searchHistory.indexOf(input) === -1 && input.startsWith('https://github.com/'))
      issueView.searchHistory.push(input);

    localStorage.setItem('issue-search-history', JSON.stringify(issueView.searchHistory));
    return issueView.searchHistory;
  };

  helpers.setLocalStorage = function(input, callback){
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
    callback(input);
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
