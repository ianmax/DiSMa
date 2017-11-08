function sort(ascending, columnClassName, tableId) {
  var tbody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  let rows = tbody.getElementsByTagName('tr');
  let unsorted = true;
  while (unsorted) {
    unsorted = false;
    for (var r = 0; r < rows.length - 1; r++) {
      var row = rows[r];
      var nextRow = rows[r + 1];
      var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
      var nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;
      value = value.replace(',', '.');
      nextValue = nextValue.replace(',', '.');

      if (!isNaN(value)) {
        value = parseFloat(value);
        nextValue = parseFloat(nextValue);
      }

      if (ascending ? value > nextValue : value < nextValue) {
        tbody.insertBefore(nextRow, row);
        unsorted = true;
      }
    }
  }
};

module.exports = sort;
