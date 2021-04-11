'use strict';

const button = document.querySelector('#button');
const divForTable = document.getElementById('for_table');

function tableGenerator(rows, cols) {
  const table = document.createElement('table');
  for (let i = 1; i <= rows; i++) {
    let tr = document.createElement('tr');

    for (let j = 1; j <= cols; ++j) {
      let td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

const tableForGame = tableGenerator(10, 10);
divForTable.append(tableForGame);

let tds = tableForGame.querySelectorAll('td');
tds = Array.from(tds);

function getRandom(min, max) {
  // получение случайного числа в диапазоне
  return min + Math.floor(Math.random() * (max - min + 1));
}

button.addEventListener('click', function bigGame() {
  for (let cell of tds) {
    cell.classList.remove('active');
    cell.removeAttribute('data-active');
    cell.classList.remove('not_founded');
  }

  let counter = 0;
  const setForRandomNums = new Set();

  do {
    let num = getRandom(0, 99);
    setForRandomNums.add(num);
  } while (setForRandomNums.size < 10);

  const arrForRandomNums = Array.from(setForRandomNums);
  for (let i = 0; i < 10; ++i) {
    tds[arrForRandomNums[i]].setAttribute('data-active', 'active');
  }

  function game(event) {
    const target = event.target;
    if (target.dataset.active) {
      target.classList.add('active');
      counter += 1;
    } else {
      for (let cell of tds) {
        if (cell.classList.contains('active')) {
          cell.classList.remove('active');
          counter = 0;
        }
      }
    }
    if (counter === 10) {
      setTimeout(function () {
        alert('Yeeehooo!!! You win! It was not easy, really?');
      }, 100);
      clearTimeout(timer);
      tableForGame.removeEventListener('click', game);
      button.addEventListener('click', bigGame);
    }
  }

  tableForGame.addEventListener('click', game);

  const timer = setTimeout(() => {
    alert('You are lost:( Play again?');
    for (let cell of tds) {
      if (
        cell.hasAttribute('data-active') &&
        !cell.classList.contains('active')
      ) {
        cell.classList.add('not_founded');
      }
    }
    tableForGame.removeEventListener('click', game);
    button.addEventListener('click', bigGame);
  }, 300000);

  button.removeEventListener('click', bigGame);
});
