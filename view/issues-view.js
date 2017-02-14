(function(module){

  //need this comment here so eslint will ignore 'unused vars'
  /*global issues issueView helpers Handlebars:true*/

  //set this as property on window
  let issueView = {};
  module.issueView = issueView;

  issueView.searchHistory = [];

  //sets the copy/pasted URL and passes it into the callback, which is #helpers.parseInputURL
  issueView.getInputURL = function(callback){
    let url = $('input').val();
    helpers.saveSearchHistory(url);
    callback(url, null);
  };

  //renders an object with Handlebars
  issueView.render = function(templateid, data){
    let template = Handlebars.compile($(templateid).text());
    return template(data);
  };

  //appends the Handlebars script to selected section of DOM
  issueView.appendData = function(section, compiledObj){
    $(section).append(compiledObj);
  };

  issueView.autoComplete = function(){
    if(localStorage.getItem('issue-search-history')){
      issueView.searchHistory = JSON.parse(localStorage.getItem('issue-search-history'));
    }
    $('input').autocomplete({
      source: issueView.searchHistory,
    });
  };


  issueView.noIssuesAlert = function(data, num){
    if(!data.length && num === 1){
      $('.issue-list').hide();
      $('.none').show();
      $('h4').not('.none').hide();
    }
  };

  issueView.badRequest = function(){
    $('.issue-list').hide();
    $('.failure').show();
    $('h4').not('.failure').hide();
  };

  issueView.compileData = function(template, data){
    let rendered;
    data.forEach((element) => {
      rendered = issueView.render(template, element);
    });
    return rendered;
  };



})(window);
