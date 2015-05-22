angular.module("shopController", [])
	.controller("shopCtrl",["$scope", "$state", "Product", "Cart", function($scope, $state, Product, Cart){

		var chunkDataSize = 3; //will show rows by three
		$scope.chunkData = []

		//getting the products and checks the model if there are any updates
		Product.add().then(function(response){
			$scope.init();
            
		}, function(response){
	        alert(response);
		})

		//setting up the grid row
		$scope.init = function(){
			$scope.chunkData = Product.getChunk(chunkDataSize);
		}

		$scope.showProduct = function(ID){

			$state.go("Product", {"ID":ID});
            
		}

	}]);