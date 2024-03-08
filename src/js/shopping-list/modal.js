import { createMarkup } from './create-mark-up';
import { addToShoppingList } from './add-to-shopping-list';
import { getBookInfo } from '../list-books/books-API';
const modalElem = document.querySelector('.modal-js');
const backdropEl = document.querySelector('.backdrop');
let modalButton;
let modalCloseBtn;

backdropEl.addEventListener('click', onBackdropClick);

// const bookId = '643282b1e85766588626a080'; // Здесь нужно указать реальный идентификатор книги
// const bookInfo = await getBookInfo(bookId);
// console.log(bookInfo);

export async function openModal(bookId) {
  console.log('Received bookId:', bookId); // Добавить эту строку
  const book = await getBookInfo(bookId);
  const markUp = createMarkup(book);
  modalElem.innerHTML = markUp;
  showModal();
  modalButton = document.querySelector('.modal-button-shopping-list');
  modalCloseBtn = document.querySelector('.modal-close-btn-js');

  modalButton.addEventListener('click', onModalButtonClick);
  modalCloseBtn.addEventListener('click', onCloseButtonClick);
  console.log(markUp);
}
// openModal('643282b1e85766588626a080');
// function showModal() {
//   document.body.classList.add('show-modal');
//   window.addEventListener('keydown', onModalClose);
// }
function showModal() {
  backdropEl.classList.remove('remove-modal');
  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onModalClose);
}

// function hideModal() {
//   document.body.classList.remove('show-modal');
//   window.removeEventListener('keydown', onModalClose);
//   modalButton.removeEventListener('click', onModalButtonClick);
//   modalCloseBtn.removeEventListener('click', onCloseButtonClick);
// }
function hideModal() {
  backdropEl.classList.add('remove-modal');
  document.body.classList.remove('show-modal');
  window.removeEventListener('keydown', onModalClose);
  window.removeEventListener('keydown', onModalClose);
  modalButton.removeEventListener('click', onModalButtonClick);
  modalCloseBtn.removeEventListener('click', onCloseButtonClick);
}
function onModalButtonClick(e) {
  const LOCAL_STORAGE_KEY = 'addBook';
  addToShoppingList(e);
  const button = e.target.closest('button');
  if (!button.classList.contains('modal-button-shopping-list')) return;
  const inLocalStorage =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  const findCopy = inLocalStorage.some(item => item._id === button.dataset.id);

  if (!findCopy) {
    button.textContent = 'Remove from shopping list';
  } else {
    button.textContent = 'Add to shopping list';
  }

  button.nextElementSibling.classList.toggle('hidden');
}

function onCloseButtonClick(e) {
  hideModal();
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) hideModal();
}

function onModalClose(e) {
  console.log(e);
  if (e.key === 'Escape') hideModal();
}
