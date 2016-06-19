app.service('WalletsService', ['$cordovaSQLite', function($cordovaSQLite){
    console.log('WalletsService...');

    var wallets = [];

        $cordovaSQLite.execute(db, "SELECT * FROM wallet")
      .then(function(res) {
        for(var i = 0; i < res.rows.length; i++) {
          wallets.push(res.rows.item(i));
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
}]);