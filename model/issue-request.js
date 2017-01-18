(function(module){
  'use strict';
  function RepoIssue (opts){
    this.repoOwner = opts.html_url.split('/')[3];
    this.repoName = opts.html_url.split('/')[4];
    this.issueUser = opts.user.login;
    this.issueUserAvatarURL = opts.user.avatar_url;
    this.issueUserAcctURL = opts.user.html_url;
    this.dateCreated = helpers.parseGitHubDate(opts.created_at),
    this.daysAgo = helpers.numberOfDaysAgo(this.dateCreated);
    this.repoURL = opts.repository_url,
    this.issueURL = opts.html_url,
    this.title = opts.title,
    this.body = opts.body,
    this.id = opts.id;
  }

  let issues = {};
  module.issues = issues;
  issues.success = true;

  issues.data = [];
  issues.owner;
  issues.repo;
  issues.pageNumber = 1;
  issues.perPage = 100;

  issues.fetchData = function(callback, callback2, failure){
    $.when(
      $.get(`/github/repos/${issues.owner}/${issues.repo}/issues?page=${issues.pageNumber}&per_page=${issues.perPage}`, null)
      .done((data) => {
        console.log(data);
        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });
        callback(issues.data, issueView.noIssuesAlert);
        console.log(issues.data);
        callback2(null);

      })
      .fail(() => {
        issues.success = false;
        failure(issues.success);
      })
    );
  };



})(window);
