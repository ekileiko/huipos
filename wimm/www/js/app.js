// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    console.log('starting app');
    
    var dbName = 'wimmDb';
    
    // TODO: temporary destroying...
    new PouchDB(dbName).destroy().then(function () {
      return new PouchDB(dbName);
    }).then(function (database) {
      db = database;
      db.setSchema([
        { singular: 'currency', plural: 'currencies', relations: { wallets: {hasMany: 'wallet'}} },
        { singular: 'wallet', plural: 'wallets', relations: { currency: {belongsTo: 'currency'}} },
        { singular: 'category', plural: 'categories', relations: { parent: {belongsTo: 'category'}} },
        { singular: 'operation', plural: 'operations', relations: { category: {belongsTo: 'category'}, wallet: {belongsTo: 'wallet'}, destinationWallet: {belongsTo: 'wallet'}} },
        { singular: 'config', plural: 'configs' }
      ]);

      db.rel.find('config', 1).then(function (data) {
        if (data['configs'] && data['configs'][0] && data['configs'][0].value) {
          console.log('db already initialized');
          // already initialized
        } else {
        // need initialization
          console.log('db is needed for initialization');
          db.rel.save('config', {
            id: 1, key: 'firstAppInit', value: true, 
          }).then(function(){
            return db.rel.save('currency', { id: 840, code: 'USD', title: 'US Dollar'});
          }).then(function(){
            return db.rel.save('currency', { id: 978, code: 'EUR', title: 'Euro' });
          }).then(function(){
            return db.rel.save('currency', { id: 974, code: 'BYR', title: 'Belorussian Ruble' });
          })
          // type: 1 - cash, 2 - credit card
          .then(function(){
            return db.rel.save('wallet', { id: 1, currency: 840, title: '[USD] Visa', type: 2, enabled: 1, startBalance: 17 });
          }).then(function(){
            return db.rel.save('wallet', { id: 2, currency: 978, title: '[EUR] Master Card', type: 2, enabled: 0, startBalance: 0 });
          }).then(function(){
            return db.rel.save('wallet', { id: 3, currency: 974, title: '[BYR] Wallet', type: 1, enabled: 1, startBalance: 250000 });
          })
          // type: 0 - expense, 1 - income  
          .then(function(){
            return db.rel.save('category', { id: 1, parent: 0, name: 'Salary', type: 1, isDefault: 1 });  
          }).then(function(){
            return db.rel.save('category', { id: 2, parent: 0, name: 'Products', type: 0, isDefault: 1 });  
          }).then(function(){
            return db.rel.save('category', { id: 3, parent: 2, name: 'Fruits', type: 0, isDefault: 0 }); 
          })
          // type: 0 - expense, 1 - income, 2 - transfer
          // rateType: 0 - currencySum = sumPerUnit * rate, 1 - currencySum = sumPerUnit / rate
          // wallet: destination wallet for income opertion, source wallet for expense and transfer operations
          // destinationWallet: destination wallet for transfer operation
          // category: source category for income opertion, destination category for expense operation
          .then(function(){
            return db.rel.save('operation', { id: 1, type: 1, date: Date.now(), quantity: 1, sumPerUnit: 1000, comment: 'First Salary!', wallet: 1, category: 1 });
          }).then(function(){
            return db.rel.save('operation', { id: 2, type: 0, date: Date.now(), quantity: 1, sumPerUnit: 100, comment: 'First expense!', wallet: 1, category: 3 });
          }).then(function(){
            return db.rel.save('operation', { id: 3, type: 2, date: Date.now(), sumPerUnit: 275, rate: 1.1, rateType: 1, comment: 'First transfer to deposit!', wallet: 1, destinationWallet: 2 });
          })
        }
      });
    });    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.blank', {
    url: '/blank',
    views: {
      'menuContent': {
        templateUrl: 'templates/blank.html',
        controller: 'BlankController'
      }
    }
  })
  .state('app.wallets', {
    url: '/wallets',
    views: {
      'menuContent': {
        templateUrl: 'templates/wallets.html',
        controller: 'WalletsController'
      }
    }
  })
  .state('app.wallet', {
    url: '/wallets/:walletId',
    views: {
      'menuContent': {
	      templateUrl: 'templates/wallet.html',
        controller: 'WalletController'
      }
    }
  })
  .state('app.currencies', {
    url: '/currencies',
    views: {
      'menuContent': {
        templateUrl: 'templates/currencies.html',
        controller: 'CurrenciesController'
      }
    }
  })
  .state('app.currency', {
    url: '/currencies/:currencyId',
    views: {
      'menuContent': {
	      templateUrl: 'templates/currency.html',
        controller: 'CurrencyController'
      }
    }
  })
  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
	      templateUrl: 'templates/categories.html',
        controller: 'CategoriesController'
      }
    }
  })
  .state('app.operations', {
    url: '/operations',
    views: {
      'menuContent': {
        templateUrl: 'templates/operations.html',
        controller: 'OperationsController'
      }
    }
  })
  .state('app.operation', {
    url: '/operations/:operationId',
    views: {
      'menuContent': {
	      templateUrl: 'templates/operation.html',
        controller: 'OperationController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/blank');
});
