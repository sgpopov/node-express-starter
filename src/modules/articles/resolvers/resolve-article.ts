import { Action, createParamDecorator, NotFoundError } from 'routing-controllers';
import { Request } from 'express';
import { ViewArticle } from '../actions/view-article.action';

export function ArticleResolver(): any {
  return createParamDecorator({
    value: async (action: Action) => {
      const request = action.request as Request;
      const act = new ViewArticle(Number(request.params.id));
      const article = await act.execute();

      if (!article) {
        throw new NotFoundError();
      }

      return article;
    },
  });
}
