// 'use strict';

angular.module('App.directives')
 .directive('chChessBoard', function() {

  var game, board, onMoveCallback;

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  // do not pick up pieces if the board is oriented the other way
  function onDragStart(source, piece, position, orientation) {
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
         (game.turn() === 'w' && orientation === 'black') ||
         (game.turn() === 'b' && orientation === 'white')) {
      return false;
    }
  }

  function onDrop(source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    updateStatus();
  }

  function updateStatus() {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b')  moveColor = 'Black';

    // checkmate?
    if (game.in_checkmate() === true) status = 'Game over, ' + moveColor + ' is in checkmate.';
    // draw?
    else if (game.in_draw() === true) status = 'Game over, drawn position';
    // game still on
    else {
      status = moveColor + ' to move';
      // check?
      if (game.in_check() === true) {
        status += ', ' + moveColor + ' is in check';
      }
    }
    onMoveCallback({status: status, fen: game.fen()});
  }

  function onSnapEnd() {
    board.position(game.fen());
  }

  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<div class="chess-board"></div>',
    scope: {
      board: "=",
      game: "=",
      onMoveCallback: "&onMoveCallback"
    },
    link: function($scope, element, attrs){
      console.log('link');
      var id = Math.random().toString(36).substring(5);
      element.prop('id', id);
      onMoveCallback = $scope.onMoveCallback;
      $scope.game = game = new Chess();
      $scope.board = board = new ChessBoard(id, {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: 'assets/chessboardjs/chesspieces/wikipedia/{piece}.png'
      });
    }
  };
 })
 ;