(function(module){
  'use strict';

//this comment set up here to turn off eslint warnings about unused vars
/*global issues issueView helpers:true*/
  function RepoIssue (opts){
    this.repoOwner = opts.html_url.split('/')[3];
    this.repoName = opts.html_url.split('/')[4];
    this.issueUser = opts.user.login;
    this.issueUserAvatarURL = opts.user.avatar_url;
    this.issueUserAcctURL = opts.user.html_url;
    this.dateCreated = helpers.parseGitHubDate(opts.created_at),
    this.repoURL = opts.repository_url,
    this.issueURL = opts.html_url,
    this.title = opts.title,
    this.body = opts.body,
    this.id = opts.id;
  }

  let issues = {};

  issues.data = [];
  issues.owner;
  issues.repo;


  issues.success = true;


  issues.fetchData = function(callback){
    $.when(
      $.get(`/github/repos/${issues.owner}/${issues.repo}/issues`)
      .done((data) => {
        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });
        callback(issues.data);
      })
      .fail(() => {
        issues.success = false;
        console.log('error handling request');
      })
    );
  };


  module.issues = issues;
})(window);
