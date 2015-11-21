var app = angular.module('ExitticketsApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/index/indexView.html',
      controller: 'IndexCtrl'
    })
    .when('/main', {
      templateUrl: 'app/main/mainView.html',
      controller: 'MainCtrl'
    })
    .when('/main/:convoId', {
      templateUrl: 'app/main/convoView.html',
      controller: 'ConvoCtrl'
    })
    .when('/create', {
      templateUrl: 'app/create/createView.html',
      controller: 'CreateCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.service('Conversations', [function() {
  this.convos = [{
    "question": "test question",
    "creator": "Jordan Rhea",
    "creatorEmail": "rheajt@gmail.com",
    "responses": [{
      "user": "testuser",
      "msg": "This is the message."
    }]
  }];
}]);

app.directive('textBubble', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/textBubbleView.html'
  }
}])

app.controller('IndexCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.login = function() {
    $location.path('/main');
  }
}])

app.controller('MainCtrl', ['$scope', 'Conversations', function($scope, Conversations) {
  $scope.convos = Conversations.convos;

}]);

app.controller('ConvoCtrl', ['$scope', 'Conversations', '$routeParams', function($scope, Conversations, $routeParams) {
  $scope.convos = Conversations.convos[$routeParams.convoId];

  $scope.newMessage = function(message) {
    $scope.convos.responses.push(message);
    $scope.message = '';
  }
}])

app.controller('CreateCtrl', ['$scope', '$location','Conversations', function($scope, $location, Conversations) {

  $scope.newConversation = function(data) {
    Conversations.convos.push({"question": data.question, "responses": []});
    $location.path('/main');
  }
}])