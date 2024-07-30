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

const addNewCardForm = document.forms['card-form'];
const profileEditForm = document.forms['profile-form'];

const profileNameInput = document.querySelector('#profile-input-name');
const profileDescriptionInput = document.querySelector('#profile-input-description');

//UserInfo
const userInfo = new UserInfo(
    selectors.profileTitle, 
    selectors.profileDescription, 
    selectors.profileAvatar,
);

//API 
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "174196d6-45bd-490a-bc0e-39b0754c7da9",
      "Content-Type": "application/json",
    },
});

let section;
let currentUserId;

Promise.all([api.fetchUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        currentUserId = userData._id;
        userInfo.setUserInfo(userData.name, userData.about);
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
    .catch((err) => {
        console.log(err);
    });

//rendering card

//PopupWithImage
const popupImage = new PopupWithImage(selectors.previewPopup);
popupImage.close();


const handleImageClick = (imageData) => {
    popupImage.open(imageData)
}

const handleDelete = (card) => {
    confirmDeleteModal.open();
    confirmDeleteModal.setSubmitAction(() => {
        confirmDeleteModal.renderLoading(true);
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCard();
                confirmDeleteModal.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                confirmDeleteModal.renderLoading(false);
            })
    })
}

const handleLikeCard = (removeLike) => {
    if(removeLike) {
        api.removeLike(data)
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.addLike(data)
            .catch((err) => {
                console.log(err);
            });
    }
}

const confirmDeleteModal = new PopupWithConfirm(selectors.confirmDeleteModal, 
    (card) => {handleDelete(card)});

confirmDeleteModal.setEventListeners();

const renderCard = (data) => {
    const card = new Card(data, handleImageClick, handleLikeCard, handleDelete, currentUserId,);

    return card.generateCard();
};

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

// Adding New Card Form
const handleAddCardSubmit = (data) => {
    addCardForm.renderLoading(true);
    api.addNewCard(data)
        .then((cardData) => {
            const cardEl = renderCard(cardData);
            section.addItem(cardEl);
            addCardForm.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            addCardForm.renderLoading(false);
        });
}

const addCardForm = new PopupWithForm(selectors.addFormPopup, handleAddCardSubmit);
addCardForm.setEventListeners();
addButton.addEventListener('click', () => {
    formValidators[addNewCardForm.getAttribute('name')].resetValidation();
    addCardForm.open();
})

//Edit Profile Form
const handleProfileFormSubmit = (input) => {
    editProfileModal.renderLoading(true);
    api.editProfile(input)
        .then(() => {
            userInfo.setUserInfo({
                name: input.name,
                description: input.description,
            });
            editProfileModal.close();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            editProfileModal.renderLoading(false);
        });
}

const editProfileModal = new PopupWithForm(selectors.editFormPopup, handleProfileFormSubmit);
editProfileModal.setEventListeners();

editButton.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileDescriptionInput.value = description;
    formValidators[profileEditForm.getAttribute('name')].disableButton();
    editProfileModal.open();
})

//Changing avatar
const handleUpdateAvatar = (input) => {
    updateAvatarModal.renderLoading(true);
    api.editProfileAvatar(input)
        .then((data) => {
            userInfo.setAvatarImage(data.avatar);
            updateAvatarModal.close();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            updateAvatarModal.renderLoading(false);
        })
}

const updateAvatarModal = new PopupWithForm(selectors.changeAvatarPopup, handleUpdateAvatar);
updateAvatarModal.setEventListeners();
// selectors.updateAvatarButton.addEventListener('click', () => {
//     formValidators[selectors.avatarForm.getAttribute('name')].resetValidation();
//     updateAvatarModal.open();
// });
