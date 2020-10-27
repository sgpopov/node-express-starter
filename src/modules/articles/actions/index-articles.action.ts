import { getRepository, Repository } from 'typeorm';
import { Action } from '../../../contracts';
import { Article } from '../article.entity';

export class IndexArticles implements Action {
  private articlesRepository: Repository<Article>;

  constructor() {
    this.articlesRepository = getRepository(Article);
  }

  public async execute(): Promise<Article[]> {
    const article = await this.articlesRepository.find();

    return article;
  }
}
