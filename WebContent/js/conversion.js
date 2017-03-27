// calculate the currency value
function calculateMoneyByM1() {
	var price = document.getElementById("price");
	var equiPrice = document.getElementById("equi-price");
	var regex =/^\d+(\.\d{1,2})?$/;
	if (price.value.match(regex) && price.value.length < 10) {
		var from = document.getElementById("fromCurrency");
		var to = document.getElementById("toCurrency");
		var xmlhttp = new XMLHttpRequest();
		var url = "https://api.fixer.io/latest?symbols=" + from.value + ","
				+ to.value;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				myObj = JSON.parse(this.responseText);
				if (to.value == from.value
						|| (to.value == "EUR" && from.value == "EUR")) {
					var fromValue = 1;
					var toValue = 1;
				} else if (from.value == "EUR") {
					var fromValue = 1;
					var toValue = myObj.rates[to.value];
				} else if (to.value == "EUR") {
					var fromValue = myObj.rates[from.value];
					var toValue = 1;
				} else {
					var fromValue = myObj.rates[from.value];
					var toValue = myObj.rates[to.value];
				}
				var val = price.value * (toValue / fromValue);
				equiPrice.value = val.toFixed(2);
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
		document.getElementById("currencyConvertRate").innerHTML = "";
	} else {
		alert("Please give a valid input");
		price.value = "";
		equiPrice.value = "";
	}
}

// get currency value
function updateCurrencyConvertRate() {
	var from = document.getElementById("fromCurrency");
	var to = document.getElementById("toCurrency");
	var xmlhttp = new XMLHttpRequest();
	var url = "http://api.fixer.io/latest?base=" + from.value;
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myObj = JSON.parse(this.responseText);
			if (to.value == from.value
					|| (to.value === "EUR" && from.value === "EUR")) {
				var toValue = 1;
			} else {
				var fromValue = myObj.rates[from.value];
				var toValue = myObj.rates[to.value];
			}
			document.getElementById("currencyConvertRate").innerHTML = "1"
					+ from.value
					+ "="
					+ toValue.toFixed(2)
					+ to.value
					+ "<br />"
					+ "* Information provided in this page is for user purpose only. Rates are subject to change.";
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}
