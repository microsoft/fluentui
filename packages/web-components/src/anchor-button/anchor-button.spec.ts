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
  appearance: 'primary',
  shape: 'rounded',
  size: 'medium',
  ...proxyAttributes,
};

// Boolean Attributes
const booleanAttributes = {
  iconOnly: true,
};

test.describe('Anchor Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-button-anchor--anchor-button'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-anchor-button'));
  });

  for (const [attribute, value] of Object.entries(attributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the regular attribute: \`${attributeSpinalCase}\` to \`${value}\` on the element`, async ({
      page,
    }) => {
      const element = page.locator('fluent-anchor-button');

      await page.setContent(/* html */ `
        <fluent-anchor-button ${attributeSpinalCase}="${value}"></fluent-anchor-button>
      `);

      await expect(element).toHaveJSProperty(`${attribute}`, `${value}`);
    });
  }

  // Boolean attributes
  for (const [attribute, value] of Object.entries(booleanAttributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the boolean attribute: \`${attributeSpinalCase}\` to \`${value}\``, async ({ page }) => {
      const element = page.locator('fluent-anchor-button');

      await page.setContent(/* html */ `
        <fluent-anchor-button ${attributeSpinalCase}></fluent-anchor-button>
      `);

      await expect(element).toHaveJSProperty(attribute, value);
    });
  }

  for (const [attribute, value] of Object.entries(proxyAttributes)) {
    test(`should set the regular attribute: \`${attribute}\` to \`${value}\` on the internal proxy`, async ({
      page,
    }) => {
      const element = page.locator('fluent-anchor-button');
      const proxy = element.locator('a');

      await page.setContent(/* html */ `
        <fluent-anchor-button ${attribute}="${value}"></fluent-anchor-button>
      `);

      await expect(proxy).toHaveAttribute(`${attribute}`, `${value}`);
    });
  }
});
