(function(module){

  let issueView = {};

  issueView.getInputURL = function(callback){
    let url = $('input').val();
    callback(url, null);
  };




  module.issueView = issueView;
})(window);
