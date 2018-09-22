import { CommentsService } from 'services/comments-service.js';
import debounce  from 'utils/utils.js';
import ux from 'components/ux-controller.js';

export class CommentsController{

       constructor(selector, articleId, commentsService, pubSub){
            this.element = document.querySelector(selector);
            this.articleId = articleId;
            this.commentsService = commentsService;
            this.commentsLoaded = false;
            PubSub.subscribe('reload', () => {
                this.commentsloaded = false;
                this.loadComments();
            });
        }
        //Define event listener when the comments container apperar when scrolling
        callCommentsListener(){
            //debounce function prevent for triggering scroll events many times
            window.addEventListener('scroll', debounce(this.spotCommentList.bind(this)));
        }

        renderComments(comments){
            console.log(comments);
            let html = '';
            for (let comment of comments) {
                console.log("Holaaaa")
            html += `<div class="comments">
                        <div class="fullname">${comment.fullname}</div>
                        <div class="email">${comment.email}</div>
                        <div class="comment-text">${comment.comment}</div>
                    </div>`;
            }
            this.element.innerHTML = html;
            this.commentsLoaded = true;
        }

        loadComments(){
            if(this.commentsLoaded === false){
                ux.showLoadingMessage(this.element);
                this.commentsService.getComments(this.articleId).then( comments =>{
                    if (comments.length == 0) {
                        console.log(comments);
                        ux.showNoDataMessage(this.element);
                    } else {
                        this.renderComments(comments);
                    }
                }).catch((error) =>{
                    console.log('ERRORRRRRR', error)
                    console.error("ERROR RETRIEVING SONGS", error);
                    ux.showErrorMessage(this.element);
                });
            }
        }

        spotCommentList(){
            //Select comments container
            let commentsList = document.querySelector('.comments-list-title');
            //Define the a variable to store scrolling point (at the bottom of the window)
            let scrolledAt = (window.scrollY + window.innerHeight);
            //When the  comments container appear the variable isShown is set to true
            let isShown = scrolledAt > commentsList.offsetTop;
            //Only when the comments container appear, comments are loaded
            if (isShown === true){
                //If comments are  already loaded commentsLoaded will be true so, comments don-t load again
                if (this.commentsLoaded===false){
                  this.loadComments();
                }
            }
        }




}