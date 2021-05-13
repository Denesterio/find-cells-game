import { getElemsNotFound } from './checks.js';
import texts from '../texts/texts.js';

// Показать загаданную ячейку
const makeElemActive = (elem) => elem.classList.add('active');

// Скрыть
const makeElemInactive = (elem) => elem.classList.remove('active');

// Скрыть ненайденную ячейку;
// также используется для стандартного окрашивания таймера
const removeRedBackground = (elem) => elem.classList.remove('not_founded');

// Показать ненайденную ячейку;
// также используется для окрашивания таймера, когда времени мало
const paintElemInRed = (elem) => elem.classList.add('not_founded');

// Снимает ненужные атрибуты и классы перед началом новой игры
const clearCells = (cells) => {
  cells.forEach((cell) => {
    makeElemInactive(cell);
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
const showResult = (parent, result) => {
  const div = document.createElement('div');
  div.textContent = texts[result];
  div.classList.add('result');
  parent.append(div);
  parent.style.marginBottom = '20px';
};

const tableRender = (state, value, table) => {
  if (value === 'right') {
    state.table.active.forEach((elem) => makeElemActive(elem));
  } else if (value === 'wrong') {
    state.table.riddled.forEach((elem) => makeElemInactive(elem));
  } else {
    showResult(table.parentElement, value);
    getElemsNotFound(state).forEach((elem) => paintElemInRed(elem));
  }
};

export {
  makeElemActive,
  makeElemInactive,
  removeRedBackground,
  paintElemInRed,
  clearCells,
  timerRender,
  tableRender,
};
