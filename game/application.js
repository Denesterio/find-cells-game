import { clearCells } from '../src/renderFunctions.js';
import generateTable from '../src/generateTable.js';
import startGame from './game.js';
import { timerRender } from '../src/renderFunctions.js';

export default () => {
  const state = {
    table: {
      rows: 10,
      columns: 10,
      riddled: [],
    },
    timer: {
      time: 180,
      status: 'safe',
    },
  };

  // Создание и привязывание таблицы
  const button = document.querySelector('#button');
  const divForTable = document.querySelector('.for_table');
  const tableForGame = generateTable(state.table.rows, state.table.columns);
  divForTable.append(tableForGame);
  const divForTimer = document.querySelector('.timer');

  timerRender(state, divForTimer);

  button.addEventListener('click', () => {
    clearCells(state);
    state.table.riddled = [];
    startGame(state, tableForGame, divForTimer, button);
  });
};
