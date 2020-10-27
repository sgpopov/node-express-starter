import { getRepository, Repository } from 'typeorm';
import { Action } from '../../../contracts';
import { Article } from '../article.entity';

export class ViewArticle implements Action {
  private articlesRepository: Repository<Article>;

  constructor(private articleId: number) {
    this.articlesRepository = getRepository(Article);
  }

  public async execute(): Promise<Article> {
    return this.articlesRepository.findOne(this.articleId);
  }
}
