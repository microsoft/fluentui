import { spinalCase } from '@microsoft/fast-web-utilities';
import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
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
  ...proxyAttributes,
  appearance: 'primary',
  shape: 'rounded',
  size: 'medium',
  href: 'href',
  ping: 'ping',
  hreflang: 'en-GB',
  referrerpolicy: 'no-referrer',
  rel: 'external',
  target: '_blank',
  type: 'foo',
};

// Boolean Attributes
const booleanAttributes = {
  iconOnly: true,
};

test.describe('Anchor Button - Regular Attributes', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-anchor--anchor-button', attributes));
    element = page.locator('fluent-anchor-button');
  });

  test.afterAll(async () => {
    await page.close();
  });

  for (const [attribute, value] of Object.entries(attributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the regular attribute: \`${attributeSpinalCase}\` to \`${value}\` on the element`, async () => {
      await element.evaluate(
        (node: any, { attribute, value }) => {
          node.setAttribute(attribute, value);
        },
        { attribute: attributeSpinalCase, value },
      );

      await expect(element).toHaveJSProperty(`${attribute}`, `${value}`);
    });
  }
});

test.describe('Anchor Button - Boolean Attributes', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-anchor--anchor-button', booleanAttributes));
    element = page.locator('fluent-anchor-button');
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Boolean attributes
  for (const [attribute, value] of Object.entries(booleanAttributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the boolean attribute: \`${attributeSpinalCase}\` to \`${value}\``, async () => {
      await element.evaluate(
        (node: any, { attribute, value }) => {
          node[attribute] = value;
        },
        { attribute, value },
      );

      await expect(element).toHaveJSProperty(attribute, value);
    });
  }

  test.describe('Anchor Button - Proxy Attributes', () => {
    let page: Page;
    let element: Locator;
    let proxy: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(fixtureURL('components-button-anchor--anchor-button', attributes));
      element = page.locator('fluent-anchor-button');
      proxy = element.locator('fluent-anchor-button');
    });

    test.afterAll(async () => {
      await page.close();
    });

    for (const [attribute, value] of Object.entries(proxyAttributes)) {
      const attributeSpinalCase = spinalCase(attribute);

      test(`should set the regular attribute: \`${attributeSpinalCase}\` to \`${value}\` on the internal proxy`, async () => {
        await element.evaluate(
          (node: any, { attribute, value }) => {
            node.setAttribute(attribute, value);
          },
          { attribute: attributeSpinalCase, value },
        );

        await expect(proxy).toHaveJSProperty(`${attribute}`, `${value}`);
      });
    }
  });

  test('should be focusable by default', async ({ page }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button>Button</fluent-anchor-button>
    `);

    await element.focus();

    await expect(element).toBeFocused();
  });
});
