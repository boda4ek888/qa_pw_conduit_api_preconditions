import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test('View an article created by another registered user', async ({
    pages,
  users,
  createdArticleAndPage,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

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
