import * as HttpStatus from 'http-status-codes';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  OnUndefined,
} from 'routing-controllers';
import { Article } from './article.entity';
import { CreateUpdateArticleRequest } from './validators';
import {
  IndexArticles,
  ViewArticle,
  CreateArticle,
  UpdateArticle,
  DeleteArticle,
} from './actions';
import { ArticleResolver } from './resolvers/resolve-article';

@JsonController('/articles')
class ArticlesController {
  @Get('/')
  async index(): Promise<Article[]> {
    const action = new IndexArticles();

    return action.execute();
  }

  @Get('/:id')
  async view(@Param('id') id: number): Promise<Article> {
    const action = new ViewArticle(id);

    return action.execute();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body({ required: true }) data: CreateUpdateArticleRequest): Promise<Article> {
    const action = new CreateArticle(data);

    return action.execute();
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @ArticleResolver() article: Article, @Body({ required: true }) data: CreateUpdateArticleRequest,
  ): Promise<Article> {
    const action = new UpdateArticle(article, data);

    return action.execute();
  }

  @Delete('/:id')
  @OnUndefined(HttpStatus.NO_CONTENT)
  async remove(@ArticleResolver() article: Article): Promise<void> {
    const action = new DeleteArticle(article);

    return action.execute();
  }
}

export default ArticlesController;
