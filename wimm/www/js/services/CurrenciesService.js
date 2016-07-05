app.service('CurrenciesService', function($cordovaSQLite){
    console.log('CurrenciesService...');

    var currencies = [];
            
    db.rel.find('currency').then(function(data){
        for (var i = 0; i < data['currencies'].length; i ++) {
            currencies.push(data['currencies'][i]);
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
});