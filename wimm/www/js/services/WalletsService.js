app.service('WalletsService', function(){
    console.log('WalletsService...');

    var wallets = [
        { title: '[USD] Wallet', id: 1 },
        { title: '[USD] Visa', id: 2 },
        { title: '[USD] Master Card', id: 3 },
    ];

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
    }
})