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

  issueView.alertIfNoIssues = function(){
    if(!issues.data.length){
      alert('This repo has no issues because it had loving parents.');
    }
  };


  module.issueView = issueView;
})(window);
