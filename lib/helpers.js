(function(module){
  'use strict';

  let helpers = {};

  //parses the date format of the the Github creation date so format is YYYY-MM-DD.
  helpers.parseGitHubDate = function(input){
    input = input.split('T')[0].split('-');
    input[1] -= 1;
    input = new Date(input[0], input[1], input[2]);
    return input;
  };

  //sets received data to localstorage for persistence
  helpers.setLocalStorage = function(input){
    localStorage.clear();
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
    console.log('this is the array from local storage', input);
    return input;
  };

  //parses the input URL to retrieve user name and repo name and add them to API request
  helpers.parseInputURL = function(input){
    //https://github.com/substack/node-browserify
    input = input.split('/');
    issues.owner = input[3];
    issues.repo = input[4];
    console.log('this is the owner:', issues.owner, 'this is the repo name:', issues.repo);
  };


  module.helpers = helpers;
})(window);
