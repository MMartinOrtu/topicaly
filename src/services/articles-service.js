import { APIService } from 'services/api-service';

export class ArticlesService {
  constructor(uri, APIService) {
    this.uri = uri;
    this.APIService =APIService;
  }

  async getArticles() {
    return this.APIService.get(this.uri);
  }

  async getArticle(id) {
    return this.APIService.get(`${this.uri}/${id}`);
  }
}

