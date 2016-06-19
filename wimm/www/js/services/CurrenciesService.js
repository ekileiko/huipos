app.service('CurrenciesService', ['$cordovaSQLite', function($cordovaSQLite){
    console.log('CurrenciesService...');

    var currencies = [];

    $cordovaSQLite.execute(db, "SELECT * FROM currency")
      .then(function(res) {
        for(var i = 0; i < res.rows.length; i++) {
          currencies.push(res.rows.item(i));
        }
      });

    return {
        getCurrencies: function(){
            return currencies;
        },
        getCurrencyById: function(id) {
            for(i = 0; i < currencies.length; i++) {
                if(currencies[i].id == id){
                    return currencies[i];
                }
            }
        },
        getCurrencyByCode: function(code) {
            for(i = 0; i < currencies.length; i++) {
                if(currencies[i].code == code){
                    return currencies[i];
                }
            }
        }
    };
}]);