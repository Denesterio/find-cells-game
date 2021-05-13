import * as check from '../src/checks.js';

export default (state, mainState, handler, countdown, target, table) => {
  if (check.isCellRiddled(state, target)) {
    state.table.active.push(target);
    state.lastClick = 'right';
  } else if (state.table.active.length > 0) {
    state.table.active = [];
    state.lastClick = 'wrong';
  }
  if (check.isWin(state)) {
    clearInterval(countdown);
    table.removeEventListener('click', handler);
    state.status = 'win';
    mainState.status = 'waiting';
  }
};
