const lagoDiBraiesImage = new URL("../images/lago.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL("../images/vanoise.jpg", import.meta.url);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const baldMountainsImage = new URL("../images/bald-mountains.jpg", import.meta.url);
const yosemiteValleyImage = new URL("../images/yosemite.jpg", import.meta.url);

export const initialCards = [
    {
        name: "Lago di Braies",
        link: lagoDiBraiesImage
    },
    {
        name: "Vanoise National Park",
        link: vanoiseNationalParkImage
    },
    {
        name: "Lake Louise",
        link: lakeLouiseImage
    },
    {
        name: "Latemar",
        link: latemarImage
    },
    {
        name: "Bald Mountains",
        link: baldMountainsImage
    },
    {
        name: "Yosemite Valley",
        link: yosemiteValleyImage
    }
];

export const formValidationConfig = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
    formSelector: "form",
};

export const selectors = {
    cardsList: '.cards__list',
    cardTemplate: '#card-template',
    previewPopup: '#image-modal',
    editFormPopup: '#edit-modal',
    addFormPopup: '#add-modal',
    profileTitle: '.profile__title',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar',
    formModalContainer: '.modal__container',
    imageModalContainer: '.modal__container-image',
    changeAvatarPopup: "#change-avatar-modal",
    confirmDeleteModal: "#confirm-delete-modal",
};
