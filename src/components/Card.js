class Card {
  constructor(data, cardSelector, handleImageClick, handleLikeCard, handleDislikeCard, handleDelete) {
      this._name = data.name;
      this._link = data.link;
      this._id = data._id;
      this._isLiked = data.isLiked; 

      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDelete = handleDelete;
      this._handleLikeCard = handleLikeCard;
      this._handleDislikeCard = handleDislikeCard;
    }
    
    _setEventListeners() {

      //like button
      this.likeButton.addEventListener('click', () => {
        this._handleLike(this);
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
      if(this._isLiked) {
        this._handleDislikeCard();
      } else if(!this._isLiked) {
        this._handleLikeCard();
      }
    }

    deleteCard() {
      this._element.remove();
    }

    addLike() {
      this.likeButton.classList.add("card__like-button_active");
      this._isLiked = true;
    }

    disLike() {
      this.likeButton.classList.remove("card__like-button_active");
      this._isLiked = false;
    }

    generateCard() {
      this._element = this._getTemplate();

      const cardImage = this._element.querySelector(".card__image");
      cardImage.src = this._link;
      cardImage.alt = this._name;

      const cardTitle = this._element.querySelector(".card__title");
      cardTitle.textContent = this._name;

      this.likeButton = this._element.querySelector(".card__like-button");
      if(this._isLiked === true) {
        this.addLike(this._id);
      } else if (this._isLiked === false) {
        this.disLike(this._id);
      }

      this._setEventListeners();

      return this._element;
    }
  }

export default Card;