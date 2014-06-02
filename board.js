
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


		var seedBoard = function() {	// run after reset() to seed with test data
			squares[1].occupier = emptySquare;
			squares[2].occupier = 'a';
			squares[3].occupier = emptySquare;
			squares[4].occupier = emptySquare;
			squares[5].occupier = 'b';
			squares[6].occupier = emptySquare;
			squares[7].occupier = 'B';
			squares[8].occupier = emptySquare;
			squares[9].occupier = emptySquare;
			squares[12].occupier = emptySquare;
			squares[14].occupier = emptySquare;
			squares[18].occupier = emptySquare;
			squares[17].occupier = 'a';
			squares[21].occupier = emptySquare;
			squares[22].occupier = emptySquare;
			squares[23].occupier = 'a';
			squares[24].occupier = emptySquare;
			squares[25].occupier = 'b';
			squares[27].occupier = emptySquare;
			squares[28].occupier = emptySquare;
			squares[30].occupier = emptySquare;
			squares[31].occupier = emptySquare;
			squares[32].occupier = emptySquare;
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
					result +=  ( " " + squares[i+1].occupier + " " );
				}
				if ( i % 8 !== 3  ) result += "...";	// Add empty spot unless we're on odd lines
			}

			console.log(result);
		};



		// Return a list of all possible moves from square by the player occupying it; list is tagged by direction 
		// that the move is in.  
		// After you get the list form this function, filter out what you want.
		var getAllMoves = function( whichSquare ) {
			var player = squares[whichSquare].occupier;
			var isCrowned = ( player === 'A' || player === 'B') ? true : false;
			var property;
			var excludeX, excludeY;
			var moves = [];
			var tempObj;

			if ( ! isCrowned ) {
				if ( player === 'a' ) {
					excludeX = 'ur';  excludeY = 'ul';
				} else {
					excludeX = 'lr';  excludeY = 'll';
				}
			}

			for ( property in squares[whichSquare] ) {
				if ( property !== 'occupier' && squares[whichSquare][property] !== null ) {
					if ( isCrowned ||
						( !isCrowned && property !== excludeX && property !== excludeY ) ) {
						tempObj = {};
						tempObj[property] = squares[whichSquare][property];
						moves.push( tempObj );
					}
					
				}
			}

			return moves;
		};

		var whichSideIs = function( squareIndex ) {
			occupier = squares[squareIndex].occupier;
			if (  occupier === 'a' || occupier === 'A' ) { return 'a'; }
			else return 'b';
		};


		var isA = function( who ) {
			if ( who === 'a' || who === 'A' ) return true;
			return false;
		};

		var myOpponent = function ( me ) {
			return  isA(me) ? 'b' : 'a';
		};

		var isMyOpponent = function ( me, other ) {
			if ( other === emptySquare ) return false;
			return ( isA(me) && !isA(other) ) || ( !isA(me) && isA(other) ) ;
		};


		var processMoves = function( moveList, fn, fromWhichSquare ) {
			var processed = [];
			var result;

			for ( var j = 0; j < moveList.length; j += 1 ) {
				result = fn( moveList[j], fromWhichSquare );
				if ( result !== null ) processed.push( result );
			}

			return processed;
		};


		var getJumpMoves = function( fromWhichSquare ) {
			var fn = function(keyVal, squareIndex) {
					var sideInPlay = whichSideIs( squareIndex );
					var direction = Object.keys(keyVal)[0];				// direction keyVal square is from 'fromWhichSquare'
					var sqIndex = keyVal[direction];
					var tempObj;

					if ( isMyOpponent( squares[squareIndex].occupier, squares[sqIndex].occupier ) )  {
console.log('sqIndex ' + sqIndex + ' - direction' + direction);
						if ( squares[sqIndex][direction] !== null && squares[ squares[sqIndex][direction] ].occupier === emptySquare  ) {
							tempObj = {};
							tempObj[direction] = squares[sqIndex][direction];
							tempObj.from = squareIndex;							// extra attribute added here; where jumping from
							tempObj.over = sqIndex;								// extra attribute added here; jumping over	which square
							return tempObj;
						}
					}

					return null;
				};

			var moveList = getAllMoves ( fromWhichSquare );
			var processedList = processMoves( moveList, fn, fromWhichSquare );

			for ( var i = 0; i < processedList.length; i += 1 ) {
				console.log( fromWhichSquare + ' __>: len ' + processedList.length + "-" +  processedList[i][Object.keys(processedList[i])[0]]);
			}

			return processedList;
		};



		var getBasicMoves = function( fromWhichSquare ) {
			var fn = function(keyVal, squareIndex) {
					var sideInPlay = whichSideIs( squareIndex );
					var direction = Object.keys(keyVal)[0];				// direction keyVal square is from 'fromWhichSquare'

					if ( squares[keyVal[direction]].occupier === emptySquare )
						return keyVal;

					return null;
				};

			var moveList = getAllMoves ( fromWhichSquare );
			var unoccupiedList = processMoves( moveList, fn, fromWhichSquare );

			for ( var i = 0; i < unoccupiedList.length; i += 1 ) {
				console.log( fromWhichSquare + ' ==>: len ' + unoccupiedList.length + "-" +  unoccupiedList[i][Object.keys(unoccupiedList[i])[0]]);
			}

			return unoccupiedList;
		};




		var getAllJumpMoves = function ( isPlayerATurn ) {
			var occupier;
			var correctSide;
			var moveList = [],
				jumpsList = [];

			for ( i = 1; i <= 32; i += 1 ) {
				occupier = squares[i].occupier;
				correctSide = ( occupier !== emptySquare ) && ( ( isPlayerATurn && isA(occupier) ) || ( !isPlayerATurn && !isA(occupier) ) );
				if ( correctSide ) {
					moveList = getJumpMoves( i );
					if ( moveList.length > 0 ) {
						jumpsList = jumpsList.concat( moveList );
					}
				}
			}

			return jumpsList;
		};




		// Check to see if there is a move possible for passed in side a or b.
		// Doesn't check for jump moves, just basic moves.
		// Returns true if there's at least one possible move, else return false.
		var playerHasAtLeastOnePossibleMove = function( isPlayerATurn ) {
			var occupier;
			var correctSide;
			var moveList = [],
				possibleMovesForThisPlayer = [];

			for ( i = 1; i <= 32; i += 1 ) {
				occupier = squares[i].occupier;
				correctSide = ( occupier !== emptySquare ) && ( ( isPlayerATurn && isA(occupier) ) || ( !isPlayerATurn && !isA(occupier) ) );
				if ( correctSide ) {
					moveList = getBasicMoves( i );
					if ( moveList.length > 0 ) return true;
				}
			}

			return false;
		};


		var doJump = function( from, over, to, isPlayerATurn ) {
			var fromOccupier = squares[from].occupier;
			var toOccupier = squares[to].occupier;
			var correctSide = ( fromOccupier !== emptySquare ) && ( ( isPlayerATurn && isA(fromOccupier) ) || ( !isPlayerATurn && !isA(fromOccupier) ) );
			var killedOffPiece;

			if ( !correctSide || toOccupier !== emptySquare ) return false;
			else {
				squares[to].occupier = fromOccupier;
				squares[from].occupier = emptySquare;
				killPlayerAt( over );
			}

			return true;
		};

		var doMove = function( from, to, isPlayerATurn ) {			// todo: refactor w/ above function
			var fromOccupier = squares[from].occupier;
			var toOccupier = squares[to].occupier;
			var correctSide = ( fromOccupier !== emptySquare ) && ( ( isPlayerATurn && isA(fromOccupier) ) || ( !isPlayerATurn && !isA(fromOccupier) ) );
			
			if ( !correctSide || toOccupier !== emptySquare ) return false;
			else {
				squares[to].occupier = fromOccupier;
				squares[from].occupier = emptySquare;
			}

			return true;
		};


		var killPlayerAt = function ( squareIndex ) {
			var who = squares[squareIndex].occupier;

			if ( isA( who ) ) {
				my.game.aliveAs -= 1;
			} else {
				my.game.aliveBs -= 1;
			}

			if ( my.game.aliveAs < 1 || my.game.aliveBs < 1 ) my.game.winner();

			squares[squareIndex].occupier = emptySquare;
		};



		// Based on whose turn it is,  go through all the pieces for that player and see
		// if a jump over opponent is available.  Take it if it is and return true; else false.
		var oldCheckForAndTakeJump = function( isPlayerATurn ) {  // return true if jump available??
			var occupier;
			var isCrowned;
			var moveList = [],
				test = [];
			var correctSide;
			var msg = function(keyVal, squareIndex) {
					var sideInPlay = whichSideIs( squareIndex );
					var direction = Object.keys(keyVal)[0];
					if ( isMyOpponent( sideInPlay, squares[keyVal[direction]].occupier ) ) {
						console.log( 'an opponent of ' + squareIndex + ' in square ' + keyVal[direction] );
						return keyVal;
					}
					return null;
				};


			for ( i = 1; i <= 32; i += 1 ) {
				occupier = squares[i].occupier;
				correctSide = ( occupier !== emptySquare ) && ( ( isPlayerATurn && isA(occupier) ) || ( !isPlayerATurn && !isA(occupier) ) );
				if ( correctSide ) {
					moveList = getAllMoves( i );
console.log('i: ' + i + '---whichside:' + occupier + '---length of moveList :' + moveList.length );
					test = processMoves( moveList, msg, i );
console.log('i: ' + i + '---whichside:' + occupier + '---length of test :' + test.length );
					
				}
			}
		};



		return {
			reset : reset,
				seed: seedBoard,					// for testing
			show : consoleLog,						// pass in true to see indexes
			process : processMoves,
			check: checkForAndTakeJump,
			moves : allBasicMoves,
			getAllJumpMoves: getAllJumpMoves,
			jmoves: allJumpMoves,
			movePossible : playerHasAtLeastOnePossibleMove,
			getPossibleMoves: getAllMoves,
			doJump: doJump,
			doMove: doMove
		};

	})();

	return my;

}( checkers || {} ));


