import { formValidationConfig, initialCards, selectors } from "../utils/constants.js";
import Styles from "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const addNewCardForm = document.forms['card-form'];
const profileEditForm = document.forms['profile-form'];

const profileNameInput = document.querySelector('#profile-input-name');
const profileDescriptionInput = document.querySelector('#profile-input-description');

// validation
const formValidators = {};

const enableValidation = (formValidationConfig) => {
    const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    formList.forEach((formElement) => {
       const validator = new FormValidator(formValidationConfig, formElement);
       const formName = formElement.getAttribute("name"); 

       formValidators[formName] = validator;
       validator.enableValidation();
    });
}

enableValidation(formValidationConfig);

//PopupWithImage
const popupImage = new PopupWithImage(selectors.previewPopup);
popupImage.close();

// //rendering card
function renderCard(data) {
    const card = new Card({ data, handleImageClick: (imageData) => {
        popupImage.open(imageData);
    }}, selectors.cardTemplate);

    return card.generateCard();
};

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
           const cardEl = renderCard(data);
           cardSection.addItem(cardEl);
        },
    },
    selectors.cardsList
);

cardSection.renderItems(initialCards);

// Adding New Card Form
const addCardForm = new PopupWithForm(selectors.addFormPopup, (data) => {
    const newCardData = {
        name: data.name,
        link: data.link,
    }
    const newCard = renderCard(newCardData);
    addCardForm.close();
    cardSection.addItem(newCard);
});

addButton.addEventListener('click', () => {
    formValidators[addNewCardForm.getAttribute('name')].resetValidation();
    addCardForm.open();
})

addCardForm.setEventListeners();

//UserInfo
const userInfo = new UserInfo(selectors.profileTitle, selectors.profileDescription);

const editFormPopup = new PopupWithForm(selectors.editFormPopup, (input) => {
    userInfo.setUserInfo(input.name, input.description)
    editFormPopup.close();
});

//Edit Profile Form
editButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo();

    profileNameInput.value = profileInfo.name;
    profileDescriptionInput.value = profileInfo.description;

    formValidators[profileEditForm.getAttribute('name')].disableButton();
            
    editFormPopup.open();
})

editFormPopup.setEventListeners();