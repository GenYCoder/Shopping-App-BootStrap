angular.module("cartController", [])
	.controller("cartCtrl", ["$scope", "Cart", function($scope, Cart){

  var filter_gratuity = null;
  $scope.products = Cart.get(); //get the items store in session storage
  //initial setup of cart summary
  $scope.tax = 0.08;
  $scope.subTotal = Cart.getSubTotal();
  $scope.subTotalTax = $scope.subTotal + ($scope.subTotal * $scope.tax);
  $scope.gratuity = "20.00";
  $scope.finalTotal = $scope.subTotalTax + $scope.gratuity;
  //checks if type is float with fixed decimal of two
  $scope.$watch("gratuity", function(newValue, oldValue){
    filter_gratuity = parseFloat(parseFloat(newValue).toFixed(2));

    if( !isNaN( filter_gratuity) ){
      $scope.finalTotal = $scope.subTotalTax + filter_gratuity;
    }else{
      $scope.finalTotal = $scope.subTotalTax + 0;
    }
    
  })
  //summarizing the cart basket
  $scope.summarizeCart = function(){
    $scope.subTotal = Cart.getSubTotal();
    $scope.subTotalTax = $scope.subTotal + ($scope.subTotal * $scope.tax);
    
    //fixes a bug where if user enter letters then delete item it will not update the final total
    //will fix on watcher to make it automatically replace letters to empty string
    if(isNaN(parseInt($scope.gratuity))){
      $scope.finalTotal = $scope.subTotalTax;
    } else{
      $scope.finalTotal = $scope.subTotalTax + parseInt($scope.gratuity);
    }
  }
  //removing an item off a cart
  $scope.removeItem = function(ID){
    Cart.remove(ID);
    $scope.summarizeCart();
  }
  //updating the quantity of items
  $scope.updateQty = function(qty){
    if(!angular.isUndefined(qty)){
        $scope.summarizeCart();
    }
  }
}])