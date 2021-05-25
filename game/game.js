import riddleCells from '../src/riddleCells.js';
import startCountdown from '../src/countdown.js';
import keepGame from './keepGame.js';
import * as rf from '../src/renderFunctions.js';
import getArrDifference from '../src/arrDifference.js';
import cacheDecorator from '../src/cacheDecorator.js';

const cachedSelectorAll = cacheDecorator(document.querySelectorAll);

export default (mainState) => {
  const state = {
    // 'game' на старте
    // 'win', 'lost' в случае победы и поражения
    status: 'game',
    countOfRiddledCells: 10,
    tableRiddled: [],
    tableActive: [],
    timer: 180,
  };

  const divTimer = document.querySelector('.timer');
  const table = document.querySelector('table');
  const cells = cachedSelectorAll('td');

  // Нужны при повторном запуске игры на том же поле
  const resultDiv = document.querySelector('.result');
  if (resultDiv) resultDiv.remove();
  table.parentElement.style.marginBottom = '50px';
  rf.timerRender(state.timer, divTimer);

  rf.clearCells(cells);
  riddleCells(state, cells);

  const proxyState = new Proxy(state, {
    set(target, prop, value) {
      if (prop === 'timer' && typeof value === 'number') {
        target[prop] = value;
        rf.timerRender(value, divTimer);
        return true;
      }
      if (prop === 'tableActive') {
        if (value.length === 0) {
          rf.cellsRender(value, target[prop]);
        } else {
          rf.cellsRender(value);
        }
        target[prop] = value;
        return true;
      }
      switch (value) {
        case 'win':
          target[prop] = value;
          rf.showResult(value, table.parentElement);
          return true;
        case 'lost':
          target[prop] = value;
          const cellsNotFound = getArrDifference(target.tableRiddled, target.tableActive);
          rf.showResult(value, table.parentElement, cellsNotFound);
          return true;
        default:
          throw new Error('Unknown changes in state');
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
