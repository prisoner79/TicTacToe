const boxes = document.querySelectorAll(".box");
const gameainfo = document.querySelector(".game-info");
const nweGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let crete a function to start the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui empty 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green colour
        box.classList = `box box${index+1}`;
    });
    nweGameBtn.classList.remove("active");
    gameainfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "o";
    }
    else {
        currentPlayer = "X";
    }
    // ui update
    gameainfo.innerText = `Current Player - ${currentPlayer}`;
};

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {

        // all 3box are not empty and same value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== ""
        ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

            // check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            // disable pointer event

            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";
            })
            // now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // we have a winnwer

    if(answer !== "" ) {
        gameainfo.innerText = `Winner Player - ${answer}`;
        nweGameBtn.classList.add('active');
        return;
    }

    // let check draw match
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
        fillCount++;
    })
    // all box fill
    if(fillCount === 9) {
        gameainfo.innerText = "Game Draw !";
        nweGameBtn.classList.add("active");
    }


};


function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn new player
        swapTurn();

        // check game over
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

nweGameBtn.addEventListener("click", initGame);