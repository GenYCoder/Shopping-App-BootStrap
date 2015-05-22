angular.module("productController",[])
	.controller("productCtrl", ["$state", "$stateParams", "$scope", "Product", "Cart", function($state, $stateParams, $scope, Product, Cart){
          
          var checkProduct = Product.search($stateParams.ID); //should be run once for optimizing
          $scope.itemQuantity = 1; //this is the default for item quantity 
          $scope.product = []

          //Checks if the product exist and if it doesn't go back to the Shop state otherwise show the product. I was thinking what if the product doesn't exist anymore
          if( angular.isUndefined( checkProduct ) ){
            
            $state.go("Shop");

          }else{
            
            $scope.product = checkProduct;
          
          }

          //adding the item into the cart but needs to check if it reach max
          $scope.addItem = function(){
           
            var maxItem = 99; //maximum item in the cart
            var onCartItem = Cart.searchItem( $stateParams.ID );
            
            //If item exceeds over 99 then it will not update the qty, but it will add accordingly
            if( onCartItem !== false ){
              if( ($scope.itemQuantity + onCartItem.Qty) <= maxItem ){
                
                Cart.add({"ID":$scope.product.ID, "Product_Name":$scope.product.Product_Name,"Price":$scope.product.Price, "Qty":$scope.itemQuantity});
              }else{
                Cart.update($scope.product.ID, maxItem);
              }

            }else{
                //if item does not exist in cartbasket  
                Cart.add({"ID":$scope.product.ID, "Product_Name":$scope.product.Product_Name,"Price":$scope.product.Price, "Qty":$scope.itemQuantity});   

            }


            $state.go("Shop"); //go back to Shop state after product is added
          }
        }])