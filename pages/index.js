import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    },
]

//wrappers
const cardsList = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal")
const newCardModal = document.querySelector("#add-modal");
const cardTemplate = document.querySelector("#card-template");
const imageModal = document.querySelector("#image-modal");
const editProfileForm = profileEditModal.querySelector("#edit-profile-form");
const newCardForm = newCardModal.querySelector("#add-card-form");

//buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardCloseButton = newCardModal.querySelector(".modal__close");
const imageModalCloseButton = imageModal.querySelector("#close-image");

//form data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = profileEditModal.querySelector("#profile-input-name");
const profileDescriptionInput = profileEditModal.querySelector("#profile-input-description");
const cardTitleInput = newCardModal.querySelector("#card-input-title");
const cardUrlInput = newCardModal.querySelector("#card-input-url");

//helper functions
function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent; 
};

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", handleEscapeKey);
    modal.removeEventListener("mousedown", handleMouseClick);
};

function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener("keydown", handleEscapeKey);
    modal.addEventListener("mousedown", handleMouseClick);
};

function handleImageClick(link, name) {
    const modalBoxImage = document.querySelector(".modal__image");
    const modalImageName = document.querySelector(".modal__name");
    modalBoxImage.src = link;
    modalBoxImage.alt = name;
    modalImageName.textContent = name;
    openModal(imageModal);
}

//rendering card
function renderCard(cardData, wrapper) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    wrapper.prepend(card.generateCard());
}

initialCards.forEach((cardData) => {
    renderCard(cardData, cardsList);
});

//handlers
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardsList);
    closeModal(newCardModal);

    cardTitleInput.value = "";
    cardUrlInput.value = "";
};

const handleProfileEditForm = (event) => {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);

    profileNameInput.value = "";
    profileDescriptionInput.value = "";
}

const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
        closeModal(document.querySelector(".modal_opened"));
      }
}

const handleMouseClick = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("modal__close")) {
      closeModal(evt.currentTarget);
    }
  }

//event listeners
profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profileEditModal)
});

editProfileForm.addEventListener('submit', handleProfileEditForm);

newCardAddButton.addEventListener('click', () => {
    openModal(newCardModal);
});

newCardCloseButton.addEventListener('click', () => {
    closeModal(newCardModal);
});

newCardForm.addEventListener('submit', handleAddCardFormSubmit);

imageModalCloseButton.addEventListener('click', () => {
    closeModal(imageModal);
});

// validation

const formValidationConfig = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const addFormValidator = new FormValidator(formValidationConfig, newCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formValidationConfig, editProfileForm);
editFormValidator.enableValidation();