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

// Вспомогательные функции для ведения игры
// Проверка, загадана ли ячейка
const isCellRiddled = (elem) => elem.hasAttribute('data-riddled');
// Показать загаданную ячейку
const makeElemActive = (elem) => {
  elem.classList.add('active');
};
// Скрыть
const makeElemInactive = (elem) => {
  elem.classList.remove('active');
};
// Ячейка загадана, но не открыта?
const isElemNotFound = (elem) =>
  elem.hasAttribute('data-riddled') && !elem.classList.contains('active');
// Показать ненайденную ячейку; также используется для окрашивания таймера, когда времени мало
const paintElemInRed = (elem) => {
  elem.classList.add('not_founded');
};
// Скрыть ненайденную ячейку; также используется для стандартного окрашивания таймера
const removeRedBackground = (elem) => {
  elem.classList.remove('not_founded');
};
// Снять выбор с загаданных ячеек
const clearRiddles = (elem) => {
  elem.removeAttribute('data-riddled');
};

// Функции для подготовки игрового поля
const getRandomNumberInRange = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

// Снимает ненужные атрибуты и классы перед началом новой игры
const clearCells = (arrWithRiddledCells) => {
  arrWithRiddledCells.forEach((cell) => {
    makeElemInactive(cell);
    clearRiddles(cell);
    removeRedBackground(cell);
  });
};

// Функция для выбора "загаданных" ячеек
// Принимает массив ячеек, число, сколько нужно выбрать, массив, куда отложить отмеченные
const riddleAndPutCells = (cells, countOfRiddled, arrToPutTo) => {
  const setForRandomNums = new Set();

  do {
    let num = getRandomNumberInRange(0, 99);
    setForRandomNums.add(num);
  } while (setForRandomNums.size < countOfRiddled);

  const arrForRandomNums = [...setForRandomNums];
  for (let i = 0; i < countOfRiddled; ++i) {
    cells[arrForRandomNums[i]].setAttribute('data-riddled', 'riddled');
    arrToPutTo.push(cells[arrForRandomNums[i]]);
  }
};

// Создание и привязывание таблицы
const button = document.querySelector('#button');
const divForTable = document.getElementById('for_table');
const tableForGame = generateTable(10, 10);
divForTable.append(tableForGame);
const divForTimer = document.querySelector('.timer');
const riddledCells = []; // Для ячеек, которые "загадал" компьютер

// Начало игры
button.addEventListener('click', function startGame() {
  // Подготовка игрового поля
  const cells = [...tableForGame.querySelectorAll('td')];
  const countOfRiddledCells = 10;
  clearCells(riddledCells);
  riddleAndPutCells(cells, countOfRiddledCells, riddledCells);

  // Функция для создания и ведения игры
  const createGame = (countOfRiddled) => {
    let activeCells = [];
    const isWin = () => activeCells.length === countOfRiddled;

    const keepActiveCells = (event) => {
      const targetCell = event.target;

      if (isCellRiddled(targetCell)) {
        makeElemActive(targetCell);
        activeCells.push(targetCell);
      } else if (activeCells.length > 0) {
        activeCells.forEach((cell) => makeElemInactive(cell));
        activeCells = [];
      }
      if (isWin()) {
        setTimeout(function () {
          alert('Yeeehooo!!! You win! It was not easy, really?');
        }, 50);
        clearInterval(countdown);
        tableForGame.removeEventListener('click', keepGame);
        button.addEventListener('click', startGame);
      }
    };

    return keepActiveCells;
  };

  // Установка таймера
  let timeInSeconds = 180;
  const timerToString = (timeInSeconds) => {
    let minutes, seconds, text;
    minutes = String(Math.floor(timeInSeconds / 60));
    seconds = String(timeInSeconds % 60);
    text = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    return text;
  };

  divForTimer.textContent = timerToString(timeInSeconds);
  removeRedBackground(divForTimer);
  makeElemActive(divForTimer);

  const startCountdown = (div) => {
    timeInSeconds -= 1;
    div.textContent = timerToString(timeInSeconds);
    if (timeInSeconds <= 30) {
      paintElemInRed(div);
    }
    if (timeInSeconds === 0) {
      clearInterval(countdown);
      setTimeout(() => alert('You are lost:( Play again?'));
      riddledCells
        .filter((cell) => isElemNotFound(cell))
        .forEach((cell) => paintElemInRed(cell));

      tableForGame.removeEventListener('click', keepGame);
      button.addEventListener('click', startGame);
    }
  };

  const countdown = setInterval(startCountdown, 1000, divForTimer);

  //Создаем игру
  const keepGame = createGame(countOfRiddledCells);
  tableForGame.addEventListener('click', keepGame);
  button.removeEventListener('click', startGame);
});
