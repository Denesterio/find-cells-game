// Функции для подготовки игрового поля
const getRandomNumberInRange = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

// Функция для выбора "загаданных" ячеек
// Принимает массив ячеек таблицы, состояние
export default (state, cells) => {
  const setForRandomNums = new Set();

  do {
    let num = getRandomNumberInRange(0, cells.length - 1);
    setForRandomNums.add(num);
  } while (setForRandomNums.size < state.countOfRiddledCells);

  const arrForRandomNums = [...setForRandomNums];
  arrForRandomNums.forEach((i) => {
    state.table.riddled.push(cells[i]);
  });
};
