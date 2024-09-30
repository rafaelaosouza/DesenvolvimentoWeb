// **** Board ****
const rows = 5;
const cols = 11;
const board = document.getElementById('board');
createBoard(rows, cols);

function createBoard(rows, cols) {
    const cells = rows * cols;
    
    for (let i = 0; i < cells; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        board.appendChild(cell);
    }
}
// **** Fim Board ****


// **** Peças ****
const partsMap = [
    {
        id: 1,
        color: 'red',
        // Formato de "T"
        coords: [[0, 1], [1, 1], [1, 0], [2, 1]]
    },
    {
        id: 1,
        color: 'red',
        // Formato de "T"
        coords: [[1, 0], [1, 1], [0, 1], [1, 2]]
    },
    {
        id: 2,
        color: 'blue',
        // Retangular de 4 peças
        coords: [[0, 0], [0, 1], [0, 2], [0, 3]]
    },
    {
        id: 2,
        color: 'blue',
        // Retangular de 4 peças
        coords: [[0, 0], [1, 0], [2, 0], [3, 0]]
    },
    {
        id: 3,
        color: 'green',
        // Quadrada de 4 peças
        coords: [[0, 0], [0, 1], [1, 0], [1, 1]]
    },
    {
        id: 4,
        color: 'orange',
        // Retangular de 5 peças
        coords: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]
    },
];
const partsContainer = document.getElementById('parts');

partsMap.forEach(part => {
    const partDiv = createPartDiv(part);
    partsContainer.appendChild(partDiv);
});

function createPartDiv(part) {
    const partDiv = document.createElement('div');
    partDiv.className = 'part';

    renderCells(part, partDiv);
    
    return partDiv;
}

function renderCells(part, partDiv) {
    partDiv.innerHTML = ''; 
    const coords = part.coords;

    const maxRow = getMaxRow(coords);
    const maxCol = getMaxCol(coords);
    
    partDiv.style.gridTemplateRows = `repeat(${maxRow}, 60px)`;
    partDiv.style.gridTemplateColumns = `repeat(${maxCol}, 60px)`;
    
    coords.forEach(coord => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.backgroundColor = part.color;
        cell.style.gridRowStart = coord[0] + 1;
        cell.style.gridColumnStart = coord[1] + 1;
        partDiv.appendChild(cell);
    });

    addRotateButton(part, partDiv);
}

function addRotateButton(part, partDiv) {
    const rotateButton = document.createElement('button');
    rotateButton.className = 'rotate-button';
    rotateButton.innerText = 'Rotate';
    partDiv.appendChild(rotateButton);

    rotateButton.addEventListener('click', () => {
        part.coords = rotateCoords(part.coords);
        renderCells(part, partDiv);
    });
}

function getMaxRow(coords) {
    let maxRow = 0;
    for (let i = 0; i < coords.length; i++) {
        if (coords[i][0] > maxRow) {
            maxRow = coords[i][0];
        }
    }
    // soma 1 porque o grid do css começa em 1 e o array em 0
    return maxRow + 1;
}

function getMaxCol(coords) {
    let maxCol = 0;
    for (let i = 0; i < coords.length; i++) {
        if (coords[i][1] > maxCol) {
            maxCol = coords[i][1];
        }
    }
    // soma 1 porque o grid do css começa em 1 e o array em 0
    return maxCol + 1;
}

function rotateCoords(coords) {
    // inverte as colunas com as linhas
    for (let i = 0; i < coords.length; i++) {
        const row = coords[i][0];
        const col = coords[i][1];
        coords[i][0] = col;
        coords[i][1] = row;
    }

    return coords;
}
// **** Fim Peças ****