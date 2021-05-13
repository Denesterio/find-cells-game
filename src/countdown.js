export default (state, timerId, render, table, button) => {
  state.timer.time -= 1;
  if (state.timer.time <= 30) {
    state.timer.status = 'danger';
  }
  if (state.timer.time === 0) {
    clearInterval(timerId);
    state.status = 'lost';
    state.timer.status = 'expired';
    render.call(this, state, table, button);
  }
};
