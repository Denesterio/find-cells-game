import { clearCells } from '../src/renderFunctions.js';
import generateTable from '../src/generateTable.js';
import startGame from './game.js';
import { timerRender } from '../src/renderFunctions.js';

export default () => {
  const state = {
    // 'waiting' между играми
    // 'gameStarted' во время игры
    status: 'waiting',
    table: {
      rows: 10,
      columns: 10,
      riddled: [],
    },
    timer: 180,
  };

  // Создание и привязывание таблицы
  const button = document.querySelector('#button');
  const divForTable = document.querySelector('.for_table');
  const tableForGame = generateTable(state.table.rows, state.table.columns);
  divForTable.append(tableForGame);
  const divForTimer = document.querySelector('.timer');

  const stateWatcher = new Proxy(state, {
    set(target, prop, value) {
      switch (value) {
        case 'gameStarted':
          target[prop] = value;
          clearCells(target);
          button.setAttribute('disabled', 'true');
          return true;
        case 'waiting':
          target[prop] = value;
          button.removeAttribute('disabled');
          return true;
      }
    },
  });

  timerRender(stateWatcher.timer, divForTimer);

  button.addEventListener('click', () => {
    stateWatcher.status = 'gameStarted';
    state.table.riddled = [];
    startGame(stateWatcher, tableForGame, divForTimer);
  });
};
