import { spinalCase } from '@microsoft/fast-web-utilities';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

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
});
