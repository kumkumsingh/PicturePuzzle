class GameBoard {
  constructor() {
    this.cells = [];
    this.lastElement = 16;
  }
  numberShuffle = () => {
    //Generate random numbers from 1 to 15
    for (let i = 0; this.cells.length < 15; i++) {
      let RandomNumber = Number(Math.floor(Math.random() * 16));
      if (!this.cells.includes(RandomNumber) && RandomNumber !== 0) {
        this.cells.push(RandomNumber);
      }
      //To remove duplicate random value
      else if (this.cells.length <= 15) {
        i--;
      }
    }
    //keep the last element as constant 16.
    this.cells.push(this.lastElement)
  };
  //Populate the random numbers in each cell except last 16th element
  // in the 16th cell because it has to be empty in order to suffle with the element which is clicked.
  populateCell = () => {
    let id = "";
    let divElement;
    let index = 0;

    for (let xPosition = 0; xPosition < 4; xPosition++) {
      for (let yPosition = 0; yPosition < 4; yPosition++) {
        if (!(xPosition === 3 && yPosition === 3)) {
          id = "p" + xPosition + yPosition;
          divElement = document.getElementById(id);
          divElement.innerHTML = this.cells[index];
          this.assignImg(divElement, this.cells[index]);
          index++;
        }
      }
    }
  };
  //Assigns (125px * 125px) size image to each cell of the grid 
  assignImg = (element, cellValue) => {
    let imgClassName = "img" + cellValue;
    element.classList.add(imgClassName);
  }
}
