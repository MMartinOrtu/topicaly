export class HeaderController {

    constructor(selector) {
        this.element = document.querySelector(selector);
        this.element.querySelector('.fas').addEventListener("click", event => {
            this.element.classList.toggle("show-form");
            this.element.querySelector('.fas').classList.toggle("fa-times");
        });
    }
}