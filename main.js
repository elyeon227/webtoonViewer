// 컬럼 추가와 삭제
const btnAdd = document.querySelector('button.add');
const btnRemove = document.querySelector('button.remove');
const columnsNum = document.querySelector('.header__columns > span');
btnAdd.addEventListener('click', e => {
  const num = addColumn();
  columnsNum.innerText = num || columnsNum.innerHTML;
});
btnRemove.addEventListener('click', e => {
  const num = removeColumn();
  columnsNum.innerText = num || columnsNum.innerHTML;
});

function addColumn() {
  const table = document.querySelector('table');
  const columnCount = table.rows[0].cells.length;
  if (columnCount > 3) {
    return;
  }
  for (let i = 0; i < table.rows.length; i++) {
    const newCell = table.rows[i].insertCell(-1);
    if (i === 0) {
      newCell.innerHTML = `<button type="button" class="btn_clear">
      <i class="xi xi-trash"></i>&nbsp;Clear All
    </button>`;
    } else if (i === 1) {
      newCell.innerHTML = `<input type="text" class="viewer__title__input" placeholder="제목을 입력하세요." />`;
    } else if (i === 2) {
      newCell.innerHTML = `<label class="viewer__file" for="imgFile">
      <i class="xi xi-plus-min"></i>&nbsp;Open Images
    </label>
    <input type="file" id="imgFile" class="upload" multiple />`;
    } else if (i === 3) {
      newCell.innerHTML = `<div class="viewer__images"></div>`;
    } else if (i === 4) {
      newCell.innerHTML = `<div class="viewer__total">
      <span>Total</span>
      <span class="viewer__total__number">0</span>
    </div>`;
    }
  }
  return columnCount + 1;
}

function removeColumn() {
  const table = document.querySelector('table');
  const columnCount = table.rows[0].cells.length;
  if (columnCount < 2) {
    return;
  }
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].deleteCell(-1);
  }
  return columnCount - 1;
}
