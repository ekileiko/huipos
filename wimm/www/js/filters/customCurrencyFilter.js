appFilters.filter('customCurrency', function(){
	return function(input, symbol, fractionSize){
    if(isNaN(input)){
      return input;
    } else {
      input = input.toFixed(fractionSize);
      var symbol = symbol || '$';

      return input + ' ' + symbol;
    }
  }
});