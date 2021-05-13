const getArrDifference = (arr1, arr2) => {
  return arr1.filter((item) => !arr2.includes(item));
};

// Проверка, загадана ли ячейка
const isCellRiddled = (state, elem) => state.table.riddled.includes(elem);

// Ячейка загадана, но не открыта?
const getElemsNotFound = (state) => getArrDifference(state.table.riddled, state.table.active);

// Проверка на выигрыш
const isWin = (state) => state.table.active.length === state.countOfRiddledCells;

export { isCellRiddled, getElemsNotFound, isWin };
