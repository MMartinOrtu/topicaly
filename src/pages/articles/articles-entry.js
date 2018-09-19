import 'styles/style.scss';
import { HeaderController } from 'components/header-controller.js';
import { APIService } from 'services/api-service.js';
import { ArticlesService } from 'services/articles-service.js';
import { ArticlesController } from 'components/articles-controller.js';


let headerController = new HeaderController(".web-header");

let apiService = new APIService();

let articlesService = new ArticlesService ('articles', apiService );

let articlesController = new ArticlesController('.articles-list', articlesService);

articlesController.loadArticles()


