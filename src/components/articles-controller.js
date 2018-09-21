import { ArticlesService } from 'services/articles-service.js';

import placeholder from 'assets/user-solid.svg';

export class ArticlesController {
    constructor (selector, articlesService){
        this.element= document.querySelector(selector);
        this.articlesService = articlesService;
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Se ha producido un error</div>';
    }

    showNoSongsMessage() {
        this.element.innerHTML = '<div class="info">No hay ninguna canción</div>';
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
                                <p class="published-date">${article.added}</p>
                                <a href="" class="hide-elements comments">Comentarios</a>
                            </div>
                    </div>`;
            }
            this.element.innerHTML = html;
        });

    }
    loadArticle (id) {
        console.log(this.element);
        this.articlesService.getArticle(id).then( article =>{

            let cover= `<img class="article-cover" src="${article.cover.url}" alt="Article image">`;
            if (article.cover.type === "video"){
                cover = `<iframe class="article-cover" src="${article.cover.url}" frameborder="0" allowfullscreen></iframe>`;
            }
            let html = `<h2 class="title">${article.title}</h2>
                        ${cover}
                        <div class="author-wrapper">
                            <img  class="profile-picture" src="${placeholder}" srcset="${article.picture}" width="100px">
                            <div class="author">${article.author}<p class="published-date">${article.added}</p></div>
                        </div>
                        <div class="text">${article.text}</div>  
                        <div>
                            <a title="back" class="back" href='javascript:history.back()'><- Back</a>
                        </div>`
                        ;

            this.element.innerHTML = html;
        });

    }

}




