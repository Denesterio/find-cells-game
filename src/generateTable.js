export default (rows, cols) => {
  const table = document.createElement('table');
  for (let i = 1; i <= rows; i++) {
    const tr = document.createElement('tr');

    for (let j = 1; j <= cols; ++j) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
};
