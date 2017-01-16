(function(module){
  'use strict';

  const superagent = require('superagent');


  function RepoIssues (opts){
    this.date_created = helpers.parseGitHubDate(opts.created_at);
    console.log(this.date_created);
    // opts.created_at.split('T')[0].split('-');
    // this.date_created[1] -=1;
    // this.date_created = new Date(this.date_created[0], this.date_created[1], this.date_created[2]);
  }


  let issues = {};

  // const $ = require('jquery');

  issues.data = [];

  issues.fetchData = function(){
    superagent.get('/github/repos/github/hub/issues')
    .end((err, data) => {
      if (err) return console.error(err);
      console.log(data);
      data.forEach((element) => {
        let issue = new RepoIssues(element);
        issues.data.push(issue);
      });
      console.log('my issues array', issues.data);
    });


    // $.when(
    //   $.get('/github/repos/github/hub/issues')
    //   .done((data) => {
    //     console.log(data);
    //     data.forEach((element) => {
    //       let issue = new RepoIssues(element);
    //       exports.data.push(issue);
    //     });
    //     console.log('my issues array', exports.data);
    //   })
    // );
  };
  issues.fetchData();

  module.issues = issues;
})(window);
