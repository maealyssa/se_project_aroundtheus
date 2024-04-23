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

//buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileSaveButton = profileEditModal.querySelector(".modal__save");
const newCardAddButton = document.querySelector(".profile__add-button");
const newCardCloseButton = newCardModal.querySelector(".modal__close");
const newCardCreateButton = newCardModal.querySelector("#modal-create");

//form data
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-input-name");
const profileDescriptionInput = document.querySelector("#profile-input-description");
const cardTitleInput = newCardModal.querySelector("#card-input-title");
const cardUrlInput = newCardModal.querySelector("#card-input-url");

//helper functions
function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent; 
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function openModal(modal) {
    modal.classList.add('modal_opened');
}

//rendering cards
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardTitle = cardTitleInput.value;
    const cardUrl = cardUrlInput.value;
    const cardElement = getCardElement();
    closeModal(newCardModal);
};

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");

    cardImageEl.setAttribute("src", data.link);
    cardImageEl.setAttribute("alt", data.name)
    cardTitleEl.textContent = data.name;

    return cardElement;
};

initialCards.forEach((cardData) => {
    const cardElementList = getCardElement(cardData);
    cardsList.prepend(cardElementList);
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_active");
    })
})

//event listeners
profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profileEditModal)
});

profileSaveButton.addEventListener('submit', (e) => {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
});

newCardAddButton.addEventListener('click', () => {
    openModal(newCardModal);
});

newCardCloseButton.addEventListener('click', () => {
    closeModal(newCardModal);
})

newCardCreateButton.addEventListener('submit', () => {
    handleAddCardFormSubmit()
})