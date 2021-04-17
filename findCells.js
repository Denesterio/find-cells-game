'use strict';

const generateTable = (rows, cols) => {
  const table = document.createElement('table');
  for (let i = 1; i <= rows; i++) {
    const tr = document.createElement('tr');

    for (let j = 1; j <= cols; ++j) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
};

// Создание и привязывание таблицы
const button = document.querySelector('#button');
const divForTable = document.getElementById('for_table');
const tableForGame = generateTable(10, 10);
divForTable.append(tableForGame);

// Функции для подготовки игрового поля
const getRandomNumberInRange = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const clearCells = (cells) => {
  for (const cell of cells) {
    cell.classList.remove('active');
    cell.removeAttribute('data-riddled');
    cell.classList.remove('not_founded');
  }
};

const riddleAndPutCells = (cells, countOfRiddled, arrToPutTo) => {
  const setForRandomNums = new Set();

  do {
    let num = getRandomNumberInRange(0, 99);
    setForRandomNums.add(num);
  } while (setForRandomNums.size < countOfRiddled);

  const arrForRandomNums = [...setForRandomNums];
  for (let i = 0; i < countOfRiddled; ++i) {
    cells[arrForRandomNums[i]].setAttribute('data-riddled', 'active');
    arrToPutTo.push(cells[arrForRandomNums[i]]);
  }
};

// Начало игры
button.addEventListener('click', function startGame() {
  // Подготовка игрового поля
  const cells = [...tableForGame.querySelectorAll('td')];
  const countOfRiddledCells = 10;
  const riddledCells = [];
  clearCells(cells);
  riddleAndPutCells(cells, countOfRiddledCells, riddledCells);

  // Вспомогательные функции для ведения игры
  const isCellRiddled = (cell) => cell.hasAttribute('data-riddled');
  const makeCellactive = (cell) => {
    cell.classList.add('active');
  };
  const makeCellInactive = (cell) => {
    cell.classList.remove('active');
  };
  const isCellNotFound = (cell) =>
    cell.hasAttribute('data-riddled') && !cell.classList.contains('active');

  // Функция для создания и ведения игры
  const createGame = (countOfRiddled) => {
    let counter = 0;
    let activeCells = [];
    const isWin = () => counter === countOfRiddled;

    const keepActiveCells = (event) => {
      const targetCell = event.target;

      if (isCellRiddled(targetCell)) {
        makeCellactive(targetCell);
        counter += 1;
        activeCells.push(targetCell);
      } else {
        activeCells.forEach((cell) => makeCellInactive(cell));
        activeCells = [];
        counter = 0;
      }
      if (isWin()) {
        setTimeout(function () {
          alert('Yeeehooo!!! You win! It was not easy, really?');
        }, 100);
        clearTimeout(timer);
        tableForGame.removeEventListener('click', keepGame);
        button.addEventListener('click', startGame);
      }
    };

    return keepActiveCells;
  };

  const timer = setTimeout(() => {
    alert('You are lost:( Play again?');
    for (const cell of riddledCells) {
      if (isCellNotFound(cell)) {
        cell.classList.add('not_founded');
      }
    }
    tableForGame.removeEventListener('click', keepGame);
    button.addEventListener('click', startGame);
  }, 180000);

  //Создаем игру
  const keepGame = createGame(countOfRiddledCells);
  tableForGame.addEventListener('click', keepGame);
  button.removeEventListener('click', startGame);
});
