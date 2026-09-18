import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../../src/api/resources/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  articleWithoutTags;
  articleWithOneTag;
  createdArticleAndPage;
  registeredUser;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },

  createdArticleAndPage: async (
    { registeredUser, articlesApi, logger, pages }, use) => {
    const article = generateNewArticleData(logger, 1);

    const apiArticle = {
      title: article.title,
      description: article.description,
      body: article.text,
      tagList: article.tags,
    };

    const response = await articlesApi.createArticle(
      apiArticle,
      registeredUser.token,
    );

    await articlesApi.assertSuccessResponseCode(response);

    const body = await response.json();

    await use({ page: pages[1], article: body.article });
  },
});
