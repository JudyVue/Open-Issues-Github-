(function(module){
  'use strict';


  //this comment set up here to turn off eslint warnings about unused vars
  /*global issues issueView helpers d3Chart:true*/

  //set up constructor for easier use of data

  function RepoIssue (opts){
    this.repoOwner = opts.html_url.split('/')[3];
    this.repoName = opts.html_url.split('/')[4];
    this.issueUser = opts.user.login;
    this.issueUserAvatarURL = opts.user.avatar_url;
    this.issueUserAcctURL = opts.user.html_url;
    this.dateCreated = helpers.parseGitHubDate(opts.created_at),
    this.daysAgo = helpers.numberOfDaysAgo(this.dateCreated);
    this.daysAgoString = this.daysAgo;
    if(this.daysAgo !== 'today' && this.daysAgo !== 1) this.daysAgoString = `${this.daysAgo} days ago`;
    if(this.daysAgo === 1) this.daysAgoString = `${this.daysAgo} day ago`;
    this.repoURL = helpers.parseRepoURL(opts.html_url),
    this.issueURL = opts.html_url,
    this.labels = opts.labels,
    this.title = opts.title,
    this.body = opts.body;
    if (this.body === '') this.body = 'This user did not enter any text for this issue.';
    this.id = opts.id;
  }

  let issues = {};
  module.issues = issues;

  issues.data = [];
  issues.owner;
  issues.repo;
  issues.pageNumber = 1;
  issues.perPage = 100;


  issues.getIt = function(num, callback){
    return $.ajax({
      type: 'GET',
      url: `/github/repos/${issues.owner}/${issues.repo}/issues?page=${num}&per_page=100`,
      success: function(data){
        issueView.noIssuesAlert(data, num);

        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });

        callback(issues.data);
      },
      error: function () {
        issueView.badRequest();
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




})(window);
