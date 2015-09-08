//basic
require('./assets/js/ie10-viewport-bug-workaround');

//angular components
angular = require('angular');

require('angular-ui-router');
require('angular-ui-bootstrap');

//controllers
require('./controllers/parentController');
require('./controllers/cartController');
require('./controllers/productController');
require('./controllers/shopController');

//directives
require('./directives/directives');

//filters
require('./filters/filters');

//services
require('./services/customService');
require('./services/ngStorage');


angular.module("shopApp",["ui.bootstrap", "ui.router", "ngStorage", "customService", "parentController", "shopController", "productController", "cartController", "myDirectives", "myFilters"])
	.config(function($stateProvider, $urlRouterProvider){
		//this is setting up the configuration for the application upon launch

		//any unmatch url will go to the trends tab
		$urlRouterProvider.otherwise("/Shop");

		//routing the tabs to the correct view
		$stateProvider
			.state("Shop",{
				url:"/Shop",
				templateUrl:"views/shop.html",
				controller: "shopCtrl"
      })
      .state("Product",{
        url:"/Product/:ID",
        templateUrl:"views/product.html",
        controller: "productCtrl"
      })
			.state("Cart",{
				url:"/Cart",
				templateUrl:"views/cart.html",
				controller: "cartCtrl"
      })

	})