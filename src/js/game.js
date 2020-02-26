//import constant from '../../constant';
class Game {
  constructor() {
    this.isGameOver = this.isGameOver.bind(this);
    this.exchangeIndex = this.exchangeIndex.bind(this);
    this.exchangeValues = this.exchangeValues.bind(this);
    this.start = this.start.bind(this);
    this.addListener();
  }
  addListener = () => {
    const start = document.getElementById("startBtn");
    start.addEventListener("click", () => this.start());
  };

  //Start the game
  start = () => {
    this.initialise();
    const elapsedTime = document.getElementById("elapsedTime");
    //Starts timer for the game
    this.timeInterval = setInterval(() => {
      elapsedTime.innerHTML = `ElapsedTime ${this.gameTime}`;
      this.gameTime++;
    }, 1000);
    this.stepElement = document.getElementById("numberOfMoves");
    this.stepElement.innerHTML = `Number of Moves : 0`;

    //On click of each image in the grid, this event is triggered.
    document.addEventListener("click", e => {

      // If the player clicks outside the image, then return
      if (!event.target.matches("div")) return;
      else {
        
        //Pick 2nd and 3rd position of the id of clicked image .
        const xPos = e.target.id[1];
        const yPos = e.target.id[2];

        //Check whether its possible to move the clicked image with the gray cell.
        if (this.isPossibleToMove(xPos, yPos)) {

          //Get the id of the empty/gray element
          const emptyElementId = "p" + this.emptyXPos + this.emptyYPos;
          const emptyElement = document.getElementById(emptyElementId);

          //Get the id of clicked image.
          const clickedElement = document.getElementById(e.target.id);
          this.exchangeIndex(clickedElement);
          this.exchangeValues(clickedElement, emptyElement, xPos, yPos);

          //Change x and y position of empty element with clicked image.
          this.emptyXPos = Number(xPos);
          this.emptyYPos = Number(yPos);

          //Increment the number of moves.
          this.numberOfMoves++;
          this.stepElement.innerHTML = `Number of Moves : ${this.numberOfMoves}`;

          //If the game is over, display the full image.
          if (this.isGameOver()) {
            const fullImageDisplay = document.getElementById("gameWrapper");
            fullImageDisplay.innerHTML =
              "<div class='fullImage'>You Won the Game!</div>";
          }
        }
      }
    });
  };

  //Initialize the variables and gameboard.
  initialise = () => {
    this.numberOfMoves = 0;
    this.emptyXPos = 3; //x position of empty/gray element
    this.emptyYPos = 3; //y position of empty/gray element
    this.gameBoard = new GameBoard();
    clearInterval(this.timeInterval);
    this.gameTime = 0;
  };

  //Check whether it is possible to move
  isPossibleToMove = (xPos, yPos) => {
    xPos = parseInt(xPos);
    yPos = parseInt(yPos);
    const validMove = true;
    const invalidMove = false;
    const clickedEmptyRow = xPos === this.emptyXPos;
    const clickedEmptyColumn = yPos === this.emptyYPos;
    const isDifferenceInYposition1 =
      yPos - this.emptyYPos === 1 || this.emptyYPos - yPos === 1;
    const isDifferenceInXposition1 =
      xPos - this.emptyXPos === 1 || this.emptyXPos - xPos === 1;
    if (clickedEmptyRow && isDifferenceInYposition1) {
      return validMove;
    } else if (clickedEmptyColumn && isDifferenceInXposition1) {
      return validMove;
    } else {
      return invalidMove;
    }
  };

 /* Get the indexes of empty/gray element and clicked element,
  then exchange the position in the cells array.*/
  exchangeIndex = clickedElement => {
    let clickedElIndex = this.gameBoard.cells.indexOf(
      Number(clickedElement.innerHTML)
    );
    let emptyElIndex = this.gameBoard.cells.indexOf(this.gameBoard.lastElement);
    const tempClickIn = this.gameBoard.cells[clickedElIndex];
    this.gameBoard.cells[clickedElIndex] = this.gameBoard.lastElement;
    this.gameBoard.cells[emptyElIndex] = tempClickIn;
  };

  /*Exchange the value and the class attribute of clicked image
  with the empty/gray element and clicked element  with actual element.*/
  exchangeValues = (clickedElement, emptyElement, xPos, yPos) => {
    const clickedElementClass = "img" + clickedElement.innerHTML;
    let actualImgPos = this.emptyXPos * 4 + this.emptyYPos + 1;
    const greyElementClass = "img" + actualImgPos;
    actualImgPos = Number(xPos) * 4 + Number(yPos) + 1;
    const actualElementClass = "img" + actualImgPos;
    const tempEmtyEl = emptyElement.innerHTML;
    clickedElement.classList.replace(clickedElementClass, actualElementClass);
    emptyElement.classList.replace(greyElementClass, clickedElementClass);
    clickedElement.style.filter = "opacity(0.4)";
    emptyElement.style.filter = "opacity(1)";
    emptyElement.innerHTML = clickedElement.innerHTML;
    clickedElement.innerHTML = tempEmtyEl;
  };

  // Check whether the game is over
  isGameOver = () => {
    for (let i = 1; i <= this.gameBoard.cells.length; i++) {
      //Checking whether value of each index is same as value of cells array .
      if (!(this.gameBoard.cells[i - 1] === i)) {
        return false;
      }
    }
    //Clears the timer for the game and restarts the timer for new game on click of start.
    clearInterval(this.timeInterval);
    return true;
  };
}

//Creating a new game
const game = new Game();
