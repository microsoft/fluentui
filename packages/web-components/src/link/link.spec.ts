import { spinalCase } from '@microsoft/fast-web-utilities';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { Link } from './link.js';

const proxyAttributes = {
  href: 'href',
  ping: 'ping',
  hreflang: 'en-GB',
  referrerpolicy: 'no-referrer',
  rel: 'external',
  target: '_blank',
  type: 'foo',
};

// Regular Attributes
const attributes = {
  appearance: 'subtle',
  ...proxyAttributes,
};

test.describe('Link', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-link--link'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-link'));
  });

  for (const [attribute, value] of Object.entries(attributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the regular attribute: \`${attributeSpinalCase}\` to \`${value}\` on the element`, async ({
      page,
    }) => {
      const element = page.locator('fluent-link');

      await page.setContent(/* html */ `
        <fluent-link ${attributeSpinalCase}="${value}"></fluent-link>
      `);

      await expect(element).toHaveJSProperty(`${attribute}`, `${value}`);
    });
  }

  for (const [attribute, value] of Object.entries(proxyAttributes)) {
    test(`should set the regular attribute: \`${attribute}\` to \`${value}\` on the internal proxy`, async ({
      page,
    }) => {
      const element = page.locator('fluent-link');
      const proxy = element.locator('a');

      await page.setContent(/* html */ `
        <fluent-link ${attribute}="${value}"></fluent-link>
      `);

      await expect(proxy).toHaveAttribute(`${attribute}`, `${value}`);
    });
  }

  test('should add a custom state matching the `appearance` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-link');

    await element.evaluate((node: Link) => {
      node.appearance = 'subtle';
    });

    expect(await element.evaluate((node: Link) => node.elementInternals.states.has('subtle'))).toBe(true);

    await element.evaluate((node: Link) => {
      node.appearance = undefined;
    });

    expect(await element.evaluate((node: Link) => node.elementInternals.states.has('subtle'))).toBe(false);
  });

  test('should add a custom state of `inline` when true', async ({ page }) => {
    const element = page.locator('fluent-link');

    await element.evaluate((node: Link) => {
      node.inline = true;
    });

    expect(await element.evaluate((node: Link) => node.elementInternals.states.has('inline'))).toBe(true);

    await element.evaluate((node: Link) => {
      node.inline = false;
    });

    expect(await element.evaluate((node: Link) => node.elementInternals.states.has('inline'))).toBe(false);
  });
});
