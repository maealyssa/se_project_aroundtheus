class Card {
  constructor(data, cardSelector, handleImageClick, handleLikeCard, handleDelete, currentUserId) {
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;
      this._likes = data.likes;

      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDelete = handleDelete;
      this._handleLikeCard = handleLikeCard;
      this._currentUserId = currentUserId;
      this._owner = data.owner._id;
    }
    
    _setEventListeners() {

      //like button
      this.likeButton = this._element.querySelector(".card__like-button");
      this.likeButton.addEventListener('click', () => this._setIsLiked(this));

      //trash button
      const trashButton = this._element.querySelector('.card__trash-button');
      trashButton.addEventListener('click', () => this._handleDelete);

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

    handleLike() {
      if(this.isLiked) {
        this.likeButton.classList.add("card__like-button_active")
      } else {
        this.likeButton.classList.remove("card__like-button_active")
      }
    }

    isLiked() {
      return this._likes.some((like) => like._cardId === this._currentUserId);
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
      this.handleLike();

      return this._element;
    }
  }

export default Card;