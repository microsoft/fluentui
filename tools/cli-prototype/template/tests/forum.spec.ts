import { expect, test, type Page } from '@playwright/test';

function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  return errors;
}

test('baseline component families are rendered and usable', async ({ page }, testInfo) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await expect(page.getByTestId('fluent-forum')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByTestId('forum-search')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Joined communities' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Home feed')).toBeVisible();
  await expect(page.getByTestId('community-design-systems')).toHaveText(/Design Systems4/);
  await expect(page.getByTestId('community-design-systems')).not.toHaveText(/Design Systems.*Design Systems/);
  await expect(page.getByLabel('Current feed')).toContainText('Home');
  await expect(page.getByText('Case study').first()).toBeVisible();
  await expect(page.getByText('About this forum')).toBeVisible();
  await expect(page.getByTestId('profile-menu-trigger')).toBeVisible();

  await page.getByTestId('create-post').hover();
  await expect(page.getByRole('tooltip', { name: 'Create a post' })).toBeVisible();
  await page.getByRole('link', { name: 'Read community guidelines' }).click();
  await expect(page.locator('#guidelines')).toBeVisible();
  await page.getByTestId('forum-search').hover();
  await page.evaluate(() => scrollTo({ top: 0 }));
  await expect(page.getByTestId('forum-search')).toBeVisible();
  const desktopScreenshot = testInfo.outputPath('fluent-forum-desktop.png');
  await page.screenshot({ animations: 'disabled', fullPage: true, path: desktopScreenshot });
  await testInfo.attach('fluent-forum-desktop', { contentType: 'image/png', path: desktopScreenshot });
  expect(browserErrors).toEqual([]);
});

