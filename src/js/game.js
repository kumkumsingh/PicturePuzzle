//import constant from '../../constant';
class Game {
  constructor() {
    this.emptyXPos = 3; //x position of last empty element in the cell
    this.emptyYPos = 3; //y poistion of laste empty elemnt in the cell
    this.isPlayerWon = this.isPlayerWon.bind(this);
    this.exchangeIndex = this.exchangeIndex.bind(this);
    this.exchValueNdClass = this.exchValueNdClass.bind(this);
  }
  //This is to start the game
  start = () => {
    this.gameBoard = new GameBoard();
    this.gameBoard.numberShuffle();
    this.gameBoard.populateCell();
    //On click of each image in the gird this event is called.
    document.addEventListener(
      "click",
      e => {
        // If the clicked element doesn't have the right selector, then return
        if (!event.target.matches("div")) return;
        else {
          //Picking 2nd and 3rd position of the id of clicked image .
          const xPos = e.target.id[1];
          const yPos = e.target.id[2];
          //Checks whether its possible to suffle clicked image with empty gray cell element.
          if (this.isPossibleToMove(xPos, yPos)) {
            //Building id of last element in the grid
            let emptyElementId = "p" + this.emptyXPos + this.emptyYPos;
            let emptyElement = document.getElementById(emptyElementId);
            //Changing x and y position of empty element with clicked image.
            this.emptyXPos = Number(xPos);
            this.emptyYPos = Number(yPos);
            //Fetching id of clicked image.
            let clickedElement = document.getElementById(e.target.id);
            this.exchangeIndex(clickedElement);
            this.exchValueNdClass(clickedElement , emptyElement);
            //Checks whether the player has arranged all the images in correct order.
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
  //Fetching index of empty element and clicked element index and exchanging the position.
  exchangeIndex = (clickedElement) =>{
    let clickedElIndex = this.gameBoard.cells.indexOf(
      Number(clickedElement.innerHTML)
    );

    let emptyElIndex = this.gameBoard.cells.indexOf(this.gameBoard.lastElement);
    let tempClickIn = this.gameBoard.cells[clickedElIndex];
    this.gameBoard.cells[clickedElIndex] = this.gameBoard.lastElement;
    this.gameBoard.cells[emptyElIndex] = tempClickIn;
    console.log(this.gameBoard.cells)
  }
   //Exchange the value and its css class which has img as background of clicked element with empty cell element. 
  exchValueNdClass = (clickedElement , emptyElement) =>{

    let clickedElementClass = "img" + clickedElement.innerHTML;
    let tempEmtEl = emptyElement.innerHTML;
    clickedElement.classList.replace(clickedElementClass, "img16");
    emptyElement.classList.replace("img16", clickedElementClass);
    emptyElement.innerHTML = clickedElement.innerHTML;
    clickedElement.innerHTML = tempEmtEl;

  }
  //check whether player won the game
  isPlayerWon = () => {
    for (let i = 1; i <= this.gameBoard.cells.length; i++) {
      //checking whether value of each index is same as value of cells array .
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
