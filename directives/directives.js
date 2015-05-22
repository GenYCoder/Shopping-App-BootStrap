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
	                if(digits > attrs.max){
	                  digits = attrs.max;
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
	})
	.directive('nksOnlyNumber', function () {
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {   
                     scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                          var spiltArray = String(newValue).split("");

                          if(attrs.allowNegative == "false") {
                            if(spiltArray[0] == '-') {
                              newValue = newValue.replace("-", "");
                              ngModel.$setViewValue(newValue);
                              ngModel.$render();
                            }
                          }

                          if(attrs.allowDecimal == "false") {
                              newValue = parseInt(newValue);
                              ngModel.$setViewValue(newValue);
                              ngModel.$render();
                          }

                          if(attrs.allowDecimal != "false") {
                            if(attrs.decimalUpto) {
                               var n = String(newValue).split(".");
                               if(n[1]) {
                                  var n2 = n[1].slice(0, attrs.decimalUpto);
                                  newValue = [n[0], n2].join(".");
                                  ngModel.$setViewValue(newValue);
                                  ngModel.$render();
                               }
                            }
                          }


                          if (spiltArray.length === 0) return;
                          if (spiltArray.length === 1 && (spiltArray[0] == '-' || spiltArray[0] === '.' )) return;
                          if (spiltArray.length === 2 && newValue === '-.') return;

                        /*Check it is number or not.*/
                        if (isNaN(newValue)) {
                          ngModel.$setViewValue(oldValue);
                          ngModel.$render();
                        }
                    });
                }
            };
        });