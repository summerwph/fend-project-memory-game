/*
 * Ａ list that holds all of my cards
 */
 const iconsList = ['fa-diamond', 'fa-paper-plane-o','fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o','fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

 let matched = []; //A list that holds all of matched symbols
 let move = 0; // move counter
 let starNum = 3; // Number of stars


 /* Restart matching game
 *  1. remove the card board, remove stars, reset move count, reset number of stars, reset matched array
 *  2. Initialize the card board, and stars board
 */
 function restart(){
   const myRestart = document.querySelector('.fa-repeat')
   myRestart.addEventListener('click', function(){
     tearDown();
     Init();
   })
 }

//Remove current cards board
function removeCard(){
    const myCardBoard = document.querySelector(".deck");
    while (myCardBoard.firstChild) {
        myCardBoard.removeChild(myCardBoard.firstChild);
    }
}

//Remove current stars board
function removeStars(){
    const myStarsBoard = document.querySelector(".stars");
    while (myStarsBoard.firstChild) {
        myStarsBoard.removeChild(myStarsBoard.firstChild);
    }
}

//Reset the card board and star and variable.
function tearDown(){
  removeCard();
  removeStars();
  move = 0; //Num of move reset
  starNum = 3; //Num of star reset
  resetList(matched);
  document.querySelector('.moves').innerHTML = 0;
}

//Display "Play Again Message"
function playAgain() {
  modal.style.display = "none";
  tearDown();
  Init();
}


/*
 * activateCards() - set up the event listener for a card. If a card is clicked:
 *  1. displaySymbol(card) - display the card's symbol
 *  2. openedCardList(card) - add the card to a *list* of "open" cards
 *  3. if the list already has another card, check to see if the two cards match
 *     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Close the cards whem two cards are not matched.
 function closedSymbol(card){
     card.classList.remove('open');
     card.classList.remove('show');
 }

// Empty an array
 function resetList(a){
   while (a.length > 0){
     a.pop();
   }
 }

 // Get the modal
 var modal = document.getElementById('myModal');
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 // If there is 8 different symbols in the matched list, then you win the game.
 function checkGameOver(c){
     const symbol = c.firstElementChild.classList.item(1);
     // If the icon has already existed in array, then do nothing.
     // If not, push into the matched array.
     if (!matched.includes(symbol)){
       matched.push(symbol);
     }
     // console.log("Matched Symbol: " + matched.toString());
     if (matched.length == 8){
       // When the user wins the game, open the modal
       document.querySelector('#f-move').innerHTML = move;
       document.querySelector('#f-star').innerHTML = starNum;
       modal.style.display = "block";

       // // When the user clicks on <span> (x), close the modal and play again
       span.addEventListener('click', function(){
           modal.style.display = "none";
           playAgain();
       })

       // When the user clicks anywhere outside of the modal, close it and play again
       window.addEventListener('click', function(event) {
           if (event.target == modal) {
               modal.style.display = "none";
               playAgain();
           }
       })
     }
 }

 // Doing the shake animation.
 function shake(lastFlippedCard, currentCard){
     let i = 20;
     let Timer = setTimeout(active, 15);
     function active() {
         if (i >= 0) {
             lastFlippedCard.style.padding = 0;
             currentCard.style.padding = 0;
             i%2 == 0?lastFlippedCard.style.paddingLeft = i + 'px': lastFlippedCard.style.paddingRight = i + 'px';
             i%2 == 0?currentCard.style.paddingLeft = i + 'px': currentCard.style.paddingRight = i + 'px';
             i--
             Timer = setTimeout(active, 15)
         }
     }
 }

 // Compare two cards is matching or not.
 function compareCards(lastCard, currentCard){
   shake(lastCard, currentCard);
   if (lastCard.firstElementChild.className == currentCard.firstElementChild.className){
       // Cards matched, lock cards in the open position
       // Clean the current openedCard list
       // Check the game is reaching end criteria or not.
       lastCard.setAttribute('class','card match');
       currentCard.setAttribute('class','card match');
       checkGameOver(currentCard);
   } else {
       // Not matching, two cards shaking and flipped to close cards.
       // Clean opendCard list.
       lastCard.classList.toggle('nomatch');
       currentCard.classList.toggle('nomatch');
       setTimeout(function cardClosed(){
         closedSymbol(lastCard);
         closedSymbol(currentCard);
         lastCard.classList.toggle('nomatch');
         currentCard.classList.toggle('nomatch');
       },1000)
   }
 }


 // Caculate the score by move count
 function caculateStar(move){
   const stars = document.querySelectorAll('.stars li i');
   if (move >= 24){
     stars[0].classList.replace('fa-star','fa-star-o');
     starNum = 0;
   }else if (move >= 18){
     stars[1].classList.replace('fa-star','fa-star-o');
     starNum = 1;
   }else if (move >= 10){
     stars[2].classList.replace('fa-star','fa-star-o');
     starNum = 2;
   }
 }


// Caculate the move count
 function moveCount(boolean){
   if (boolean === true){
     move++;
   }
   document.querySelector('.moves').innerHTML = move;
   caculateStar(move);
 }


// Put a opened card to a list which name is "openedCard".
 const openedCard = [];
 function openedCardList(card){
     openedCard.push(card);
 }


 function displaySymbol(card){
     card.classList.add('open');
     card.classList.add('show');
 }


function activateCards(){
   document.querySelectorAll('li.card').forEach(function(card){
     card.addEventListener('click', function(evt){
       evt.preventDefault();
       // Check whether the card is opened or not.
       // If yes, do nothing to avoid a user click the same card or matched card.
       // If not, open the card, and put it into the openedCardList. Once there are two cards, go into compare progess.
       if (!card.classList.contains('open') && !card.classList.contains('match')){
         displaySymbol(card);
         openedCardList(card);
         if (openedCard.length >= 2){
           //Whatever cards are matched or not, the moving count need to add 1
           moveCount(true);
           // Compare two cards
           compareCards(openedCard[0], openedCard[1]);
           //After comparing clean the openedCard[].
           resetList(openedCard);
         }
       }else{
         alert("Please choose another card, this one has already opened or matched.");
       }
     })
   })
 }


/*
 *  Display the stars on the page
 *   - loop through each star and create its HTML
 *   - add each star's HTML to the page
 */
function createStars(){
  const myStarsBoard = document.querySelector('.stars');
  for (let i = 0; i <=2; i++){
    const newStar = document.createElement('li');
    // newCard.classList.add('card');
    const newStarIcon = document.createElement('i');
    newStarIcon.classList.add('fa','fa-star');
    newStar.appendChild(newStarIcon);
    myStarsBoard.appendChild(newStar);
  }
}

/*
 *  Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(){
    const myCardBoard = document.querySelector('.deck');
    const myIconsList = shuffle(iconsList);
    for (let i = 0; i <=15; i++){
      const newCard = document.createElement('li');
      newCard.classList.add('card');
      const newIcon = document.createElement('i');
      newIcon.classList.add('fa',myIconsList[i]);
      newCard.appendChild(newIcon);
      myCardBoard.appendChild(newCard);
    }
}


// Initialize the game board
function Init(){
  createCard();
  createStars();
  // Ready to start the board game
  activateCards();
  // Add event listener to restart the game board
  restart();
  modal.style.display = "";
}

Init()
