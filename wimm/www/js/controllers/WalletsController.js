app.controller('WalletsController', function($scope, WalletsService) {
    console.log('WalletsController...');

    $scope.wallets = WalletsService.getWallets();
})
.controller('WalletController', function($scope, $stateParams, WalletsService) {
    console.log('WalletController...');

    $scope.wallet = WalletsService.getWallet($stateParams.walletId);
})