(function(module){
  'use strict';

  // let parsed = require('parse-link-header');

  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers:true*/

  //set up constructor for easier use of data
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

  //set this as property on window
  let issues = {};
  module.issues = issues;

  issues.data = [];
  issues.owner;
  issues.repo;

  issues.getIt = function(num){
    $.ajax({
      type: 'GET',
      url: `/github/repos/badOwner/Code301Project/issues?page=${num}&per_page=100`,
      success: function(data, status, request){
        console.log('what?', issues.data);
        console.log(issues.data.length, 'what is this');

        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });

        let links = helpers.parseLinkHeader(request);
        if(links !== null && links.rel !== 'last'){
          console.log('what is num?', num);
          num++;
          issues.getIt(num);

        }
        return;
      },
      error: function (request, failure, errorThrown) {

        issueView.badRequest();
        console.log(request, failure, errorThrown);
      },
    });
  };

  issues.fetchData = function(num){
    $.when(
      $.get(`/github/repos/Automattic/mongoose/issues?page=${num}&per_page=100`)
      .done((data) => {
        if(data.length){
          data.forEach((element) => {
            let issue = new RepoIssue(element);
            issues.data.push(issue);
          });
          num++;
          issues.fetchData(num);
          console.log(num, issues.data);
        } else {
          console.log('no more data');
        }

      })
      .fail(() => {
        issues.success = false;
      })
    );
  };


  //making API get request
  // issues.fetchData = function(callback, callback2, failure){
  //   $.when(
  //     $.get(`/github/repos/${issues.owner}/${issues.repo}/issues`)
  //     .done((data) => {
  //       data.forEach((element) => {
  //         let issue = new RepoIssue(element);
  //         issues.data.push(issue);
  //       });
  //       callback(issues.data, issueView.noIssuesAlert);
  //
  //       console.log(issues.data);
  //       callback2(null);
  //
  //     })
  //     .fail(() => {
  //       issues.success = false;
  //       failure(issues.success);
  //     })
  //   );
  // };



})(window);
