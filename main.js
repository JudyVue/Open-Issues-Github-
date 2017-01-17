(function(module){

  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers:true*/
  'use strict';
  let main = {};

  $('button').click(() => {
    issues.data = [];
    issueView.getInputURL(helpers.parseInputURL);
    issues.fetchData(helpers.setLocalStorage);
  });


  module.main = main;
})(window);
