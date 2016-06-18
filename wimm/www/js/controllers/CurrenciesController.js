app.controller('CurrenciesController', function($scope, CurrenciesService) {
    console.log('CurrenciesController...');

    $scope.currencies = CurrenciesService.getCurrencies();
})
.controller('CurrencyController', function($scope, $stateParams, CurrenciesService) {
    console.log('CurrencyController...');

    $scope.currency = CurrenciesService.getCurrencyById($stateParams.currencyId);
})