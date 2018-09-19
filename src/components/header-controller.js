export class HeaderController {

    constructor(selector) {
        this.element = document.querySelector(selector);
        this.element.querySelector('.fas').addEventListener("click", event => {
            this.element.classList.toggle("show-menu");
            this.element.querySelector('.fas').classList.toggle("fa-times");
        });
    }
}