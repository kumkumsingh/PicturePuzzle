class Game {
  constructor() {
    this.emptyXPos = 3;
    this.emptyYPos = 3;
    this.isPlayerWon = this.isPlayerWon.bind(this);
  }
  start = () => {
    //Create object of GameBoard
    this.gameBoard = new GameBoard();
    this.gameBoard.numberShuffle();
    this.gameBoard.populate();
    document.addEventListener(
      "click",
      e => {
        // If the clicked element doesn't have the right selector, then return
        if (!event.target.matches("div")) return;
        else {
          const xPosition = e.target.id[1];
          const yPosition = e.target.id[2];
          if (this.isPossibleToMove(xPosition, yPosition)) {
            let emptyElementId = "p" + this.emptyXPos + this.emptyYPos;
            let emptyElement = document.getElementById(emptyElementId);
            this.emptyXPos = Number(xPosition);
            this.emptyYPos = Number(yPosition);
            let clickedElement = document.getElementById(e.target.id);
            //Change index of the values once they are exchanged with emptyelement
            let clickedElIndex = this.gameBoard.cells.indexOf(
              Number(clickedElement.innerHTML)
            );
            //16th empty element index is needed to sort the cell array and finally gamewon functionality can be checked

            let emptyElIndex = this.gameBoard.cells.indexOf(16);
            let temp1 = this.gameBoard.cells[clickedElIndex];
            this.gameBoard.cells[clickedElIndex] = 16;
            this.gameBoard.cells[emptyElIndex] = temp1;
            //change the value , its class of clicked element with empty cell element
            let clickedElementClass = "img" + clickedElement.innerHTML;
            let temp = emptyElement.innerHTML;
            clickedElement.classList.replace(clickedElementClass, "img16");
            emptyElement.classList.replace("img16", clickedElementClass);
            emptyElement.innerHTML = clickedElement.innerHTML;
            clickedElement.innerHTML = temp;
            if (this.isPlayerWon()) {
              const fullImageDisplay = document.getElementById("gameWrapper");
              fullImageDisplay.innerHTML =
                "<div class='fullImage'>You Won the Game!</div>";
            }
          }
        }
      },
      false
    );
  };
  //checks whether clicked image is possible to move to left or right , top or bottom
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

  //check whether player won the game
  isPlayerWon = () => {
    for (let i = 1; i <= this.gameBoard.cells.length; i++) {
      //checking whether value of each index is same as index its self
      if (!(this.gameBoard.cells[i - 1] === i)) {
        return false;
      }
    }
    return true;
  };
}

//calling start function to start the game
const game = new Game();
game.start();
