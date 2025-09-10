import { expect, test } from '../../test/playwright/index.js';
import { AvatarAppearance, AvatarColor, AvatarSize } from './avatar.options.js';

test.describe('Avatar', () => {
  test.use({
    tagName: 'fluent-avatar',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-avatar');
    });

    expect(hasError).toBe(false);
  });

  test('should have a `role` of `img`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'img');
  });

  test('When no name value is set, should render with custom initials based on the provided initials value', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { initials: 'JD' } });

    await expect(element).toContainText('JD');
  });

  test('When name value is set, should generate initials based on the provided name value', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { name: 'John Doe' } });

    await expect(element).toContainText('JD');
  });

  test('When `name` and `initials` attributes are both set, should prioritize the provided initials', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { initials: 'JJ', name: 'Julie Wright' } });

    await expect(element).toContainText('JJ');
  });

  test('should set the `active` property to `active` when the `active` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { active: 'active' } });

    await expect(element).toHaveJSProperty('active', 'active');
  });

  test('should set the `active` property to `inactive` when the `active` attribute is set to `inactive`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { active: 'inactive' } });

    await expect(element).toHaveJSProperty('active', 'inactive');
  });

  test('should have a data-color attribute of `neutral` when no color is provided', async ({ fastPage }) => {
    await expect(fastPage.element).toHaveAttribute('data-color', 'neutral');
  });

  test('should add a data-color attribute of `brand` when `brand is provided as the color', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { color: 'brand', 'color-id': 'pumpkin', name: 'John Doe' } });

    await expect(element).toHaveAttribute('data-color', 'brand');
  });

  test('should prioritize color derivation from `colorId` over `name` when set to "colorful"', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { color: 'colorful', 'color-id': 'pumpkin', name: 'Steve Smith' } });

    await expect(element).toHaveAttribute('data-color', 'pumpkin');
  });

  test('should set the `data-color` attribute to match the `color` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const color of Object.values(AvatarColor)) {
      await test.step(`should set the \`color\` property to \`${color}\``, async () => {
        await fastPage.setTemplate({ attributes: { color } });

        await expect(element).toHaveAttribute('color', color);

        await expect(element).toHaveJSProperty('color', color);

        // eslint-disable-next-line playwright/no-conditional-in-test
        if (color !== AvatarColor.colorful) {
          await expect.soft(element).toHaveAttribute('data-color', color);
        }
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(AvatarSize)) {
      await test.step(`should set the \`size\` property to \`${size}\``, async () => {
        await fastPage.setTemplate({ attributes: { size: `${size}` } });

        await expect(element).toHaveAttribute('size', `${size}`);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(AvatarAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });
});
