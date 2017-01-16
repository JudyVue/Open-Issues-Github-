(function(module){
  'use strict';

  function RepoIssues (opts){
    this.date_created = helpers.parseGitHubDate(opts.created_at);
    console.log(this.date_created);
  }
  let issues = {};

  issues.data = [];

  issues.fetchData = function(){
    $.when(
      $.get('/github/repos/github/hub/issues')
      .done((data) => {
        console.log(data);
        data.forEach((element) => {
          let issue = new RepoIssues(element);
          issues.data.push(issue);
        });
        console.log('my issues array', issues.data);
      })
    );
  };
  issues.fetchData();

  module.issues = issues;
})(window);
