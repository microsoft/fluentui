import { expect, test } from '../../test/playwright/index.js';
import type { Link } from './link.js';
import { LinkAppearance } from './link.options.js';

const attributes = {
  download: 'download',
  href: 'href',
  ping: 'ping',
  hreflang: 'en-GB',
  referrerpolicy: 'no-referrer',
  rel: 'external',
  target: '_blank',
  type: 'foo',
};

test.describe('Link', () => {
  test.use({ tagName: 'fluent-link' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-link');
    });

    expect(hasError).toBe(false);
  });

  test(`should set each property to match its corresponding attribute`, async ({ fastPage }) => {
    const { element } = fastPage;
    const anchor = element.locator('a');

    for (const [attribute, value] of Object.entries(attributes)) {
      await test.step(`should set the \`${attribute}\` property to match the \`${attribute}\` attribute`, async () => {
        await fastPage.setTemplate({ attributes: { [attribute]: value } });

        await expect(element).toHaveAttribute(attribute, value);

        await expect(element).toHaveJSProperty(attribute, value);
      });

      await test.step(`should set the \`${attribute}\` attribute on the internal anchor element`, async () => {
        await expect(anchor).toHaveAttribute(attribute, value);
      });
    }
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(LinkAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });

  test('should add an "inline" attribute when the `inline` property is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.evaluate((node: Link) => {
      node.inline = true;
    });

    await expect(element).toHaveAttribute('inline');

    await element.evaluate((node: Link) => {
      node.inline = false;
    });

    await expect(element).not.toHaveAttribute('inline');
  });
});
