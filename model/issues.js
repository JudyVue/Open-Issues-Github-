(function(module){
  let issues = {};

  issues.data = [];

  issues.fetchData = function(){
    $.when(
      $.get('/github/issues')
      .done((data) => {
        console.log(data);
      })
    );
  };

  issues.fetchData();
  module.issues = issues;
})(window);
