import { expect, test } from '@playwright/test';
import { assertFixedIconSizes, assertIconSlots, waitForIconFonts, type IconRenderer } from './icon-assertions';
import { assertHalfStarClipping } from './half-star-assertions';

const stories = [
  'default-theme',
  'default-icon-slots',
  'all-presence-icons',
  'half-star-clipping',
  'custom-icon-slots',
  'italic-slot-content',
  'mixed-slot-content',
  'custom-svg-slots',
  'custom-icon-slots-high-contrast',
  'mixed-slot-content-high-contrast',
];

test('focused build contains exactly the shared icon stories', async ({ request }, testInfo) => {
  const prefix = testInfo.project.name === 'fonts' ? 'icon-sizing-fonts' : 'icon-sizing';
  const response = await request.get('index.json');
  expect(response.ok()).toBeTruthy();
  const index: { entries: Record<string, { importPath: string }> } = await response.json();
  expect(Object.keys(index.entries).sort()).toEqual(stories.map(story => `${prefix}--${story}`).sort());
  expect(new Set(Object.values(index.entries).map(entry => entry.importPath)).size).toBe(1);
});

for (const forcedColors of [false, true]) {
  const selectedStories = forcedColors
    ? ['custom-icon-slots-high-contrast', 'mixed-slot-content-high-contrast']
    : stories;
  for (const story of selectedStories) {
    test(`${story}${forcedColors ? ' with forced colors' : ''}`, async ({ page }, testInfo) => {
      const renderer: IconRenderer = testInfo.project.name === 'fonts' ? 'fonts' : 'svg';
      const prefix = renderer === 'fonts' ? 'icon-sizing-fonts' : 'icon-sizing';
      const pageErrors: string[] = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.emulateMedia({ forcedColors: forcedColors ? 'active' : 'none' });
      await page.goto(`iframe.html?id=${prefix}--${story}&viewMode=story`);
      const root = page.locator('#storybook-root');
      await expect(root).toHaveAttribute('data-icon-story-ready', 'true');
      await expect(
        root.locator('[data-testid="rating-extra-large"], [data-slot-case], [data-half-star-case]').first(),
      ).toBeVisible();
      await waitForIconFonts(root);
      if (story === 'default-theme') {
        await assertFixedIconSizes(root, renderer);
      } else if (story === 'half-star-clipping') {
        await assertHalfStarClipping(root, renderer);
      } else {
        await assertIconSlots(root, renderer);
        for (const size of ['small', 'medium', 'large']) {
          const example = root.locator(`[data-slot-case="SearchBox.${size}.contentAfter"]`);
          if (await example.count()) {
            await example.locator('input').click();
            await expect(example.locator('.fui-SearchBox__contentAfter')).toBeVisible();
            await assertIconSlots(root, renderer);
          }
        }
      }
      expect(pageErrors).toEqual([]);
    });
  }
}
