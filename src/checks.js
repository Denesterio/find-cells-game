// Проверка, загадана ли ячейка
const isCellRiddled = (state, elem) => state.tableRiddled.includes(elem);

// Проверка на выигрыш
const isWin = (state) => state.tableActive.length === state.countOfRiddledCells;

export { isCellRiddled, isWin };
