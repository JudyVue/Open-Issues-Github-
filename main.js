(function(module){
  'use strict';
  let main = {};

  $('button').click(() => {
    issues.data = [];
    issueView.getInputURL(helpers.parseInputURL);
    issues.fetchData(helpers.setLocalStorage);
  });


  module.main = main;
})(window);
