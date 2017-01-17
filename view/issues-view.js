(function(module){

/*global issues issueView helpers Handlebars:true*/
  let issueView = {};

  issueView.getInputURL = function(callback){
    let url = $('input').val();
    callback(url, null);

  };

  issueView.render = function(templateid, data){
    let template = Handlebars.compile($(templateid).text());
    return template(data);
  };

  issueView.appendData = function(section, compiledObj){
    $(section).append(compiledObj);
  };

  issueView.noIssuesAlert = function(){
    if(!issues.data.length){
      $('.issue-list').hide();
      $('.none').show();
      $('h4').not('.none').hide();
    }
  };

  issueView.badRequest = function(boolean){
    if(!boolean){
      $('.issue-list').hide();
      $('.failure').show();
      $('h4').not('.failure').hide();
    }
  };


  module.issueView = issueView;
})(window);
