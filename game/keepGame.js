import * as check from '../src/checks.js';

export default (state, mainState, handler, countdown, target, table) => {
  if (check.isCellRiddled(state, target)) {
    state.tableActive = [...state.tableActive, target];
  } else if (state.tableActive.length > 0) {
    state.tableActive = [];
  }
  if (check.isWin(state)) {
    clearInterval(countdown);
    table.removeEventListener('click', handler);
    state.status = 'win';
    mainState.status = 'waiting';
  }
};
