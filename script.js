// RENDER

// Add listeners to card

// card 1 habitación doble
document.getElementById('h-doble').addEventListener('click', () => openModal('Habitación doble'));

// card 2 habitación triple

document.getElementById('h-triple').addEventListener('click', () => openModal('Habitación triple'));

// card 3 habitación cuádruple

document
  .getElementById('h-cuadruple')
  .addEventListener('click', () => openModal('Habitación cuádruple'));

// GALERÍA

const galElements = document.querySelectorAll('#gallery img');
galElements.forEach((el, i) => el.addEventListener('click', () => openModal('gallery', i + 1)));

// close modal
document.getElementById('modal-close').addEventListener('click', () => closeModal());

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === '' || e.target.id === 'modal') closeModal();
});

// WHATSAPP

const messageButton = document.querySelectorAll('.sendMessage');
messageButton.forEach((el) => el.addEventListener('click', sendMessage));

// https://wa.link/0rbnp9
const url = 'https://web.whatsapp.com/send?phone=59899822848';
function sendMessage() {
  window.open(url);
}

// MODAL

let modalIndex;
const modal = document.getElementById('modal');
const modalImg = document.querySelector('.modal img');
const modalTitle = document.querySelector('.modal h2');
const modalBtnPrev = document.getElementById('modal-prev');
const modalBtnNext = document.getElementById('modal-next');
let imgURL;
let mode;

function openModal(title, indexGallery) {
  switch (title) {
    case 'Habitación doble':
      imgURL = 'doble';
      mode = 'room';
      break;
    case 'Habitación triple':
      imgURL = 'triple';
      mode = 'room';
      break;
    case 'Habitación cuádruple':
      imgURL = 'cuadruple';
      mode = 'room';
      break;
    case 'gallery':
      modalIndex = indexGallery;
      mode = 'gallery';
      break;
    default:
      throw new Error('invalid input');
  }

  if (mode === 'room') {
    modalIndex = 1;
    modalImg.src = `./assets/images/habitaciones/${imgURL}-${modalIndex}.jpg`;
    modalTitle.innerText = title;
  } else {
    modalImg.src = `./assets/images/gallery/galeria-${modalIndex}.jpg`;
    modalTitle.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const prevEventListener = () => changeModalImage('prev', imgURL, mode);
  const nextEventListener = () => changeModalImage('next', imgURL, mode);

  const documentEventListener = (e) => {
    switch (e.keyCode) {
      case 37:
        changeModalImage('prev', imgURL, mode);
        break;
      case 39:
        changeModalImage('next', imgURL, mode);
        break;
      case 27:
        closeModal();
        break;
      default:
        break;
    }
  };

  modalBtnPrev.addEventListener('click', prevEventListener);
  document.addEventListener('keydown', documentEventListener);

  modalBtnNext.addEventListener('click', nextEventListener);

  modalBtnPrev._prevEventListener = prevEventListener;
  modalBtnNext._nextEventListener = nextEventListener;
  document._documentEventListener = documentEventListener;
}

function closeModal() {
  modalBtnPrev.removeEventListener('click', modalBtnPrev._prevEventListener);
  modalBtnNext.removeEventListener('click', modalBtnNext._nextEventListener);

  document.removeEventListener('keydown', document._documentEventListener);

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  delete modalBtnPrev._prevEventListener;
  delete modalBtnNext._nextEventListener;
  delete document._documentEventListener;
}

function changeModalImage(input, room, mode) {
  switch (input) {
    case 'prev':
      modalIndex--;
      if (mode === 'room') {
        if (modalIndex < 1) modalIndex = 5;
      } else {
        if (modalIndex < 1) modalIndex = 16;
      }
      break;
    case 'next':
      modalIndex++;
      if (mode === 'room') {
        if (modalIndex > 5) modalIndex = 1;
      } else {
        if (modalIndex > 16) modalIndex = 1;
      }
      break;
    default:
      throw new Error('invalid input ' + input);
  }

  mode === 'room'
    ? (modalImg.src = `./assets/images/habitaciones/${room}-${modalIndex}.jpg`)
    : (modalImg.src = `./assets/images/gallery/galeria-${modalIndex}.jpg`);
}
