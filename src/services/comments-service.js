import { APIService } from 'services/api-service';

export class CommentsService {
    constructor(uri, APIService) {
      this.uri = uri;
      this.APIService =APIService;
    }

    async getComments(id) {
      return this.APIService.get(`${this.uri}/?articleId=${id}`);
    }

    async postComment(comment) {
      return this.APIService.post(comment, this.uri);
    }
  }