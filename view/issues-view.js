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


  module.issueView = issueView;
})(window);
