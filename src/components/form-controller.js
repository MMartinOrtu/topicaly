import { CommentsService } from 'services/comments-service.js';

export class FormController {

    constructor (selector, articleId, commentsService, pubSub){
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        this.pubSub = pubSub;
        this.articleId = articleId,
        this.loading = false;
        this.submitComment();
    }

    setLoading(loading) {
        this.loading = loading;
        this.element.querySelectorAll('.input, button').forEach(item => { item.disabled = loading });
    }

    submitComment() {
        this.checkInputValidity();
        this.addFormSubmitListener();
    }
    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            if (this.loading) {
                return;  // si se está cargando, no hacemos nada más
            }
            this.setLoading(true);
            let comment = this.loadCommentData();
            console.log(comment);
            this.commentsService.postComment(comment).then(response=> {
                if (response === true) {
                    this.element.reset();
                    PubSub.publish('reload');
                  }
            }).catch(error => {
                console.error("SE HA PRODUCIDO UN ERROR");
                alert(`Se ha producido un error ${error}`);
            }).finally(() => {
                this.setLoading(false);
            })
        });
    }

    loadCommentData() {
        return {
            fullname: this.element.querySelector('#fullname').value,
            email: this.element.querySelector('#email').value,
            comment: this.element.querySelector('#comment').value,
            articleId: this.articleId
        }
    }

    checkInputValidity() {
        // en todos los input que hay en el formulario, los valido cuando se pierde el foco
        this.element.querySelectorAll('.input').forEach(input => {
                console.log(input);
            input.addEventListener('blur', event => {
                // event.target sería lo mismo que input en este caso
                if (input.checkValidity() == false) {
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                this.element.querySelector('button').style.display = "block";
            });
        });
    }
}