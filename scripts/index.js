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
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
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
};

function openModal(modal) {
    modal.classList.add('modal_opened');
};

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
};

//creating & displaying cards
function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const removeCardButton = cardElement.querySelector(".card__trash-button"); 
    const likeButton = cardElement.querySelector(".card__like-button");

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_active");
    });

    removeCardButton.addEventListener('click', () => {
        removeCardButton.parentElement.remove();
    });

    cardImageEl.setAttribute("src", data.link);
    cardImageEl.setAttribute("alt", data.name);
    cardTitleEl.textContent = data.name;

    return cardElement;
};

initialCards.forEach((cardData) => {
    renderCard(cardData, cardsList);
});

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardsList);
    closeModal(newCardModal);
};

function handleProfileEditForm(event) {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

//event listeners
profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profileEditModal)
});

editProfileForm.addEventListener("submit", handleProfileEditForm);

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

//image modal
const cardImages = document.querySelectorAll(".card__image");
cardImages.forEach((cardImage) =>
  cardImage.addEventListener("click", () => {
    const image = cardImage.closest(".card__image");
    const modalBoxImage = imageModal.querySelector(".modal__image");
    const modalImageName = imageModal.querySelector(".modal__name");
    modalBoxImage.src = image.src;
    modalBoxImage.alt = image.alt;
    modalImageName.textContent = image.alt;
    openModal(imageModal);
  })
);