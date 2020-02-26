class GameBoard {
  constructor() {
    this.cells = [];
    this.lastElement = 16;
    this.createCells();
    this.numberShuffle();
    this.populateCell();
  }
  //Create the div elements and assign the determined id's to it.
  createCells = () => {
    const gameWrapper = document.getElementById("gameWrapper");
    let divElement = document.createElement("div");
    divElement.className = "gameGrid";
    gameWrapper.innerHTML = "";
    gameWrapper.appendChild(divElement);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let gridElement = document.createElement("div");
        gridElement.id = `p${i}${j}`;
        divElement.appendChild(gridElement);
      }
    }
  };

  numberShuffle = () => {
    // Generate random numbers from 1 to 15 to fill in the cells of the grid.
    for (let i = 0; this.cells.length < 15; i++) {
      let RandomNumber = Number(Math.floor(Math.random() * 16));
      if (!this.cells.includes(RandomNumber) && RandomNumber !== 0) {
        this.cells.push(RandomNumber);
      }
      // To remove the duplicate random value
      else if (this.cells.length <= 15) {
        i--;
      }
    }
    // Push the last element always with the value of 16
    this.cells.push(this.lastElement);
  };

  // Populate the random numbers and corresponding images in each cell
  populateCell = () => {
    let id = "";
    let cellElement;
    let index = 0;

    for (let xPos = 0; xPos < 4; xPos++) {
      for (let yPos = 0; yPos < 4; yPos++) {
        //Generate the id for each element in the grid cell
        id = "p" + xPos + yPos;
        cellElement = document.getElementById(id);
        if (!(xPos === 3 && yPos === 3)) {
          cellElement.innerHTML = this.cells[index];
          this.assignImg(cellElement, this.cells[index]);
          index++;
        } else {
          cellElement.innerHTML = " ";
          cellElement.style.filter = "opacity(80%)";
          this.assignImg(cellElement, this.lastElement);
        }
      }
    }
  };

  //Determine the classname and assign it to the passed cell Element.
  assignImg = (cellElement, cellValue) => {
    cellElement.removeAttribute("class");
    cellElement.classList.add("gridStyle");
    const imgClassName = "img" + cellValue;
    cellElement.classList.add(imgClassName);
  };
}
