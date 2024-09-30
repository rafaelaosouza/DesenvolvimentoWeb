let piecesOnBoard = [];
let selectedPiece = null;

function createBoard(rows, cols) {
    const board = document.getElementById('board');
    board.innerHTML = ''; 
    board.rows = rows;
    board.cols = cols;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-id', `${i}-${j}`);
            cell.addEventListener('click', function() {
                if (selectedPiece) {
                    addPieceToCell(i, j);
                } else if (cell.style.backgroundColor) {
                    removePieceToCell(i, j);
                    
                }
            });
            board.appendChild(cell);
        }
    }
}

function addPieceToCell(row, col) {
    let shape = selectedPiece.shape;
    shape = removeRowOrColEmpty(shape);
    const canAdd = canAddPieceToCell(row, col, shape);
    pieceShapeColLength = shape[0].length;
    pieceShapeRowLength = shape.length;
    let i2 = 0;
    if (canAdd) {
        const pieceCells = []; 
        for (let i = row; (i < board.rows && i2 < pieceShapeRowLength); i++) {
            let j2 = 0;
            for (let j = col; (j < board.cols && j2 < pieceShapeColLength); j++) {
                if (shape[i2][j2]) {
                    const cell = document.querySelector(`[data-id="${i}-${j}"]`);
                    if (cell) {
                        cell.style.backgroundColor = selectedPiece.color;
                        pieceCells.push([i, j]);
                        const selectedPieceDiv = document.getElementById(selectedPiece.id);
                        if (selectedPieceDiv) {
                            selectedPieceDiv.remove();
                        }

                    }
                }
                j2++;
            }
            i2++;
        }
        piecesOnBoard.push({ pieceId: selectedPiece.id, cells: pieceCells });
        selectedPiece = null;
    }
}


function removePieceToCell(row, col) {
    let pieceToRemoveOnBoard = verifyIfPieceIsPresent(row, col);
    cellsToRemove = pieceToRemoveOnBoard.cells;
    if(cellsToRemove) { 
        for(let i = 0; i < cellsToRemove.length; i++){
            let cell = document.querySelector(`[data-id="${cellsToRemove[i][0]}-${cellsToRemove[i][1]}"]`);
            if(cell.style.backgroundColor){
                cell.style.backgroundColor = '';
                let pieceIndex = piecesOnBoard.findIndex(piece => 
                    piece.cells.some(([r, c]) => r === cellsToRemove[i][0] && c === cellsToRemove[i][1])
                );
                if (pieceIndex !== -1) {
                    piecesOnBoard[pieceIndex].cells = piecesOnBoard[pieceIndex].cells.filter(([r, c]) => 
                        !(r === cellsToRemove[i][0] && c === cellsToRemove[i][1])
                    );
                    if (piecesOnBoard[pieceIndex].cells.length === 0) {
                        piecesOnBoard.splice(pieceIndex, 1);
                    }
                }
            }
        }
        const selectedPieceDiv = document.getElementById(piecesOnBoard.id);
        if (selectedPieceDiv) {
            selectedPieceContainer.appendChild(selectedPieceDiv);
        }
        const index = piecesOnBoard.findIndex(piece => piece.pieceId === pieceToRemoveOnBoard.pieceId);
        if (index !== -1) {l
            piecesOnBoard.splice(index, 1);
          }
        renderPieces();

    }
}

function verifyIfPieceIsPresent(row, col) {
    let foundCells = null;
    for (let i = 0; i < piecesOnBoard.length; i++) {
        let pieceCells = piecesOnBoard[i].cells;
        for(let j = 0; j < pieceCells.length; j++){
            if (pieceCells[j][0] === row && pieceCells[j][1] === col) {
                foundCells = piecesOnBoard[i]; 
                return foundCells;
            }
        }
    }
    return false
}

function removeRowOrColEmpty(shape){
    const filteredRows = shape.filter(row => row.some(cell => cell !== 0));
    let colsToKeep = [];
    for (let col = 0; col < filteredRows[0].length; col++) {
        let hasNonZero = false;
        for (let row = 0; row < filteredRows.length; row++) {
            if (filteredRows[row][col] !== 0) {
                hasNonZero = true;
                break;
            }
        }
        if (hasNonZero) {
            colsToKeep.push(col);
        }
    }
    const newShape = filteredRows.map(row => colsToKeep.map(col => row[col]));
    return newShape;
}

