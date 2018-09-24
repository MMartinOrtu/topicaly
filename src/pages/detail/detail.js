import 'styles/style.scss';
import queryString from 'query-string';
import { HeaderController } from 'components/header-controller.js';
import { APIService } from 'services/api-service.js';
import { ArticlesService } from 'services/articles-service.js';
import { ArticlesController } from 'components/articles-controller.js';
import { CommentsService } from 'services/comments-service.js';
import { FormController } from 'components/form-controller.js';
import { CommentsController } from 'components/comments-controller.js';
import { PubSub } from 'pubsub-js';



let apiService = new APIService();
let articlesService = new ArticlesService ('articles', apiService );
let commentsService = new CommentsService ('comments', apiService );

const query = queryString.parse(window.location.search);
const articleId = query && query.id;

let headerController = new HeaderController(".web-header");
let articlesController = new ArticlesController('.article-detail', articlesService, commentsService, PubSub);
let commentsController = new CommentsController('.comments-list', articleId, commentsService, PubSub)


if (articleId) {
  articlesController.loadArticle(articleId);
  articlesController.loadCommentsForm();
  let formController = new FormController('.comments-form',articleId, commentsService, PubSub);
  commentsController.callCommentsListener();;
}

