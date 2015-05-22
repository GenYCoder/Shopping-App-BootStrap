angular.module("myFilters",[])
  .filter('range', function() {
    //this is use to do the item quantity based on what range you want to give it
    //will be use for ng-options
    return function(input, total) {
      total = parseInt(total);
      for (var i=1; i<total; i++)
        input.push({"value":i});
      return input;
    };
  })