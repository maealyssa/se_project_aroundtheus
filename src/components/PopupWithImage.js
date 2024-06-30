import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._modalName = this._popup.querySelector('.modal__name');
        this._modalImage = this._popup.querySelector('.modal__image');

        super.setEventListeners();
    }

    open(imageData) {
        this._modalName.textContent = imageData.name;
        this._modalImage.alt = imageData.name;
        this._modalImage.src = imageData.link;

        super.open();
    }
}