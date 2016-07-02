app.service('WalletsService', function($cordovaSQLite, CurrenciesService){
    console.log('WalletsService...');

    var wallets = [];

    db.rel.find('wallet').then(function(data){
        for (var i = 0; i < data['wallets'].length; i ++) {
            wallets.push(data['wallets'][i]);
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