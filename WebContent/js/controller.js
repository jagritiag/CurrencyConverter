var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function($scope,$http) {
	
	$scope.currencyList = ["CAD","EUR","USD"];
	$scope.fromCurrency = $scope.currencyList[0];
	$scope.currency_List = ["USD","CAD","EUR"];
	$scope.toCurrency = $scope.currency_List[0];
	
	$scope.calculateMoney = function() {
		var myObj={};
		var price = $scope.price;
		var equiPrice = $scope.equiprice;
		$http.get("https://api.fixer.io/latest?base=" + $scope.fromCurrency).then(function(res){
			myObj = res.data.rates;
			var fromValue = 1;
			var toValue = ($scope.fromCurrency == $scope.toCurrency)?1: myObj[$scope.toCurrency];
			var val = $scope.price * (toValue / fromValue);
			$scope.equiprice = (isNaN(val)?"":val.toFixed(2));
		});
};

	$scope.RestrictSignKey = function () {
	if (event.keyCode == 45 || event.keyCode == 43) {
		event.returnValue = false;
		return false;
	}
};
	
	$scope.updateCurrencyConvertRate= function(){
		
		$scope.isVisible = false;
		$scope.isNotVisible = true;
		var myObj={};
		$http.get("https://api.fixer.io/latest?base=" + $scope.fromCurrency).then(function(res){
			myObj = res.data.rates;
			var fromValue = 1;
			var toValue = ($scope.fromCurrency == $scope.toCurrency)?1: myObj[$scope.toCurrency];
			var innerValue= "1"
					+ $scope.fromCurrency
					+ "="
					+ toValue.toFixed(2)
					+ $scope.toCurrency
					+ "<br />"
					+ "* Information provided in this page is for user purpose only. Rates are subject to change.";

			$scope.currencyConvertRate = ($scope.currencyConvertRate== innerValue?  "" : innerValue);
		});
};
});
 
