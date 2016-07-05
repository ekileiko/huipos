app.controller('OperationsController', function($scope, OperationsService, ionicMaterialInk, ionicMaterialMotion, $timeout) {
    console.log('OperationsController...');

    $scope.operations = OperationsService.getOperations();
})
.controller('OperationController', function($scope, $stateParams, OperationsService) {
    console.log('OperationController...');

    $scope.operation = OperationsService.getOperation($stateParams.operationId);
})