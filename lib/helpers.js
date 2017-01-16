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
    localStorage.setItem('issues', JSON.stringify(input));
    input = JSON.parse(localStorage.getItem('issues'));
    console.log(input);
    return input;
  };

  //parses the input URL to retrieve user name and repo name and add them to API request

  helpers.parseInputURL = function(input){
    //https://github.com/substack/node-browserify
    input = input.split('/');
    issues.owner = input[3];
    issues.repo = input[4];
  };


  module.helpers = helpers;
})(window);
