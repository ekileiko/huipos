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


    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "wimm.db", iosDatabaseLocation: 'default' }); //device
    } else {
      db = window.openDatabase("wimm.db", '1', 'my', 1024 * 1024 * 100); // browser
    }

    // TODO: Temporary
    $cordovaSQLite.execute(db, "DROP TABLE currencies");
    $cordovaSQLite.execute(db, "DROP TABLE wallets");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS currencies (id integer primary key, code text, title text)");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (840, 'USD', 'US Dollar')");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (978, 'EUR', 'Euro')");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (974, 'BYR', 'Belorussian Ruble')");

    // type: 1 - cash, 2 - credit card
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS wallets (id integer primary key, currencyId integer, title text, type integer, enabled integer)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled) values (1, 974, '[BYR] Wallet', 1, 1)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled) values (2, 840, '[USD] Visa', 2, 1)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled) values (3, 978, '[EUR] Master Card', 2, 0)");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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
  .state('app.blank', {
    url: '/blank',
    views: {
      'menuContent': {
        templateUrl: 'templates/blank.html',
        controller: 'BlankController'
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/blank');
});
