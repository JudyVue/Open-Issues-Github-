(function(module){
  'use strict';

  let helpers = {};

  helpers.parseGitHubDate = function(input){
    input = input.split('T')[0].split('-');
    input[1] -= 1;
    input = new Date(input[0], input[1], input[2]);
    return input;
  };

  helpers.setLocalStorage = function(input){
    localStorage.setItem('issues', JSON.stringify(input));

    input = JSON.parse(localStorage.getItem('issues'));
    console.log(input);
    return input;
  };


  module.helpers = helpers;
})(window);
