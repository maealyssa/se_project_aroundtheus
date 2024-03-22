let initialCards = [
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


const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal")
const profileEditCloseButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-input-name");
const profileDescriptionInput = document.querySelector("#profile-input-description");
const profileSaveButton = profileEditModal.querySelector(".modal__save");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add('modal_opened');
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal()
});

function closeModal() {
    profileEditModal.classList.remove('modal_opened');
}

profileSaveButton.addEventListener('click', (e) => {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal();
})

initialCards.forEach((cardData) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    cardImageEl.setAttribute("src", cardData.link);
    cardImageEl.setAttribute("alt", cardData.name)
    cardTitleEl.textContent = cardData.name;
    cardsList.append(cardElement);
});
