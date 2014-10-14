;(function(window, $, undefined){

  function chessBoardInstance(game){
    return new ChessBoard('chess-board', {
        draggable: true,
        position: 'start',
        onDragStart: function onDragStart(source, piece, position, orientation) {
          if (game.game_over() === true ||
              (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
               (game.turn() === 'w' && orientation === 'black') ||
               (game.turn() === 'b' && orientation === 'white')) {
            return false;
          }
        },
        onDrop: function onDrop(source, target) {
          // see if the move is legal
          var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
          });

          // illegal move
          if (move === null) return 'snapback';
          ChessControl.updateStatus();
        },
        onSnapEnd: function(){
          ChessControl.board.position(game.fen());
        },
        pieceTheme: '/assets/chessboardjs/chesspieces/wikipedia/{piece}.png'
    });
  }

  var ChessControl = new function() {
    this.myMoves = [];
    this.gameInfo = {};
    this.game = new Chess();
    this.init = function(key, orientation){
      var self = this;
      this.orientation = orientation;
      this.movesRef = new Firebase("https://chessforkicks.firebaseio.com/games/" + key + "/moves");
      this.board = chessBoardInstance(self.game);
      if(this.orientation === 'b') {
        this.board.flip();
      }
      this.movesRef.limit(1).on('child_added', function(snapshot){
        self.setGameInfo(snapshot.val());
        if(!_.contains(self.myMoves, self.fen)) {
          self.board.position(self.fen);
          self.game.load(self.fen);
        }
      });
    };

    this.updateStatus = function(){
      var self = this;
      var status = '';
      var moveColor = 'White';
      if (this.game.turn() === 'b')  moveColor = 'Black';

      // checkmate?
      if (this.game.in_checkmate() === true) status = 'Game over, ' + moveColor + ' is in checkmate.';
      // draw?
      else if (self.game.in_draw() === true) status = 'Game over, drawn position';
      // game still on
      else {
        status = moveColor + ' to move';
        // check?
        if (this.game.in_check() === true) {
          status += ', ' + moveColor + ' is in check';
        }
      }
      var fen = this.game.fen();
      this.myMoves.push(fen);
      this.movesRef.push(fen);
    };

    this.setGameInfo = function(fen){
      this.fen = fen;
      var split = this.fen.split(" ");
      this.turn = {w: "white", b: "black"}[split[1]];
    };


    $(function(){

      var $cb = $('#chess-board');
      ChessControl.init($cb.data('key'), $cb.data('orientation'));

    });

  }();

})( this, jQuery );