app.service('WalletsService', function($cordovaSQLite, CurrenciesService){
    console.log('WalletsService...');

    var wallets = [];

    $cordovaSQLite
        .execute(db, "SELECT * FROM wallet")
        .then(function(res) {
            for(var i = 0; i < res.rows.length; i++) {
                var wallet = res.rows.item(i);
                wallet.currency = CurrenciesService.getCurrencyById(wallet.currencyId);
                wallets.push(wallet);
            }
        });

    return {
        getWallets: function(){
            return wallets;
        },
        getWallet: function(walletId) {
            for(i = 0; i < wallets.length; i++) {
                if(wallets[i].id == walletId){
                    return wallets[i];
                }
            }
        }
    };
});