import texts from '../texts/texts.js';

// Показать загаданную ячейку
const makeElemActive = (elem) => elem.classList.add('active');

// Скрыть
const makeElemInActive = (elem) => elem.classList.remove('active');

// Скрыть ненайденную ячейку;
// также используется для стандартного окрашивания таймера
const removeRedBackground = (elem) => elem.classList.remove('not_founded');

// Показать ненайденную ячейку;
// также используется для окрашивания таймера, когда времени мало
const paintElemInRed = (elem) => elem.classList.add('not_founded');

// Снимает ненужные атрибуты и классы перед началом новой игры
const clearCells = (cells) => {
  cells.forEach((cell) => {
    makeElemInActive(cell);
    removeRedBackground(cell);
  });
};

//Перевод секунд в форматированную строку для таймера
const timerToString = (timeInSeconds) => {
  let minutes, seconds;
  minutes = String(Math.floor(timeInSeconds / 60));
  seconds = String(timeInSeconds % 60);
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

const timerRender = (value, container) => {
  container.textContent = timerToString(value);
  if (value <= 30) {
    paintElemInRed(container);
  } else {
    makeElemActive(container);
  }
};

// Показать div с результатом по завершении игры
const showResult = (result, parent, cells = []) => {
  const div = document.createElement('div');
  div.textContent = texts[result];
  div.classList.add('result');
  parent.append(div);
  parent.style.marginBottom = '20px';
  cells.forEach((elem) => paintElemInRed(elem));
};

const cellsRender = (cellsActive, cellsInActive = []) => {
  cellsActive.forEach((elem) => makeElemActive(elem));
  cellsInActive.forEach((elem) => makeElemInActive(elem));
};

export { clearCells, timerRender, showResult, cellsRender };