var checkers = (function (my) {

	my.game = (function() {
		var gameStarted = false;
		var win = false;
		var aliveAs,
			aliveBs;
		var playerATurn = parseInt( Math.random() * 10, 10 ) % 2;	// Randomly select who starts

		var askForAndDoNextMove = function() {
			from = parseInt( prompt( "Your next movement from : ", "1-32"), 10 );
			to = parseInt( prompt ("move to: "), 10 );
			my.board.doMove( from, to );
		};

		var init = function() {
			my.board.reset();
			aliveAs = 12;
			aliveBs = 12;

			my.board.seed();		// for testing

			my.board.show( true );
			my.board.moves( 10 );
			my.board.moves( 2 );	// 6
			my.board.moves( 23 ); // 27	
			my.board.moves( 7 );   // 3
			my.board.moves( 29 );	// 25
			my.board.moves( 14 );	// 9
			my.board.moves( 11 );	// 15 & 16
			my.board.moves( 25 );	// 21 & 22

			my.board.show( false );

			gameStarted = true;
		};



		// If there is more than one jump available, ask which one to take, else take the 1 jump.
		var checkForAndTakeAJump = function ( ) {
			var availableJumps = my.board.getAllJumpMoves( playerATurn );
			var howManyAvailableJumps;
			var direction;

			if ( availableJumps ) {
				howManyAvailableJumps = availableJumps.length;

				if ( howManyAvailableJumps > 1 ) {
					// TODO: list of jumps, ask which one to take
				} else {
					direction =  Object.keys( availableJumps[0] )[0] !== "from" ? Object.keys( availableJumps[0] )[0] : Object.keys( availableJumps[0] )[1] ;
					my.board.doJump( availableJumps[0].from, availableJumps[0].over, availableJumps[0][direction], playerATurn );
				}
				return true;
			} else
				return false;
		};



		var switchTurns = function() {
			playerATurn = !playerATurn;
		};



		var start = function() {
			init();

			my.board.jmoves( 23 );	// 30
            my.board.jmoves( 26 );  // 19
            my.board.jmoves( 7 );  //  14

            mainGameLoop();
            weHaveAWinner();
		};


		var mainGameLoop = function() {
			while ( aliveAs > 0 && aliveBs > 0 && win === false ) {
				// check if current player has possible jumps
				if (  ! checkForAndTakeAJump() ) {
					//		see if the player has available moves
					if ( my.board.movePossible( playerATurn ) ) {
						askForAndDoNextMove( playerATurn );
					}
				}

				switchTurns();
			}
		};


		var weHaveAWinner = function() {

		};


		return {
			begun : gameStarted,
			aliveAs : aliveAs,
			aliveBs : aliveBs,
			playerATurn : playerATurn,
			start : start,
			switchTurns: switchTurns,
			winner: weHaveAWinner
		};

	})();

    return my;

}( checkers || {} ));
