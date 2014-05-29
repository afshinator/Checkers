
/*
 * The Checkers board - 
 *
 */


var checkers = (function (my) {

	my.board = (function() {

		var emptySquare = ' ';

		var squares = {
			'1' : { ul : null, ur: null, ll: '5', lr: '6' },
			'2' : { ul : null, ur: null, ll: '6', lr: '7' },
			'3' : { ul : null, ur: null, ll: '7', lr: '8' },
			'4' : { ul : null, ur: null, ll: '8', lr: null },

			'5' : { ul : null, ur: '1', ll: null, lr: '9' },
			'6' : { ul : '1', ur: '2', ll: '9', lr: '10' },
			'7' : { ul : '2', ur: '3', ll: '10', lr: '11' },
			'8' : { ul : '3', ur: '4', ll: '11', lr: '12' },

			'9' : { ul : '5', ur: '6', ll: '13', lr: '14' },
			'10' : { ul : '6', ur: '7', ll: '14', lr: '15' },
			'11' : { ul : '7', ur: '8', ll: '15', lr: '16' },
			'12' : { ul : '8', ur: null, ll: '16', lr: null },

			'13' : { ul : null, ur: '9', ll: '5', lr: '17' },
			'14' : { ul : '9', ur: '10', ll: '17', lr: '18' },
			'15' : { ul : '10', ur: '11', ll: '18', lr: '19' },
			'16' : { ul : '11', ur: '12', ll: '19', lr: '20' },

			'17' : { ul : '13', ur: '14', ll: '21', lr: '22' },
			'18' : { ul : '14', ur: '15', ll: '22', lr: '23' },
			'19' : { ul : '15', ur: '16', ll: '23', lr: '24' },
			'20' : { ul : '16', ur: null, ll: '24', lr: null },

			'21' : { ul : null, ur: '17', ll: null, lr: '25' },
			'22' : { ul : '17', ur: '18', ll: '25', lr: '26' },
			'23' : { ul : '18', ur: '19', ll: '26', lr: '27' },
			'24' : { ul : '19', ur: '20', ll: '27', lr: '28' },

			'25' : { ul : '21', ur: '22', ll: '29', lr: '30' },
			'26' : { ul : '22', ur: '23', ll: '30', lr: '31' },
			'27' : { ul : '23', ur: '24', ll: '31', lr: '32' },
			'28' : { ul : '24', ur: null, ll: '32', lr: null },

			'29' : { ul : null, ur: '25', ll: null, lr: null },
			'30' : { ul : '25', ur: '26', ll: null, lr: null },
			'31' : { ul : '26', ur: '27', ll: null, lr: null },
			'32' : { ul : '27', ur: '28', ll: null, lr: null }
		};


		var reset = function() {	// Mark 32 positions as either red, black, or empty.
			for ( var i = 1; i <= 32; i += 1 ) {
				if ( i <= 12 ) {
					squares[i].occupier = 'a';			// Top 3 rows (12 spots) are player A pieces
				} else if ( i <= 20 ) {
					squares[i].occupier = emptySquare;	// Mid 2 rows are empty
				} else {
					squares[i].occupier = "b";			// Bottom 3 rows are player B pieces
				}
			}
		};


		var consoleLog = function( justIndex ) {
			var result = "";

			for ( var i = 0; i < 32; i += 1 ) {
				if ( i % 4 === 0 ) { result += "\n"; }		// End of line
                if ( i % 8 === 0 ) { result += "...";}		// Start of every other line
              
				if ( justIndex ) {							// To show just the indexes
					if ( i + 1 < 10 ) {
						result +=  ( " " + (i+1) + " " );
					} else {
						result +=  ( " " + (i+1)  );
					}
				} else {		// Show whats in this position
					result +=  ( " " + squares[i].occupier + " " );
				}
				if ( i % 8 !== 3  ) result += "...";	// Add empty spot unless we're on odd lines
			}

			console.log(result);
		};


		var getValidMoves = function( whichSquare, who ) {
			var isCrowned = ( who === 'A' || who === 'B') ? true : false;
			var property;
			var excludeX, excludeY;
			var validMoves = [];

			if ( ! isCrowned ) {
				if ( who === 'a' ) {
					excludeX = 'ur';  excludeY = 'ul';
				} else {
					excludeX = 'lr';  excludeY = 'll';
				}
			}

			for ( property in squares[whichSquare] ) {
				if ( property !== 'occupier' && squares[whichSquare][property] !== null ) {
					if ( isCrowned ||
						( !isCrowned && property !== excludeX && property !== excludeY ) ) {
						validMoves.push(squares[whichSquare][property]);
					}
					
				}
			}

			return validMoves;
		};


		// Based on whose turn it is,  go through all the pieces for that player and see
		// if a jump over opponent is available.  Take it if it is and return true; else false.
		var checkForAndTakeJump = function( isPlayerATurn ) {  // return true if jump available??
			var who;
			var isCrowned;
			var validMoves = [];

			for ( i = 1; i <= 32; i += 1 ) {
				who = squares[i].occupier;
				if ( who !== emptySquare ) {
					validMoves = getValidMoves( i, who );
					// see if contents of valid moves are opponent
					// see if opponent containing moves have a free square to make a jump to
				}
			}
		};


		return {
			reset : reset,
			show : consoleLog
		};

	})();

	return my;

}(checkers || {}));



var checkers = (function (my) {

	my.game = (function() {
		var gameStarted = false;
		var playerATurn = parseInt( Math.random() * 10, 10 ) % 2;	// Randomly select who starts

		var getPlacementChoice = function() {
			return prompt( "Your next move ?", "1-32");
		};

		var start = function() {
			my.board.reset();

			gameStarted = true;
		};


		return {
			begun : gameStarted,
			playerATurn : playerATurn,
			start : start
		};

	})();

    return my;

}(checkers || {}));