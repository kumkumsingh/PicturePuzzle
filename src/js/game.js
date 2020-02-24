//import constant from '../../constant';
class Game {
  constructor() {
    this.isPlayerWon = this.isPlayerWon.bind(this);
    this.exchangeIndex = this.exchangeIndex.bind(this);
    this.exchangeValues = this.exchangeValues.bind(this);
    this.start = this.start.bind(this);
    this.addListener();
  }
  addListener = () => {
    const playAgButton = document.getElementById("startBtn");
    playAgButton.addEventListener("click", () => this.start());
  };

  //Start the game
  start = () => {
    this.initialise();

    const elapsedTime = document.getElementById("elapsedTime");
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

          //Change x and y position of empty element with clicked image.
          this.emptyXPos = Number(xPos);
          this.emptyYPos = Number(yPos);

          //Get the id of clicked image.
          const clickedElement = document.getElementById(e.target.id);
          this.exchangeIndex(clickedElement);
          this.exchangeValues(clickedElement, emptyElement);

          //Increment the number of moves.
          this.numberOfMoves++;
          this.stepElement.innerHTML = `Number of Moves : ${this.numberOfMoves}`;

          //If the game is won, display the full image.
          if (this.isPlayerWon()) {
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
    if (xPos === this.emptyXPos) {
      if (yPos - this.emptyYPos === 1 || this.emptyYPos - yPos === 1) {
        return true;
      } else {
        return false;
      }
    } else if (yPos === this.emptyYPos) {
      if (xPos - this.emptyXPos === 1 || this.emptyXPos - xPos === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // Get the indexes of empty/gray element and clicked element,
  // then exchange the position in the cells array.
  exchangeIndex = clickedElement => {
    let clickedElIndex = this.gameBoard.cells.indexOf(
      Number(clickedElement.innerHTML)
    );

    let emptyElIndex = this.gameBoard.cells.indexOf(this.gameBoard.lastElement);
    let tempClickIn = this.gameBoard.cells[clickedElIndex];
    this.gameBoard.cells[clickedElIndex] = this.gameBoard.lastElement;
    this.gameBoard.cells[emptyElIndex] = tempClickIn;
    console.log(this.gameBoard.cells);
  };

  // Exchange the value and the class attribute of clicked image
  // with the empty/gray element.
  exchangeValues = (clickedElement, emptyElement) => {
    let clickedElementClass = "img" + clickedElement.innerHTML;
    let tempEmtEl = emptyElement.innerHTML;
    clickedElement.classList.replace(clickedElementClass, "img16");
    emptyElement.classList.replace("img16", clickedElementClass);
    emptyElement.innerHTML = clickedElement.innerHTML;
    clickedElement.innerHTML = tempEmtEl;
  };

  // Check whether the game is won
  isPlayerWon = () => {
    for (let i = 1; i <= this.gameBoard.cells.length; i++) {
      //Checking whether value of each index is same as value of cells array .
      if (!(this.gameBoard.cells[i - 1] === i)) {
        return false;
      }
    }
    clearInterval(this.timeInterval);
    return true;
  };
}

//calling start function to start the game
const game = new Game();
