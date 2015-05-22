angular.module("myDirectives", [])
	.directive('onlyDigits', function () {
	    //a directive to show only digits
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function (scope, element, attrs, ngModel) {
	            if (!ngModel) return;
	            ngModel.$parsers.unshift(function (inputValue) {
	                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
	                
	                //limits how many items should be brought
	                if(digits > 99){
	                  digits = 99;
	                }
	                else if(digits == 0){
	                  digits = 1;
	                }

	                ngModel.$viewValue = digits;
	                ngModel.$render();
	                return digits;
	            });
	        }
	    };
	});