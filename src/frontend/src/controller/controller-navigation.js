'use strict';
angular
.module( 'app.controller.navigation', [
                                      'ngMaterial',
                                      'ngMessages',
                                      'ngRoute'
                                    ] )

// constants
.constant('MODULE_VERSION', '0.0.1')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../templates/home.html',
        controller: 'HomeController'
      })
      .when('/timeline', {
        templateUrl: '../templates/home.html',
        controller: 'HomeController'
      })
      .otherwise({ redirectTo: '/' });
  }])



// // // // // // // // // // // // // // // // // // // // // // // // //
.controller('MenuController', function ($scope, $timeout, $mdSidenav, $log, $location, $rootScope) {


   $rootScope.mainPages = [
     {
       icon : 'schedule',
       text: 'Demo',
       path: '#/home'
     },   
   ];


    $rootScope.currentPage = $scope.mainPages[0];


    $scope.navigateTo =   function navigateTo(page) {

       $scope.currentPage = page;
       $log.debug("Page: " + page.path + " selected");

      // close sidenav after interaction
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

  $scope.toggleLeft = buildDelayedToggler('left');

  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
})

// SideNav Controller
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });

  };
});
