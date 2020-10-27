import { getRepository, Repository } from 'typeorm';
import { Action } from '../../../contracts';
import { Article } from '../article.entity';

export class DeleteArticle implements Action {
  private articlesRepository: Repository<Article>;

  constructor(private article: Article) {
    this.articlesRepository = getRepository(Article);
  }

  public async execute(): Promise<void> {
    await this.articlesRepository.delete(this.article.id);
  }
}
