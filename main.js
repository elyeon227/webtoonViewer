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
      newCell.innerHTML = `<input type="text" class="viewer__title__input" placeholder="제목을 입력하세요." />`;
    } else if (i === 1) {
      newCell.innerHTML = `<label class="viewer__file viewer__file_${
        columnCount + 1
      }" for="imgFile_${columnCount + 1}">
      <i class="fa fa-plus"></i>&nbsp;Open Images
    </label>
    <input type="file" id="imgFile_${columnCount + 1}" name="image_${
        columnCount + 1
      }" class="upload" multiple />
    <button type="button" class="remove btn_clear btn_clear_${columnCount + 1} hide">
      <i class="fa fa-trash-can"></i>&nbsp;Clear All
    </button>`;
    } else if (i === 2) {
      newCell.innerHTML = `<ul class="viewer__images viewer__images_${columnCount + 1}"></ul>`;
    } else if (i === 3) {
      newCell.innerHTML = `<div class="viewer__total viewer__total_${columnCount + 1} hide">
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

// 이미지 추가
const table = document.querySelector('table');
table.addEventListener('change', e => {
  if (e.target.classList.contains('upload')) {
    const cellIndex = e.target.closest('td').cellIndex;
    logImagesData([...e.target.files], cellIndex);
  }
});
// 이미지 삭제
table.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) {
    const cellIndex = e.target.closest('td').cellIndex;
    const ul = document.querySelector(`ul.viewer__images_${cellIndex + 1}`);
    const inputFile = document.querySelector(`#imgFile_${cellIndex + 1}`);
    const imgNum = document.querySelector(`.viewer__total_${cellIndex + 1}`);
    const uploadFile = document.querySelector(`.viewer__file_${cellIndex + 1}`);
    const btnClear = document.querySelector(`.btn_clear_${cellIndex + 1}`);
    ul.innerHTML = '';
    ul.style = '';
    inputFile.value = '';

    imgNum.lastElementChild.innerHTML = '0';
    imgNum.classList.add('hide');
    btnClear.classList.add('hide');
    uploadFile.classList.remove('hide');
  }
});

function createElement(src, file) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('data-file', file.name);
  img.setAttribute('title', file.name);
  li.appendChild(img);

  return li;
}

const reader = file =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    const arr = [fr, file];
    fr.onload = () => resolve(arr);
    fr.onerror = err => reject(err);
    fr.readAsDataURL(file);
  });

async function logImagesData(fileList, cellIndex) {
  let fileResults = [];
  const frPromises = fileList.map(reader);

  try {
    fileResults = await Promise.all(frPromises);
  } catch (err) {
    console.error(err);
    return;
  }

  fileResults.forEach((fr, index, array) => {
    const src = fr[0].result;
    const file = fr[1];

    const preview = createElement(src, file);
    const imagePreview = document.querySelector(`ul.viewer__images_${cellIndex + 1}`);
    const imgNum = document.querySelector(`.viewer__total_${cellIndex + 1}`);
    const uploadFile = document.querySelector(`.viewer__file_${cellIndex + 1}`);
    const btnClear = document.querySelector(`.btn_clear_${cellIndex + 1}`);
    imagePreview.style.border = '1px solid black';

    imagePreview.appendChild(preview);

    imgNum.classList.remove('hide');
    uploadFile.classList.add('hide');
    btnClear.classList.remove('hide');
    imgNum.lastElementChild.innerHTML = array.length;
    // imgNum.find('.viewer__total__number').innerHTML = array.length;
    // if (index === array.length - 1) {
    //   imagePreview.style.maxHeight = '10000px';
    // }
  });
}

// 구분선 on/off
const btnLine = document.querySelector('#outline');
btnLine.addEventListener('click', e => {
  const uls = document.querySelectorAll('ul');
  if (e.target.checked) {
    uls.forEach(el => {
      el.classList.add('line');
    });
  } else {
    uls.forEach(el => {
      el.classList.remove('line');
    });
  }
});

// 페이지 이동
const upAndDown = document.querySelector('.btn_upanddown');
upAndDown.addEventListener('click', e => {
  if (e.target.classList.contains('down') || e.target.classList.contains('fa-angle-down')) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});