function canAddPieceToCell(row, col) {
    let shape = selectedPiece.shape;
    shape = removeRowOrColEmpty(shape)
    pieceShapeColLength = shape[0].length;
    pieceShapeRowLength = shape.length;
    if(pieceShapeRowLength + row > board.rows || pieceShapeColLength + col > board.cols) {
        return false;
    }
    let i2 = 0;
    for (let i = row; (i <= board.rows && i2<pieceShapeRowLength); i++) {
        let j2 = 0;
        for (let j = col; (j <=  board.cols && j2<pieceShapeColLength); j++) {
            if (shape[i2][j2]) {
                const cell = document.querySelector(`[data-id="${i}-${j}"]`);
                if (cell) {
                    if(cell.style.backgroundColor){
                        return false;
                    }
                }
            }
            j2++;
        }
        i2++;
    }
    return true;
}

createBoard(5, 11);

const pieces = [
    {
        id: '1',
        color: 'pink',
        shape: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0]
        ]
    },
    {
        id: '2',
        color: 'white',
        shape: [
            [0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '3',
        color: 'yellow',
        shape: [
            [1, 1, 0, 0, 0], 
            [0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '4',
        color: 'orange',
        shape: [
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '5',
        color: 'purple',
        shape: [
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '6',
        color: 'red',
        shape: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0], 
            [1, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '7',
        color: 'rgb(83, 141, 181)',
        shape: [
            [1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0], 
            [1, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '8',
        color: 'gray',
        shape: [
            [0, 1, 0, 0, 0],
            [1, 1, 1, 0, 0], 
            [0, 1, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '9',
        color: 'rgb(221, 59, 172)',
        shape: [
            [1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0], 
            [0, 0, 1, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0]
        ]
    },
    {
        id: '10',
        color: 'blue',
        shape: [
            [0, 0, 0, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0] 
        ]
    },
    {
        id: '11',
        color: 'rgb(143, 196, 121)',
        shape: [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0] 
        ]
    },
    {
        id: '12',
        color: 'green',
        shape: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0], 
            [1, 1, 0, 0, 0], 
            [1, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0] 
        ]
    }
];

function renderPieces() {
    const piecesContainer = document.getElementById('pieces-container');
    piecesContainer.innerHTML = '';
    pieces.forEach(piece => {
        if(!piecesOnBoard.some(p => p.pieceId === piece.id)){
            const pieceDiv = document.createElement('div');
            pieceDiv.className = 'piece';
            pieceDiv.setAttribute('draggable', true);
            pieceDiv.id = piece.id;

            pieceDiv.addEventListener('click', function() {
                displaySelectedPiece(piece);
            });

            renderPieceShape(piece, pieceDiv);
            piecesContainer.appendChild(pieceDiv);
        }
    });
}

function displaySelectedPiece(piece) {
    const selectedPieceContainer = document.getElementById('selected-piece-container');
        selectedPieceContainer.innerHTML = '';
        selectedPieceDiv = document.createElement('div');
        selectedPieceDiv.className = 'piece';
        selectedPieceDiv.id = piece.id;

        renderPieceShape(piece, selectedPieceDiv);
        selectedPieceContainer.appendChild(selectedPieceDiv);
        selectedPiece = piece;
}

function renderPieceShape(piece, pieceDiv) {
    pieceDiv.innerHTML = '';
    const shape = piece.shape;
    shape.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'piece-row';
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            if (cell) {
                cellDiv.style.backgroundColor = piece.color;
            } else {
                cellDiv.style.backgroundColor = 'transparent';
            }
            rowDiv.appendChild(cellDiv);
        });
        pieceDiv.appendChild(rowDiv);
    });
}

function rotateSelectedPiece() {
    if (selectedPiece) {
        const rotatedShape = selectedPiece.shape[0].map((_, index) =>
            selectedPiece.shape.map(row => row[index]).reverse()
        );
        selectedPiece.shape = rotatedShape;
        displaySelectedPiece(selectedPiece);
    }
}

document.getElementById('rotate-button').addEventListener('click', function() {
    if (selectedPiece) {
        rotateSelectedPiece(selectedPiece);
        const piecesContainer = document.getElementById('pieces-container');
        piecesContainer.innerHTML = '';
        renderPieces();
    }
});
document.getElementById('remove-button').addEventListener('click', function() {
    if (selectedPiece) {
        const selectedPieceContainer = document.getElementById('selected-piece-container');
        selectedPieceContainer.innerHTML = '';
        selectedPiece = null;
    }
});

renderPieces(); 