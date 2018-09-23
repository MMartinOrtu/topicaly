import 'styles/style.scss';
import { HeaderController } from 'components/header-controller.js';
import { APIService } from 'services/api-service.js';
import { ArticlesService } from 'services/articles-service.js';
import { CommentsService } from 'services/comments-service.js';
import { ArticlesController } from 'components/articles-controller.js';
import { PubSub } from 'pubsub-js';


let apiService = new APIService();
let articlesService = new ArticlesService ('articles', apiService );
let commentsService = new CommentsService ('comments', apiService );

let headerController = new HeaderController(".web-header");

let articlesController = new ArticlesController('.articles-list', articlesService, commentsService, PubSub);

articlesController.loadArticles();


