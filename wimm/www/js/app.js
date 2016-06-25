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
    $cordovaSQLite.execute(db, "DROP TABLE operations");
    $cordovaSQLite.execute(db, "DROP TABLE categories");
    $cordovaSQLite.execute(db, "DROP TABLE wallets");
    $cordovaSQLite.execute(db, "DROP TABLE currencies");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS currencies (id integer primary key, code text, title text)");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (840, 'USD', 'US Dollar')");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (978, 'EUR', 'Euro')");
    $cordovaSQLite.execute(db, "INSERT INTO currencies (id, code, title) values (974, 'BYR', 'Belorussian Ruble')");

    // type: 1 - cash, 2 - credit card
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS wallets (id integer primary key, currencyId integer, title text, type integer, enabled integer, startBalance real)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled, startBalance) values (1, 974, '[BYR] Wallet', 1, 1, 250000)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled, startBalance) values (2, 840, '[USD] Visa', 2, 1, 17)");
    $cordovaSQLite.execute(db, "INSERT INTO wallets (id, currencyId, title, type, enabled, startBalance) values (3, 978, '[EUR] Master Card', 2, 0, 0)");
  
    // type: 0 - expense, 1 - income
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS categories (id integer primary key, parentId integer, name text, type integer, isDefault integer)");
    $cordovaSQLite.execute(db, "INSERT INTO categories (id, parentId, name, type, isDefault) values (1, 0, 'Salary', 1, 1)");
    $cordovaSQLite.execute(db, "INSERT INTO categories (id, parentId, name, type, isDefault) values (2, 0, 'Products', 0, 1)");
    $cordovaSQLite.execute(db, "INSERT INTO categories (id, parentId, name, type, isDefault) values (3, 2, 'Fruits', 0, 0)");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS operations ("
      + "id integer primary key"
      + ",type integer"                 // 0 - expense, 1 - income, 2 - transfer
      + ",date datetime"
      + ",quantity real"
      + ",sumPerUnit real"
      + ",rate real"
      + ",rateType integer"             // 0 - currencySum = sumPerUnit * rate, 1 - currencySum = sumPerUnit / rate
      + ",currencySum real"
      + ",comment text"
      + ",accountId integer"            // destination account for income opertion, source account for expense and transfer operations
      + ",destinationAccountId integer" // destination account for transfer operation
      + ",categoryId integer"           // source category for income opertion, destination category for expense operation
      + ")");
    $cordovaSQLite.execute(db, "INSERT INTO operations (id, type, date, quantity, sumPerUnit, comment, accountId, categoryId) "
      + "values (1, 1, '"+Date.now()+"', 1, 1000, 'First Salary', 1, 1)");
    $cordovaSQLite.execute(db, "INSERT INTO operations (id, type, date, quantity, sumPerUnit, comment, accountId, categoryId) "
      + "values (2, 0, '"+Date.now()+"', 1, 100, 'First expense', 1, 3)");
    $cordovaSQLite.execute(db, "INSERT INTO operations (id, type, date, sumPerUnit, rate, rateType, comment, accountId, destinationAccountId) "
      + "values (3, 2, '"+Date.now()+"', 275, 1.1, 1, 'First transfer to deposit!', 1, 2)");
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
