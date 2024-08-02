class Card {
  constructor(data, cardSelector, handleImageClick, handleLikeCard, handleDelete, currentUserId) {
      this._name = data.name;
      this._link = data.link;
      this._id = data._id;
      this._isLiked - data.isLiked; 

      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDelete = handleDelete;
      this._handleLikeCard = handleLikeCard;
      this._currentUserId = currentUserId;
    }
    
    _setEventListeners() {

      //like button
      this.likeButton = this._element.querySelector(".card__like-button");
      this.likeButton.addEventListener('click', () => {
        this._handleLikeCard();
        this._handleLike()
      });

      //trash button
      const trashButton = this._element.querySelector('.card__trash-button');
      trashButton.addEventListener('click', () => this._handleDelete());

      //image modal click
      this._imageModal = this._element.querySelector('.card__image');
      this._imageModal.addEventListener('click', () => this._handleImageClick({link: this._link, name: this._name}));
    }

    _getTemplate() {
      return document
      .querySelector(this._cardSelector)
      .content.firstElementChild
      .cloneNode(true);
    }

    _handleLike() {
      this.likeButton.classList.toggle("card__like-button_active");
    }

    deleteCard() {
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