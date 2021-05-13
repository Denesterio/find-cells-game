export default (state, mainState, timerId, gHandler, table) => {
  state.timer = state.timer - 1;
  if (state.timer === 0) {
    clearInterval(timerId);
    state.status = 'lost';
    mainState.status = 'waiting';
    table.removeEventListener('click', gHandler);
  }
};
