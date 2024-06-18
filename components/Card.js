class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
      this._name = name;
      this._link = link;

      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
    
    _setEventListeners() {

      //like button
      this._likeButton = this._element.querySelector(".card__like-button");
      this._likeButton.addEventListener('click', () => this._handleLike);

      //trash button
      const trashButton = this._element.querySelector('.card__trash-button');
      trashButton.addEventListener('click', () => this._handleDelete);

      //image modal click
      this._imageModal = this._element.querySelector('.card__image');
      this._imageModal.addEventListener('click', () => this._handleImageClick(this._link, this._name));
    }

    _getTemplate() {
      return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    }

    _handleLike() {
      this._likeButton
        .classList.toggle(".card__like-button_active");
    }

    _handleDelete() {
      this._element.remove();
    }

    generateCard() {
      this._element = this._getTemplate();

      const cardImage = this._element.querySelector(".card__image");
      cardImage.src = this._link;
      cardImage.alt = this._name;

      const cardTitle = this._element.querySelector(".card__title");
      cardTitle.textContent = this._name;

      this._setEventListeners();

      return this._element;
    }
  }

export default Card;