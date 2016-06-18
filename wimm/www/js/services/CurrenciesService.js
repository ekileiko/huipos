app.service('CurrenciesService', function(){
    console.log('CurrenciesService...');

    var currencies = [
        { id: 840, code: 'USD', title: 'US Dollar' },
        { id: 978, code: 'EUR', title: 'Euro', },
        { id: 974, code: 'BYR', title: 'Belarussian Ruble', },
    ];

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
    }
})