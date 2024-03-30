// RENDER

// Add listeners to card

// card 1 habitación doble
document
  .getElementById("h-doble")
  .addEventListener("click", () => openModal("Habitación doble"));

// card 2 habitación triple

document
  .getElementById("h-triple")
  .addEventListener("click", () => openModal("Habitación triple"));

// card 3 habitación cuádruple

document
  .getElementById("h-cuadruple")
  .addEventListener("click", () => openModal("Habitación cuádruple"));

// close modal
document
  .getElementById("modal-close")
  .addEventListener("click", () => closeModal());

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "" || e.target.id === "modal") closeModal();
});

// WHATSAPP

const messageButton = document.querySelector(".sendMessage");
messageButton.addEventListener("click", sendMessage);

// https://wa.link/0rbnp9
const url = "https://web.whatsapp.com/send?phone=59899224710&text=Hola";
function sendMessage() {
  window.open(url);
}

// MODAL

let modalIndex;
const modal = document.getElementById("modal");
const modalImg = document.querySelector(".modal img");
const modalTitle = document.querySelector(".modal h2");
const modalBtnPrev = document.getElementById("modal-prev");
const modalBtnNext = document.getElementById("modal-next");
let imgURL;

function openModal(title) {
  switch (title) {
    case "Habitación doble":
      imgURL = "doble";
      break;
    case "Habitación triple":
      imgURL = "triple";
      break;
    case "Habitación cuádruple":
      imgURL = "cuadruple";
      break;
    default:
      throw new Error("invalid input");
  }

  modalIndex = 1;
  modalImg.src = `./assets/images/habitaciones/${imgURL}-${modalIndex}.jpg`;
  modalTitle.innerText = title;
  modal.classList.remove("hidden");

  const prevEventListener = () => changeModalImage("prev", imgURL);
  const nextEventListener = () => changeModalImage("next", imgURL);

  modalBtnPrev.addEventListener("click", prevEventListener);
  modalBtnNext.addEventListener("click", nextEventListener);

  modalBtnPrev._prevEventListener = prevEventListener;
  modalBtnNext._nextEventListener = nextEventListener;
}

function closeModal() {
  modalBtnPrev.removeEventListener(
    "click",
    modalBtnPrev._prevEventListener
  );
  modalBtnNext.removeEventListener(
    "click",
    modalBtnNext._nextEventListener
  );

  modal.classList.add("hidden");
}

function changeModalImage(input, room) {
  switch (input) {
    case "prev":
      modalIndex--;
      if (modalIndex < 1) modalIndex = 5;
      break;
    case "next":
      modalIndex++;
      if (modalIndex > 5) modalIndex = 1;
      break;
    default:
      throw new Error("invalid input " + input);
  }

  modalImg.src = `./assets/images/habitaciones/${room}-${modalIndex}.jpg`;
}
