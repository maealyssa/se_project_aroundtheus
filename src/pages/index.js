import { formValidationConfig, initialCards, selectors } from "../utils/constants.js";
import Styles from "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar-edit');

const addNewCardForm = document.forms['card-form'];
const profileEditForm = document.forms['profile-form'];
const updateAvatarForm = document.forms['avatar-form'];

const formInputName = document.querySelector('#profile-input-name');
const formInputDescription = document.querySelector('#profile-input-description');

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    User Info                                   ||
// ! ||--------------------------------------------------------------------------------||
const userInfo = new UserInfo({
    nameEl: selectors.profileTitle, 
    descriptionEl: selectors.profileDescription, 
    avatarEl: selectors.profileAvatar,
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     API                                        ||
// ! ||--------------------------------------------------------------------------------||
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "d8e635dc-b9a3-40bb-8b8a-44b118a2b105",
      "Content-Type": "application/json",
    },
});

let section;
let currentUserId;

Promise.all([api.fetchUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        currentUserId = userData._id;
        userInfo.setUserInfo({
            name: userData.name,
            description: userData.about,
        });
        userInfo.setAvatarImage(userData.avatar);
        section = new Section(
            {
                items: cards,
                renderer: (data) => {
                    const card = renderCard(data);
                    section.addItem(card);
                }
            },
            selectors.cardsList
        );
        section.renderItems();
    })
    .catch(console.error);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                  rendering cards                               ||
// ! ||--------------------------------------------------------------------------------||
const handleImageClick = (imageData) => {
    popupImage.open(imageData)
}

const renderCard = (data) => {
    const card = new Card(
        data, 
        selectors.cardTemplate, 
        handleImageClick, 
        () => {
            api.addLike(data._id)
                .then(() => { card.addLike() })
                .catch(console.error);
        },
        () => {
            api.deleteLike(data._id)
                .then(() => { card.disLike() })
                .catch(console.error);
        }, 
        () => {
            confirmDeleteModal.open();
            confirmDeleteModal.setSubmitAction(() => {
                api.deleteCard(data._id)
                    .then(() => {
                        card.deleteCard();
                        confirmDeleteModal.close();
                    })
                    .catch(console.error)
            })
        },
        );

    return card.generateCard();
};

// ! ||--------------------------------------------------------------------------------||
// ! ||                                       validations                              ||
// ! ||--------------------------------------------------------------------------------||
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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      Handlers                                  ||
// ! ||--------------------------------------------------------------------------------||

function handleSubmit(request, modal, loadingText = "Saving...") {
    modal.renderLoading(true, loadingText);
    request()
        .then(() => {
            modal.close()
        })
        .catch(console.error)
        .finally(() => {
            modal.renderLoading(false);
        });
  }

//Edit Profile Form handler

const openProfileModal = () => {
    const { name, description } = userInfo.getUserInfo();
    formInputName.value = name;
    formInputDescription.value = description;
    formValidators[profileEditForm.getAttribute('name')].resetValidation();
    editProfileModal.open();
}

const handleProfileFormSubmit = (input) => {
    function makeRequest() {
      return api.editProfile(input)
        .then(() => {
            userInfo.setUserInfo({
                name: input.name,
                description: input.description,
            })
      });
    }
    handleSubmit(makeRequest, editProfileModal);
}

// Adding New Card Form handler
const handleAddCardSubmit = (data) => {
    function makeRequest() {
        return api.addNewCard({
            cardName: data.name,
            cardLink: data.link,
        })
        .then((cardData) => {
            const cardEl = renderCard(cardData);
            section.addItem(cardEl);
        });
    }
    handleSubmit(makeRequest, addCardForm);
}

//Changing avatar handler
const handleUpdateAvatar = (input) => {
    function makeRequest() {
        return api.editProfileAvatar(input)
            .then((data) => {
                userInfo.setAvatarImage(data.avatar)
            });
    }
    handleSubmit(makeRequest, updateAvatarModal);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                              class instantiations                              ||
// ! ||--------------------------------------------------------------------------------||

//change avatar
const updateAvatarModal = new PopupWithForm(selectors.changeAvatarPopup, handleUpdateAvatar);
updateAvatarModal.setEventListeners();

profileAvatar.addEventListener('click', () => {
    updateAvatarModal.open();
    formValidators[updateAvatarForm.getAttribute('name')].resetValidation();
})

//PopupWithImage
const popupImage = new PopupWithImage(selectors.previewPopup);

//delete modal
const confirmDeleteModal = new PopupWithConfirm(selectors.confirmDeleteModal);
confirmDeleteModal.setEventListeners();

//edit profile
const editProfileModal = new PopupWithForm(selectors.editFormPopup, handleProfileFormSubmit);
editProfileModal.setEventListeners();

editButton.addEventListener('click', openProfileModal)

//add new card
const addCardForm = new PopupWithForm(selectors.addFormPopup, handleAddCardSubmit);
addCardForm.setEventListeners();

addButton.addEventListener('click', () => {
    formValidators[addNewCardForm.getAttribute('name')].resetValidation();
    addCardForm.open();
})