import { getRepository, Repository } from 'typeorm';
import { Action } from '../../../contracts';
import { Article } from '../article.entity';
import { CreateUpdateArticleRequest } from '../validators/create-update-article.validator';

export class UpdateArticle implements Action {
  private articlesRepository: Repository<Article>;

  constructor(private article: Article, private data: CreateUpdateArticleRequest) {
    this.articlesRepository = getRepository(Article);
  }

  public async execute(): Promise<Article> {
    this.article.title = this.data.title;
    this.article.body = this.data.body;

    return this.articlesRepository.save(this.article);
  }
}