test('search, community filter, saved filter, and sort produce deterministic feed results', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await expect(page.locator('[data-testid^="post-"]').first()).toContainText(
    'What changed when our product team started naming intent instead of color',
  );

  await page.getByTestId('sort-top').click();
  await expect(page.locator('[data-testid^="post-"]').first()).toContainText(
    'A keyboard review checklist that designers can run before handoff',
  );

  await page.getByTestId('forum-search').fill('perceived speed');
  await expect(page.locator('[data-testid^="post-"]')).toHaveCount(1);
  await expect(page.getByText('We measured perceived speed across four loading patterns')).toBeVisible();

  await page.getByTestId('forum-search').clear();
  await page.getByTestId('community-accessibility').click();
  await expect(page.locator('[data-testid^="post-"]')).toHaveCount(1);
  await expect(page.getByText('A keyboard review checklist that designers can run before handoff')).toBeVisible();

  await page.getByTestId('community-all').click();
  await page.getByTestId('saved-only').click();
  await expect(page.locator('[data-testid^="post-"]')).toHaveCount(1);
  await expect(page.getByTestId('post-post-focus')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('voting and saving update only the selected post', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await expect(page.getByTestId('score-post-tokens')).toHaveText('184');
  await page.getByTestId('upvote-post-tokens').click();
  await expect(page.getByTestId('score-post-tokens')).toHaveText('185');
  await expect(page.getByTestId('upvote-post-tokens')).toHaveAttribute('aria-pressed', 'true');
  await page.getByTestId('upvote-post-tokens').click();
  await expect(page.getByTestId('score-post-tokens')).toHaveText('184');

  const save = page.getByTestId('save-post-tokens');
  await expect(save).toHaveText('Save');
  await save.click();
  await expect(save).toHaveText('Saved');
  await expect(page.getByTestId('forum-toaster').getByText('Discussion saved', { exact: true })).toBeVisible();
  await page.getByTestId('saved-only').click();
  await expect(page.getByTestId('post-post-tokens')).toBeVisible();
  await expect(page.getByTestId('post-post-focus')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('post overflow menu actions produce moderation feedback', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await page.getByRole('button', { name: 'More post actions' }).first().click();
  await page.getByRole('menuitem', { name: 'Show fewer posts like this' }).click();
  await expect(page.getByText('Thanks for the signal')).toBeVisible();
  await expect(page.getByText(/You will see fewer posts like/)).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('post composer validates, publishes local content, and restores focus on escape', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  const create = page.getByTestId('create-post');
  await create.click();
  await expect(page.getByTestId('post-composer')).toBeVisible();
  await expect(page.getByTestId('post-composer').getByRole('button', { name: 'Clear selection' })).toHaveCount(0);
  await page.getByTestId('composer-submit').click();
  await expect(page.getByText('Use at least 8 characters for a clear title.')).toBeVisible();
  await expect(page.getByText('Add at least 20 characters of context.')).toBeVisible();
  await expect(page.getByText('Choose a community.')).toBeVisible();
  await expect(page.getByText('Choose a flair.')).toBeVisible();

  await page.getByTestId('composer-title').fill('A deterministic forum post from the composer');
  await page
    .getByTestId('composer-body')
    .fill('This body is long enough to prove that validated local submission works without a backend.');
  await page.getByTestId('composer-community').click();
  await page.getByRole('option', { name: 'Frontend Craft' }).click();
  await page.getByTestId('composer-flair').click();
  await page.getByRole('option', { name: 'Discussion' }).click();
  await expect(page.getByTestId('post-composer').getByRole('button', { name: 'Clear selection' })).toHaveCount(0);
  await page.getByTestId('composer-submit').click();

  await expect(page.getByTestId('post-composer')).toBeHidden();
  await expect(page.getByText('A deterministic forum post from the composer')).toBeVisible();
  await expect(page.getByTestId('forum-toaster').getByText('Discussion published', { exact: true })).toBeVisible();

  await create.click();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('post-composer')).toBeHidden();
  await expect(create).toBeFocused();
  expect(browserErrors).toEqual([]);
});

test('threaded replies can be added and collapsed', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await page.getByTestId('comments-toggle-post-tokens').click();
  await expect(page.getByTestId('comments-post-tokens')).toBeVisible();
  await page.getByTestId('reply-comment-tokens-1').click();
  const replyText = 'The compatibility map sounds like a practical bridge for incremental migration.';
  await page.getByTestId('reply-input-comment-tokens-1').fill(replyText);
  await page.getByTestId('submit-reply-comment-tokens-1').click();
  await expect(page.getByText(replyText)).toBeVisible();

  await page.getByTestId('collapse-comment-tokens-1').click();
  await expect(page.getByText(replyText)).toBeHidden();
  await page.getByTestId('collapse-comment-tokens-1').click();
  await expect(page.getByText(replyText)).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('preferences update theme, density, language, and feed length', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await page.getByTestId('profile-menu-trigger').click();
  await page.getByTestId('preferences-menu-item').click();
  await expect(page.getByTestId('preferences-drawer')).toBeVisible();

  await page.getByRole('switch', { name: 'Dark theme' }).click();
  await expect(page.getByTestId('fluent-forum')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('switch', { name: 'Compact feed' }).click();
  await page.getByTestId('comment-density').getByLabel('Compact').click();
  await page.getByTestId('language-select').selectOption('Français');
  await expect(page.getByTestId('language-select')).toHaveValue('Français');

  const slider = page.getByTestId('posts-per-page');
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('6');
  await page.getByTestId('preferences-done').click();
  await expect(page.getByTestId('preferences-drawer')).toBeHidden();
  expect(browserErrors).toEqual([]);
});

test('loading, empty, and error states are recoverable without fixed waits', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  await page.getByTestId('forum-search').fill('no discussion has this phrase');
  await expect(page.getByTestId('feed-empty')).toBeVisible();
  await page.getByTestId('forum-search').clear();

  await page.getByRole('button', { name: 'Refresh' }).click();
  await expect(page.getByTestId('feed-loading')).toBeVisible();
  await expect(page.getByTestId('feed-loading')).toBeHidden();
  await expect(page.getByTestId('post-post-tokens')).toBeVisible();

  await page.getByTestId('simulate-error').click();
  await expect(page.getByTestId('feed-error')).toBeVisible();
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(page.getByTestId('feed-loading')).toBeVisible();
  await expect(page.getByTestId('feed-error')).toBeHidden();
  await expect(page.getByTestId('post-post-tokens')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('mobile navigation and composer remain usable with keyboard focus', async ({ page }, testInfo) => {
  const browserErrors = collectBrowserErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const mobileSearch = page.getByTestId('forum-search');
  await expect(mobileSearch).toBeVisible();
  expect((await mobileSearch.boundingBox())?.width ?? 0).toBeGreaterThan(300);
  await mobileSearch.fill('perceived speed');
  await expect(page.locator('[data-testid^="post-"]')).toHaveCount(1);
  await expect(page.getByText('We measured perceived speed across four loading patterns')).toBeVisible();
  await mobileSearch.clear();

  await page.getByRole('button', { name: 'Open community navigation' }).click();
  await expect(page.getByTestId('community-drawer')).toBeVisible();
  await page.getByTestId('community-drawer').getByTestId('community-makers').click();
  await expect(page.getByTestId('community-drawer')).toBeHidden();
  await expect(page.getByText('Weekend build: a calm notification triage concept')).toBeVisible();
  const mobileScreenshot = testInfo.outputPath('fluent-forum-mobile.png');
  await page.screenshot({ animations: 'disabled', fullPage: true, path: mobileScreenshot });
  await testInfo.attach('fluent-forum-mobile', { contentType: 'image/png', path: mobileScreenshot });

  const mobileCreate = page.getByTestId('create-post-mobile');
  await mobileCreate.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('post-composer')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('post-composer')).toBeHidden();
  await expect(mobileCreate).toBeFocused();
  expect(browserErrors).toEqual([]);
});

test('profile menu supports keyboard navigation and notifications can be cleared', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  await page.goto('/');

  const profile = page.getByTestId('profile-menu-trigger');
  await profile.focus();
  await page.keyboard.press('Enter');
  const preferencesItem = page.getByRole('menuitem', { name: 'Preferences' });
  await expect(preferencesItem).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('preferences-drawer')).toBeVisible();
  await page.getByRole('button', { name: 'Close preferences' }).click();

  await page.getByTestId('notifications-trigger').click();
  await page.getByTestId('mark-notifications-read').click();
  await expect(page.getByTestId('notifications-trigger')).toHaveAttribute('aria-label', 'Notifications, 0 unread');
  await expect(page.getByTestId('forum-toaster').getByText('Notifications cleared', { exact: true })).toBeVisible();
  expect(browserErrors).toEqual([]);
});
