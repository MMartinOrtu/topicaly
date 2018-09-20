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
                let cover= `<img class="article-cover" src="${article.cover.url}" alt="Article image">`;
                if (article.cover.type === "video"){
                    cover = `<iframe class="article-cover" src="${article.cover.url}" frameborder="0" allowfullscreen></iframe>`;
                }
            html += `<div class="articles">
                        <div class="cover">
                            ${cover}
                        </div>
                        <div class="info">
                            <h2 class="title">${article.title}</h2>
                              <div class="autor-wrapper">
                                <img  class="profile-picture hide-elements" src="${placeholder}" srcset="${article.picture}" width="100px">
                                <div class="author">${article.author}</div>
                            </div> 
                             <div class="text hide-elements">${article.text}</div>
 
                            <p class="published-date">${article.added}</p>
                            <a href="" class="hide-elements">Comentarios</a>
                        </div>
                </div>`;
        }
        this.element.innerHTML = html;
    });

    }

}


/* export default { ArticlesController }; */



