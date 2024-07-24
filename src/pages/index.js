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

let section;

//API 
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "174196d6-45bd-490a-bc0e-39b0754c7da9",
      "Content-Type": "application/json"
    }
});

// //rendering card
const renderCard = (data) => {
    const card = new Card(data, handleImageClick, handleDelete, selectors.cardTemplate, setIsLiked);

    return card.generateCard();
};

const handleImageClick = (imageData) => {
    popupImage.open(imageData)
}

const setIsLiked = (card) => {
    card.isLiked()
        ? api.deleteLike(card.getCardId())
            .then((res) => {
                card.setIsLiked(false);
            })
            .catch((err) => {
                console.error(err);
            })
        : api.addLike(card.getCardId())
            .then((res) => {
                card.setIsLiked(true);
            })
            .catch((err) => {
                console.error(err);
            })
}

//UserInfo
const userInfo = new UserInfo(
    selectors.profileTitle, 
    selectors.profileDescription, 
    selectors.profileAvatar,
);


Promise.all([api.fetchUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({
            name: userData.name,
            description: userData.about,
        });
        userInfo.setAvatarImage(userData.avatar)
        section = new Section(
            {
                items: cards,
                renderer: (data) => {
                    const cardEl = renderCard(data);
                    cardSection.addItem(cardEl);
                },
            },
            selectors.cardsList
        );
        section.renderItems();
    })
    .catch((err) => {
        console.log(err);
    })

// validation
// const formValidators = {};

// const enableValidation = (formValidationConfig) => {
//     const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

//     formList.forEach((formElement) => {
//        const validator = new FormValidator(formValidationConfig, formElement);
//        const formName = formElement.getAttribute("name"); 

//        formValidators[formName] = validator;
//        validator.enableValidation();
//     });
// }

// enableValidation(formValidationConfig);

// Adding New Card Form
// const handleAddCardSubmit = (data) => {
//     addCardForm.showLoading();
//     const { name, link } = data;
//     return api.addNewCard(name, link)
//         .then((data) => {
//             const cardEl = renderCard(data);
//             section.addItem(cardEl);
//             addCardForm.close();
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//         .finally(() => {
//             addCardForm.hideLoading();
//         });
// }

// const addCardForm = new PopupWithForm(selectors.addFormPopup, handleAddCardSubmit);

// addButton.addEventListener('click', () => {
//     formValidators[addNewCardForm.getAttribute('name')].resetValidation();
//     addCardForm.open();
// })

//Edit Profile Form
// const handleProfileFormSubmit = ({ title, description }) => {
//     editProfileModal.showLoading();
//     return api.editProfile(title, description)
//         .then(() => {
//             userInfo.setUserInfo({ name: title, description: description });
//             editProfileModal.close();
//         })
//         .catch((err) => {
//             console.error(err);
//         })
//         .finally(() => {
//             editProfileModal.hideLoading();
//         });
// }

// const editProfileModal = new PopupWithForm(selectors.editFormPopup, handleProfileFormSubmit);
// editProfileModal.setEventListeners();

// editButton.addEventListener('click', () => {
//     const { name, description } = userInfo.getUserInfo();
//     profileNameInput.value = name;
//     profileDescriptionInput.value = description;
//     formValidators[profileEditForm.getAttribute('name')].disableButton();
//     editProfileModal.open();
// })

//PopupWithImage
// const popupImage = new PopupWithImage(selectors.previewPopup);
// popupImage.close();

//Changing avatar

// const updateAvatarModal = new PopupWithForm(selectors.changeAvatarPopup, handleUpdateAvatar);
// updateAvatarModal.setEventListeners();

// const handleUpdateAvatar = ({ link }) => {
//     updateAvatarModal.showLoading();
//     return api.updateAvatar(link)
//         .then((data) => {
//             userInfo.setAvatarImage(data.avatar);
//             updateAvatarModal.close();
//             updateAvatarModal.reset();
//         })
//         .catch((err) => {
//             console.error(err);
//         })
//         .finally(() => {
//             updateAvatarModal.hideLoading();
//         })
// }

// selectors.updateAvatarButton.addEventListener('click', () => {
//     formValidators[selectors.avatarForm.getAttribute('name')].resetValidation();
//     updateAvatarModal.open();
// })

//Confirm delete modal

// const confirmDeleteModal = new PopupWithConfirm(selectors.confirmDeleteModal, 
//     (card) => {handleDelete(card)});

// confirmDeleteModal.setEventListeners();

// const handleDelete = (card) => {
//     confirmDeleteModal.open(() => {
//         confirmDeleteModal.showLoading();
//         api.deleteCard(card.getCardId())
//             .then(() => {
//                 card.deleteCard();
//                 confirmDeleteModal.close();
//             })
//             .catch((err) => {
//                 console.err(err);
//             })
//             .finally(() => {
//                 confirmDeleteModal.hideLoading();
//             })
//     })
// }