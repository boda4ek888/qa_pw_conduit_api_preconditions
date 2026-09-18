import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test('View an article as not registered user', async ({
  users,
  createdArticleAndPage,
}) => {

  const page = new ExternalViewArticlePage(createdArticleAndPage.page);

  await page.open(
    `https://conduit.mate.academy/article/${createdArticleAndPage.article.slug}`
    ,
  );
  await page.articleHeader.assertTitleIsVisible(
    createdArticleAndPage.article.title,
  );
  await page.articleContent.assertArticleTextIsVisible(
    createdArticleAndPage.article.body,
  );
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
