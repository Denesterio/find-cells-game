import generateTable from '../src/generateTable.js';
import startGame from './game.js';

export default () => {
  const state = {
    // 'waiting' между играми
    // 'gameStarted' во время игры
    status: 'waiting',
    table: {
      rows: 10,
      columns: 10,
    },
  };

  // Создание и привязывание таблицы
  const button = document.querySelector('#button');
  const divForTable = document.querySelector('.for_table');
  const tableForGame = generateTable(state.table.rows, state.table.columns);
  divForTable.append(tableForGame);

  const stateWatcher = new Proxy(state, {
    set(target, prop, value) {
      switch (value) {
        case 'gameStarted':
          target[prop] = value;
          button.setAttribute('disabled', 'true');
          return true;
        case 'waiting':
          target[prop] = value;
          button.removeAttribute('disabled');
          return true;
        default:
          throw new Error('Unknown changes in state');
      }
    },
  });

  button.addEventListener('click', () => {
    stateWatcher.status = 'gameStarted';
    startGame(stateWatcher);
  });
};
