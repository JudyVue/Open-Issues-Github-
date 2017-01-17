(function(module){

/*global issues issueView helpers Handlebars:true*/
  let issueView = {};

  issueView.getInputURL = function(callback){
    let url = $('input').val();
    callback(url, null);
  };

  issueView.render = function(templateid, data){
    console.log('hit render?');
    let template = Handlebars.compile($(templateid).text());
    return template(data);
  };

  issueView.appendData = function(section, compiledObj){
    $(section).append(compiledObj);

    // issues.data.forEach((element) => {
    //   let renderedIssue = issueView.render('.issue-template', element);
    // });
  };

  issueView.alertIfNoIssues = function(){
    if(!issues.data.length){
      alert('This repo has no issues because it had loving parents.');
    }
  };


  module.issueView = issueView;
})(window);
