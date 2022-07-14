// slectors
const section = document.querySelector('section')
const resetGameBtn = document.querySelector('.resetGame')
const playerStartingScore = document.querySelector('span')
// player score
let playerScore = 0;
playerStartingScore.textContent = playerScore;



// variable that is holding an array of 8 objects
const getCardData = () => [
    {imgSrc: './imgs/fight.jpg', name: 'fight'},
    {imgSrc: './imgs/igor-save.jpg', name: 'igor-save'},
    {imgSrc: './imgs/mika.jpg', name: 'mika'},
    {imgSrc: './imgs/msg.jpg', name: 'msg'},
    {imgSrc: './imgs/msg2.jpg', name: 'msgtwo'},
    {imgSrc: './imgs/NYR-Celly.jpg', name: 'NYR-celly'},
    {imgSrc: './imgs/NYR-win.jpg', name: 'NYR-win'},
    {imgSrc: './imgs/onestar.jpg', name: 'onestar'},
    {imgSrc: './imgs/fight.jpg', name: 'fight'},
    {imgSrc: './imgs/igor-save.jpg', name: 'igor-save'},
    {imgSrc: './imgs/mika.jpg', name: 'mika'},
    {imgSrc: './imgs/msg.jpg', name: 'msg'},
    {imgSrc: './imgs/msg2.jpg', name: 'msgtwo'},
    {imgSrc: './imgs/NYR-Celly.jpg', name: 'NYR-celly'},
    {imgSrc: './imgs/NYR-win.jpg', name: 'NYR-win'},
    {imgSrc: './imgs/onestar.jpg', name: 'onestar'},
];

// getting data from array to randomize.
const randomizeCardData = () => {
    const cardData = getCardData();
    // function to sort through array and randomize it.
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

// createCard function 
const createCard = () => {
    const cardData = randomizeCardData();
    // create html for cards
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const cardFront = document.createElement('img');
        const cardBack = document.createElement('div');
        // logo img for the back portion only, img outside of array that is static
        const cardBackLogo = document.createElement('img')
        // give each new element a class
        card.classList = 'card';
        cardFront.classList = 'front';
        cardBack.classList = 'back';
        cardBackLogo.classList ='backLogo'
        // set data for cards
        cardFront.src = item.imgSrc;
        cardBackLogo.src = "./imgs/nyrlogo.jpg"
        card.setAttribute('name', item.name);
        
        // append cards to the section
        section.appendChild(card);
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        // appending cardBackLogo to cardBack not overall card
        cardBack.appendChild(cardBackLogo);
        // sets a click event the will flip cards
        card.addEventListener('click',(e) => {
            card.classList.toggle('toggle');    
            // want to run the checkCards function here for the game to work correctly
            checkCards(e)   
        });
    });
};

// function that checks cards if they are a match or not.
const checkCards = (e) => {
    const clickedCard = e.target
    // add the class of 'flipped' to the cell that was clicked on
    clickedCard.classList.add('flipped');
    // storing all 'flipped' cards in a new variable.
    const flippedCards = document.querySelectorAll('.flipped');
    // logic for the check cards function
    if(flippedCards.length === 2){
        // if attribute names are === playerScore goes up by 1.
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            playerScore++;
            // new score is updated in the span div
            playerStartingScore.textContent = playerScore;
            if(playerScore === 8){
                // once player gets all 8 pairs, alert prompts and restartGame function happens
                window.alert('AND THE RANGERS SCOREEEEE')
                // game won function, reset the entire board with an updated score and updated board
                restartGame();   
            };    
            // loops thru matched cards and removes the 'flipped' class and also prevents the user
            // from being able to click the cell again
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents= 'none'; 
            });
        } else{
            // if its not a match console.log "wrong"
            console.log('wrong')
            flippedCards.forEach(card => {
            card.classList.remove('flipped');
            setTimeout(()=> card.classList.remove('toggle'),1500)
           });
        }
    }   
}

// function that will be invoked when the player wins the game
const restartGame = () => {
    let cardData = randomizeCardData();
    let cards = document.querySelectorAll('.card');
    let front = document.querySelectorAll('.front');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        setTimeout(() => {
            cards[index].classList.remove('toggle');
            cards[index].style.pointerEvents = 'all';
            front[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
        }, 1200);
    });
    // resets score 
    playerScore = 0;
    playerStartingScore.textContent = playerScore;
}

// button that resets the entire game
resetGameBtn.addEventListener('click',() => {
    let cardData = randomizeCardData();
    let cards = document.querySelectorAll('.card');
    let front = document.querySelectorAll('.front')
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        setTimeout(() => {
            cards[index].classList.remove('toggle')
            cards[index].style.pointerEvents = 'all'
            front[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name)
        },1200);
    });
    // resets score
    playerScore = 0;
    playerStartingScore.textContent = playerScore;
});

createCard();
