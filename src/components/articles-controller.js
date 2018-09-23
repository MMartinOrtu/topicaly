import { ArticlesService } from 'services/articles-service.js';
import placeholder from 'assets/user-solid.svg';
import ux from 'components/ux-controller.js';
import { resolve } from 'path';

export class ArticlesController {
    constructor (selector, articlesService, commentsService, pubSub){
        this.element= document.querySelector(selector);
        this.articlesService = articlesService;
        this.commentsService = commentsService;
        pubSub.subscribe('reload', () => {
        this.toggleForm();
        });
    }

    //Load comments form in the detail article page
    toggleForm(){
        document.querySelector('.modal').classList.toggle("hidden");
        document.querySelector('.fa-plus').classList.toggle("fa-times");
    }
    loadCommentsForm(){
        document.querySelector('.fa-plus').addEventListener("click", event => {
            this.toggleForm();
        });
    }

    //Render a list of articles
    async renderArticles(articles){
        let html = '';
        for (let article of articles) {
            try{
                //Get the number of comments os each article
                let comments =  await this.commentsService.getComments(article.id);
                let numberOfComments = comments.length;

                //Render article
                let cover= `<img class="article-cover" src="${article.cover.url}" alt="Article image">`;
                if (article.cover.type === "video"){
                    cover = `<iframe class="article-cover" src="${article.cover.url}" frameborder="0" allowfullscreen></iframe>`;
                }
                html += `<div class="articles">
                    <a href="/detail/?id=${article.id}">
                        <div class="cover">${cover}</div>
                    </a>
                        <div class="info">
                        <a class="detail-link" href="/detail/?id=${article.id}"><h2 class="title">${article.title}</h2></a>
                            <div class="author-wrapper">
                                <img  class="profile-picture hide-elements" src="${placeholder}" srcset="${article.picture}" width="100px">
                                <div class="author">${article.author}</div>
                            </div>
                            <div class="text-wrapper">
                                <div class="text hide-elements">${article.text}</div>
                            </div>
                            <div class="bottom-info-wrapper">
                                <p class="published-date">${article.added}</p>
                                <a href="/detail?id=${article.id}#comments-list" class="hide-elements comments">Comments</a>
                                <div class="hide-elements number-of-comments">${numberOfComments}</div>
                            </div>
                        </div>
                </div>`;
            }catch(error){
                console.error("ERROR RETRIEVING DATA", error);
                ux.showErrorMessage(document.body);
            }
        }
        this.element.innerHTML = html;
    }

    //Load a list of articles
    loadArticles () {
        ux.showLoadingMessage(this.element);
        this.articlesService.getArticles().then( articles =>{
            if (articles.length == 0) {
                ux.showNoDataMessage(this.element);
            } else {
                this.renderArticles(articles);
            }
        }).catch((error) =>{
            console.error("ERROR RETRIEVING DATA", error);
            ux.showErrorMessage(this.element);
        });
    }

    //render one article
    renderArticle(article){
        let cover= `<img class="article-cover" src="${article.cover.url}" alt="Article image">`;
        if (article.cover.type === "video"){
            cover = `<iframe class="article-cover" src="${article.cover.url}" frameborder="0" allowfullscreen></iframe>`;
        }
        let html = `<h2 class="title">${article.title}</h2>
                    ${cover}
                    <div class="author-wrapper">
                        <img  class="profile-picture" src="${placeholder}" srcset="${article.picture}" width="100px">
                        <div class="author">${article.author}<p class="published-date">${article.added}</p></div>

                            <i class="far fa-heart fa-2x"></i>

                        </div>
                    <div class="text">${article.text}</div>  
                    <div class="text">${article.text}</div>  
                    <div class="text">${article.text}</div>  
                    <div>
                        <a title="back" class="back" href='javascript:history.back()'><- Back</a>
                    </div>`
                    ;
        this.element.innerHTML = html;

        //Like button functionality
        const likeIcon = document.querySelector('.fa-heart');
        this.setInitialLikeValue(likeIcon, this.isLiked(article.id));
        likeIcon.addEventListener('click', () => {
            likeIcon.classList.toggle('fas');
            this.toggleLike(article.id);
        });
    }

    //Load one article
    loadArticle (id) {
        ux.showLoadingMessage(this.element);
        this.articlesService.getArticle(id).then( article =>{
            if (!article.id) {
                ux.showNoDataMessage(this.element);
            } else {
                this.renderArticle(article);
            };
        }).catch((error) =>{
            console.error("ERROR RETRIEVING DATA", error);
        });
    }

     //Like Icon functions
    isLiked(id){
        return localStorage.getItem(`like-article-${id}`);
    };
    toggleLike(id){
        let likeValue = this.isLiked(id) == 'true' ? 'false' : 'true';
        localStorage.setItem(`like-article-${id}`, likeValue);
    };
    setInitialLikeValue (likeIcon, liked) {
        if (liked === 'true') likeIcon.classList.add('fas');
    };
}