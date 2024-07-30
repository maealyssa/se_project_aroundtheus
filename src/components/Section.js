export default class Section {
    constructor({ items, renderer }, cardSelector) {
        this._items = items;
        this._renderer = renderer;
        this._cardSelector = document.querySelector(cardSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this.addItem(this._renderer(item));
        })
    }

    addItem(element) {
        this._cardSelector.prepend(element);
    }
}