angular.module('App.controllers')
  .controller("GamesShowController", function($scope, $firebase, $routeParams){

    var gameRef = new Firebase("https://chessforkicks.firebaseio.com/games/" + $routeParams.gameId),
        movesRef = new Firebase("https://chessforkicks.firebaseio.com/games/" + $routeParams.gameId + "/moves"),
        myMoves = [];

    $scope.gameInfo = {};

    function setGameInfo(fen){
      var split = fen.split(" ");
      $scope.gameInfo.fen = fen;
      $scope.$apply(function(){
        $scope.gameInfo.turn = {w: "white", b: "black"}[split[1]];
      });
    }

    $scope.onMove = function(a, b) {
      myMoves.push(b);
      movesRef.push(b);
    };
    $scope.board = null;
    $scope.game = null;
    $scope.gameInfo = {};

    movesRef.limit(1).on('child_added', function(snapshot){
      setGameInfo(snapshot.val());
      if(!_.contains(myMoves, $scope.gameInfo.fen)) {
        $scope.board.position($scope.gameInfo.fen);
        $scope.game.load($scope.gameInfo.fen);
      }
    });

  });