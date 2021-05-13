import riddleCells from '../src/riddleCells.js';
import startCountdown from '../src/countdown.js';
import * as check from '../src/checks.js';
import * as rf from '../src/renderFunctions.js';

export default (mainState, table, divTimer, button) => {
  const state = {
    // 'game' на старте
    // 'win', 'lost' в случае победы и поражения
    status: 'game',
    countOfRiddledCells: 10,
    table: {
      riddled: [],
      active: [],
    },
    timer: {
      time: 180,
      // 'safe' времени больше 30 секунд
      // 'danger', времени 30 сек. и меньше
      // 'expired' таймер истек
      status: 'safe',
    },
    texts: {
      win: 'Yeeehooo!!! You win! It was not easy, really?',
      lost: 'You are lost:( Play again?',
    },
  };

  button.setAttribute('disabled', 'true');
  const cells = table.querySelectorAll('td');
  riddleCells(state, mainState, cells);

  const resultDiv = document.querySelector('.result');
  if (resultDiv) resultDiv.remove();
  table.parentElement.style.marginBottom = '50px';

  // Нужны при повторном запуске игры на том же поле
  rf.tableRender(state, table, button);
  rf.timerRender(state, divTimer);

  const countdown = setInterval(function () {
    startCountdown(state, countdown, rf.tableRender, table, button);
    rf.timerRender(state, divTimer);
  }, 1000);

  table.addEventListener('click', function func({ target }) {
    if (target.tagName !== 'TD') return;
    if (check.isCellRiddled(state, target)) {
      state.table.active.push(target);
      rf.tableRender(state, table, button);
    } else if (state.table.active.length > 0) {
      state.table.active = [];
      rf.tableRender(state, table, button);
    }
    if (check.isWin(state)) {
      clearInterval(countdown);
      state.status = 'win';
      rf.tableRender(state, table, button);
      table.removeEventListener('click', func);
    }
  });
};
