(function(){
  'use strict';
  let daysPassed = 7;
  $('form').submit((e) => {
    e.preventDefault();
    $('.issue-list').empty();
    issues.data = [];
    issueView.getInputURL(helpers.parseInputURL);
    issues.fetchData(helpers.setLocalStorage, () => {
      helpers.getNumberOfIssues(daysPassed, '.issue-template', issueView.appendData);
    }, issueView.badRequest);

  });
})();
