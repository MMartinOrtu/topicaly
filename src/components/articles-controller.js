import { ArticlesService } from 'services/articles-service.js';

import placeholder from 'assets/user-solid.svg';

export class ArticlesController {
    constructor (selector, articlesService){
        this.element= document.querySelector(selector);
        this.articlesService = articlesService;
    }


    loadArticles () {
        console.log(this.element);
        this.articlesService.getArticles().then( articles =>{
            let html = '';
            for (let article of articles) {
            html += `<div class="articles">
                        <div class="cover">
                            <img src="${article.cover}">
                        </div>
                        <div class="info">
                            <h2 class="title">${article.title}</h2>
                            <div class="text">text</div>
                            <div class="author">${article.author}</div>
                            <img  class="profile-picture" src="${placeholder}" srcset="${article.picture}" width="100px">
                            <time class="published-date">${article.added}</time>
                            <a href="">Comentarios</a>
                        </div>
                </div>`;
        }
        this.element.innerHTML = html;
    });

    }

}


/* export default { ArticlesController }; */



