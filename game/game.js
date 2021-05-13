import riddleCells from '../src/riddleCells.js';
import startCountdown from '../src/countdown.js';
import keepGame from './keepGame.js';
import * as rf from '../src/renderFunctions.js';

export default (mainState, table, divTimer) => {
  const state = {
    // 'game' на старте
    // 'win', 'lost' в случае победы и поражения
    status: 'game',
    countOfRiddledCells: 10,
    table: {
      riddled: [],
      active: [],
    },
    timer: 180,
    lastClick: 'right',
  };

  // Нужны при повторном запуске игры на том же поле
  const resultDiv = document.querySelector('.result');
  if (resultDiv) resultDiv.remove();
  table.parentElement.style.marginBottom = '50px';
  rf.timerRender(state.timer, divTimer);

  const cells = table.querySelectorAll('td');
  rf.clearCells(cells);
  riddleCells(state, cells);

  const proxyState = new Proxy(state, {
    set(target, prop, value) {
      if (prop === 'timer' && typeof value === 'number') {
        target[prop] = value;
        rf.timerRender(value, divTimer);
        return true;
      }
      switch (value) {
        case 'right':
        case 'wrong':
        case 'win':
        case 'lost':
          target[prop] = value;
          rf.tableRender(target, value, table);
          return true;
      }
    },
  });

  const gameHandler = ({ target }) => {
    if (target.tagName !== 'TD') return;
    keepGame(proxyState, mainState, gameHandler, countdown, target, table);
  };

  const countdown = setInterval(function () {
    startCountdown(proxyState, mainState, countdown, gameHandler, table);
  }, 1000);

  table.addEventListener('click', gameHandler);
};
