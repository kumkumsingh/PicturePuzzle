class GameBoard {
  constructor() {
    this.cells = [];
    this.lastElement = 16;
  }
  numberShuffle = () => {
    //Generate random numbers from 1 to 15 to fill it in the cells of the grid.
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
    //Push the last element which is 16th element
    this.cells.push(this.lastElement)
  };
  //Populate the random numbers in each cell except last 16th element
  // in the 16th cell because it has to be empty in order to suffle with the element which is clicked.
  populateCell = () => {
    let id = "";
    let celElement;
    let index = 0;

    for (let xPos = 0; xPos < 4; xPos++) {
      for (let yPos = 0; yPos < 4; yPos++) {
        if (!(xPos === 3 && yPos === 3)) {
        //Generating id for each element in the grid cell e.g. p00, p01 so that random no can be assgined to it.
          id = "p" + xPos + yPos;
          celElement = document.getElementById(id);
          celElement.innerHTML = this.cells[index];
          this.assignImg(celElement, this.cells[index]);
          index++;
        }
      }
    }
  };
  //Assigns (125px * 125px) size image to each cell of the grid. 
  assignImg = (celElement, cellValue) => {
    let imgClassName = "img" + cellValue;
    celElement.classList.add(imgClassName);
  }
}
