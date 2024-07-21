class Card {
  constructor(data, handleImageClick, handleLikeButton, handleDeleteLike, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;

      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleLikeButton = handleLikeButton;
      this._handleDeleteLike = handleDeleteLike;
    }
    
    _setEventListeners() {

      //like button
      this._likeButton = this._element.querySelector(".card__like-button");
      this._likeButton.addEventListener('click', () => this._handleLikeButton(this._cardId));

      //trash button
      const trashButton = this._element.querySelector('.card__trash-button');
      trashButton.addEventListener('click', () => this._handleDelete(this._cardId));

      //image modal click
      this._imageModal = this._element.querySelector('.card__image');
      this._imageModal.addEventListener('click', () => this._handleImageClick({link: this._link, name: this._name}));
    }

    _getTemplate() {
      return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    }

    handleLike = () => {
      this._likeButton
        .classList.toggle("card__like-button_active");
    }

    _handleDelete() {
      this._element.remove();
      this._element = null;
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