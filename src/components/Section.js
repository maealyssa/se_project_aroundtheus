export default class Section {
    constructor({ items, renderer }, cardsList) {
        this._items = items;
        this._renderer = renderer;
        this._cardsList = document.querySelector(cardsList);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._cardsList.prepend(element);
    }
}