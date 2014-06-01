var checkers = (function (my) {

	my.game = (function() {
		var gameStarted = false;
		var win = false;
		var aliveAs,
			aliveBs;
		var playerATurn = parseInt( Math.random() * 10, 10 ) % 2;	// Randomly select who starts

		var getPlacementChoice = function() {
			return prompt( "Your next move ?", "1-32");
		};

		var init = function() {
			my.board.reset();
			aliveAs = 12;
			aliveBs = 12;

			my.board.seed();		// for testing

			my.board.show(true);
			my.board.moves( 10 );
			my.board.moves( 2 );	// 6
			my.board.moves( 23 ); // 27	
			my.board.moves( 7 );   // 3
			my.board.moves( 29 );	// 25
			my.board.moves( 14 );	// 9
			my.board.moves( 11 );	// 15 & 16
			my.board.moves( 25 );	// 21 & 22

			my.board.show(false);

			gameStarted = true;
		};

		var start = function() {
			init();

//			while ( aliveAs > 0 && aliveBs > 0 ) {

	
			// check if current player has possible jumps; 
			// true do the jump(s) and change turns
			// false
			//		see if the player has available moves
			//		false -> changes turns
			//		true
			//			get who to move next, to where
			// 			check to see if that piece can move to there
			//			yes
			//				do the move
			//			no
			// 				reset to get who to move next, to where




//			}

		};


		return {
			begun : gameStarted,
			playerATurn : playerATurn,
			start : start
		};

	})();

    return my;

}( checkers || {} ));