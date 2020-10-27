import { getRepository, Repository } from 'typeorm';
import { Action } from '../../../contracts';
import { Article } from '../article.entity';
import { CreateUpdateArticleRequest } from '../validators';

export class CreateArticle implements Action {
  private articlesRepository: Repository<Article>;

  constructor(private data: CreateUpdateArticleRequest) {
    this.articlesRepository = getRepository(Article);
  }

  public async execute(): Promise<Article> {
    const article = new Article();

    article.title = this.data.title;
    article.body = this.data.body;

    return this.articlesRepository.save(article);
  }
}
