import { ArticlesService } from 'services/articles-service.js';

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
            html += `<article class="article">
                <div class="cover">
                    <img src="${article.cover}" alt="${article.artist} - ${article.title}">
                </div>
                <div class="info">
                    <div class="title">${article.title}</div>
                    <div class="artist">${article.artist}</div>
                </div>
            </article>`;
        }
        this.element.innerHTML = html;
    });

    }

}


/* export default { ArticlesController }; */



