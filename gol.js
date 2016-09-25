'use strict'

let population = initArray()
let repeater = setInterval(function() { processGeneration(population); }, 500)


function processGeneration(array){

  let n = array.length
  let nextGeneration = []

  // Loop through each row
  for ( let row = 0 ; row < n ; row++){

    let x = []

    // Loop through each column in row
    for ( let col = 0 ; col < n ; col++){

      var neighbours = 0

      // Determine if we are on first or last or middle rows.
      // Then sum the surrounding living cells.

      // Are we on the first row?
      if ( row == 0) {
        var a1 = array[n-1][col-1] || array[n-1][n-1]
        var a2 = array[n-1][col]
        var a3 = array[n-1][col+1] || array[n-1][0]
        var b1 = array[row][col-1] || array[row][n-1]
        var b2 = array[row][col]
        var b3 = array[row][col+1] || array[row][0]
        var c1 = array[row+1][col-1] || array[row+1][n-1]
        var c2 = array[row+1][col]
        var c3 = array[row+1][col+1] || array[row+1][0]
      }
      // Are we on the last row?
      else if ( row == (n-1)) {
        var a1 = array[row-1][col-1] || array[row-1][n-1]
        var a2 = array[row-1][col]
        var a3 = array[row-1][col+1] || array[row-1][0]
        var b1 = array[row][col-1] || array[row][n-1]
        var b2 = array[row][col]
        var b3 = array[row][col+1] || array[row][0]
        var c1 = array[0][col-1] || array[0][n-1]
        var c2 = array[0][col]
        var c3 = array[0][col+1] || array[0][0]
      }
      // We must be on an internal row! ( To-Do: Move this to be the first case to improve efficiency. )
      else {
        var a1 = array[row-1][col-1] || array[row-1][n-1]
        var a2 = array[row-1][col]
        var a3 = array[row-1][col+1] || array[row-1][0]
        var b1 = array[row][col-1] || array[row][n-1]
        var b2 = array[row][col]
        var b3 = array[row][col+1] || array[row][0]
        var c1 = array[row+1][col-1] || array[row+1][n-1]
        var c2 = array[row+1][col]
        var c3 = array[row+1][col+1] || array[row+1][0]
      }

      //Sum the living local cells. Don't sum b2 - this is the target cell we are interrogating.
      population = (isl(a1)+isl(a2)+isl(a3)+isl(b1)+isl(b3)+isl(c1)+isl(c2)+isl(c3))

      // Check if the target cell is living or dead then apply Conway's Game of Life rules.
      if ( b2 == 'l'){
        if      ( population < 2 ){ x.push('d') }
        else if ( population > 3 ){ x.push('d') }
        else                      { x.push('l') }
      }
      else {
        if      ( population == 3 ){ x.push('l') }
        else                       { x.push('d') }
      }

    }

    // Add the newly processed row to the array containing the next generation to be displayed.
    nextGeneration.push(x)
  }

  // Display the newly generated array.
  displayArray(nextGeneration)

  // Overwrite the population array with the newly generated array.
  population = nextGeneration

  // Check if there are any living cells.
  // If not, call to show the extict array, stop the setInterval, and alert the user.
  if (array.toString().indexOf('l') == -1){
    extinctArray();
    clearInterval(repeater);
    alert('The cells are now extinct! Refresh the page to restart The Game of Life.')
  }

}



  // Create the first generation of cells
  function initArray(n = 40){
    let initArray = []
    for( let x = 0 ; x < n ; x++ ){
      let row = []
      for( let y = 0 ; y < n ; y++ ){
        row.push(randomBinary())
      }
      initArray.push(row);
    }

    displayArray(initArray)
    return initArray
  }

  // Generate an extinct array when there are no living cells
  function extinctArray(n = 40){
    let extinctArray = []
    for( let x = 0 ; x < n ; x++ ){
      let row = []
      for( let y = 0 ; y < n ; y++ ){
        row.push('e')
      }
      extinctArray.push(row)
    }

    displayArray(extinctArray)
    return extinctArray
  }


  // Take an array of cells and display them as div elements in a wrapper
  function displayArray(array){

      let wrapper = document.querySelector('.wrapper')
      wrapper.innerHTML = ""

      // Construct rows
      for ( let x = 0 ; x < array.length ; x++){

        let div = document.createElement('div')
        div.classList.add('row')
        wrapper.appendChild(div)

        let rows = document.querySelectorAll('.row')

        // Insert the cells into the rows
        for (let cell of array[x]){
          let div = document.createElement('div')
          div.classList.add(['cell'],[cell])
          rows[rows.length-1].appendChild(div)
        }
      }
  }


  // Random generation of living (l) or dead (d) cell.
  function randomBinary(){
    return ( Math.random() > 0.5 ) ? 'l' : 'd'
  }

  // Use to determine if the cell is living or dead.
  function isl(x){
    return ( x === 'l' ) ? 1 : 0
  }
