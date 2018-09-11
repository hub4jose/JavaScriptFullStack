(function(){

// div for start screen
	const start = "<div class='screen screen-start' id='start'>" +
			   "<header><h1>Tic Tac Toe</h1>" +
			   "<a href='#' class='button'>Play Game</a><br>" +
			   "</header></div>";
// div for win screen
	const win =  "<div class='screen screen-win' id='finish'>" +
    		 "<header><h1>Tic Tac Toe</h1>" +
    		 "<p class='message'></p>" +
    		 "<a href='#' class='button'>New game</a>" +
    		 "</header></div>";


  // Add start and finish div to end of body and hide them initially
	$('body').append(start);
	$('body').append(win);
	$('#start, #finish').hide();

	// IIFE to Load the start screen
	(function() {

		$('#start').show();

    //On Play Game button click event
		$('.button').on('click', function(){
          $('#start, #finish').hide();
          $('#board').show();
          // remove the previously filled image in the boxes for new game
          $(".box").each(function () {
          this.style.backgroundImage = "none";
          $(this).removeClass("box-filled-1");
          $(this).removeClass("box-filled-2");
			});

			// clear the  player active from previous game
			$('li.players').removeClass('active');

      //ramdomly find player to start
			var pl2Start = Math.floor(Math.random() * 2);

      //player to start made active
			$('li.players').eq(pl2Start).addClass("active");

      //call startgame function
			startGame();
		});
	}());

	// function to play the game
	var startGame = function() {

  // mouse enter and leave event over and off the box
    		$('.box').each(function(){
          //svg background image for mouse hover on the box
      			$(this).mouseenter(function(){
      				if ( $('#player1').hasClass("active")) {
      					this.style.backgroundImage = "url('img/o.svg')";
      				} else {
      					this.style.backgroundImage = "url('img/x.svg')";
      				}
      			});
            //remove background image after mouse leaves the box
      			$(this).mouseleave(function(){
      				this.style.backgroundImage = "none";
      			});
    		});

  //mouse click event on the box by an active player
        $('.box').click(function(){
          // pL1 mouse click to  place circle image on the box if empty
    			if ($('#player1').hasClass("active")) {
        				if ($(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
        					$(this).addClass('box-filled-1');
        					this.style.backgroundImage = "url('img/o.svg')";
                  //if box is already filled remove mouseenter and mouseleave event handler
        					$(this).unbind('mouseenter mouseleave');
        					didUWin();
        					switchPlyr();
        				}
          //pL2 mouse click to place cross image on th box if empty
    			} else if ($('#player2').hasClass("active")) {
        				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
        					$(this).addClass('box-filled-2');
                  //if box is already filled remove mouseenter and mouseleave event handler
        					this.style.backgroundImage = "url('img/x.svg')";
        					$(this).unbind('mouseenter mouseleave');
        					didUWin();
        					switchPlyr();
        				}
    			} else {
    				console.log("No more turns!");
    			}

    		});
	};

// function to switch the player to play
	var switchPlyr = function() {
		if ( $('#player1').hasClass('active') ) {
			$('#player1').removeClass("active");
			$('#player2').addClass("active");
		} else {
			$('#player2').removeClass("active");
			$('#player1').addClass("active");
		}
	};


// check if the player has won the game
	var didUWin = function() {
		// Array to store the values of players input
    var winner = [];
    // stores which player is winner
    var result = "";


    		$('.box').each(function(){
    			if ($(this).hasClass('box-filled-1')) {
    				winner.push("1");
    			} else if ($(this).hasClass('box-filled-2')) {
    				winner.push("2");
    			} else {
    				winner.push("0");
    			}
    		});
		// possible permutation to win check
  			if (winner[0] !== "0" && winner[0] === winner[1] && winner[1] === winner[2]) {
            result = winner[0];

  			} else if (winner[3] !== "0" && winner[3] === winner[4] && winner[4] === winner[5]) {
    				result = winner[3];

  			} else if (winner[6] !== "0" && winner[6] === winner[7] && winner[7] === winner[8]) {
    				result = winner[6];

  			} else if (winner[0] !== "0" && winner[0] === winner[3] && winner[3] === winner[6]) {
    				result = winner[0];

  			} else if (winner[1] !== "0" && winner[1] === winner[4] && winner[4] === winner[7]) {
    				result = winner[1];

  			} else if (winner[2] !== "0" && winner[2] === winner[5] && winner[5] === winner[8]) {
    				result = winner[2];

  			} else if (winner[0] !== "0" && winner[0] === winner[4] && winner[4] === winner[8]) {
    				result = winner[0];

  			} else if (winner[2] !== "0" && winner[2] === winner[4] && winner[4] === winner[6]) {
    				result = winner[2];

  			} else if (winner.includes("0") === false){
    				result = "It's a Tie!";

  			}
        //alert("value:" + result);
 // If we have a winner or the game is a Tie then end the game
        if( result != "") {
        		endGame(result);
	      }
	};
	// Result screen at the end of the game.
	var endGame = function(result) {
		if (result === "1") {
			$("#finish").removeClass("screen-win-two");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("Player 1 wins!");
			$("#finish").addClass("screen-win-one");
			$("#finish").show();
			$("#board").hide();
		} else if (result === "2") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("Player 2 wins!");
			$("#finish").addClass("screen-win-two");
			$("#finish").show();
			$("#board").hide();
		} else if (result === "It's a Tie!") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-two");
			$(".message").html("It's a Tie!");
			$("#finish").addClass("screen-win-tie");
			$("#finish").show();
			$("#board").hide();
		}
	};
}());
