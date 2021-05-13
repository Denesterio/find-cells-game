import { getElemsNotFound } from './checks.js';

//Перевод секунд в форматированную строку для таймера
const timerToString = (timeInSeconds) => {
  let minutes, seconds, text;
  minutes = String(Math.floor(timeInSeconds / 60));
  seconds = String(timeInSeconds % 60);
  text = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return text;
};

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
const clearCells = (state) => {
  state.table.riddled.forEach((cell) => {
    makeElemInactive(cell);
    removeRedBackground(cell);
  });
};

// Показать div с результатом по завершении игры
const showResult = (state, parent, result) => {
  const div = document.createElement('div');
  div.textContent = state.texts[result];
  div.classList.add('result');
  parent.append(div);
  parent.style.marginBottom = '20px';
};

const timerRender = (state, container) => {
  container.textContent = timerToString(state.timer.time);
  if (state.timer.status === 'danger') {
    paintElemInRed(container);
  } else {
    makeElemActive(container);
  }
};

const tableRender = (state, table, button) => {
  if (state.status === 'game') {
    state.table.riddled.forEach((elem) => makeElemInactive(elem));
    state.table.active.forEach((elem) => makeElemActive(elem));
  } else {
    showResult(state, table.parentElement, state.status);
    button.removeAttribute('disabled');
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
