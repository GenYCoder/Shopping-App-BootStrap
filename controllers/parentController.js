angular.module("parentController", [])
	.controller("parentCtrl", ["$scope", "$state", "$rootScope", "$window", function($scope, $state, $rootScope, $window){
		//this controller will control the state of the navigation when a user clicks on the links in the nav bar. I'm using scope inheritance
		var currentState = "";
    $scope.isCollapsed = true;

    

    //will highlight the tab
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
      currentState = toState.name;
    });

    //animating the toggleclass
    $scope.getToggleClass = function(){
      return $scope.isCollapsed ? "collapsed" : "";
    }


		//toggles the collapsing menu only on mobile
		$scope.toggleCollapse = function(){
			$scope.isCollapsed = !$scope.isCollapsed;
      
		}

    //user selection of category
    $scope.selectCategory = function(category){
      currentState = category;
      
      if($window.innerWidth <= 768){
        $scope.toggleCollapse();
      }
    }

    //find the active state
    $scope.getStateClass = function(current){
      return currentState == current ? "activeState" : "";
    }

    
  }]
 )