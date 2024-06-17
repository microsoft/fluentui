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

  test('should navigate to the provided url when clicked', async ({ page }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    await element.click();

    await expect(page).toHaveURL(/#foo$/);
  });

  test('should open a new tab when middle clicked', async ({ page, context }) => {
    // currently in Playwright there's no way to know if the new page is a new window or a new tab
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    const pagePromise = context.waitForEvent('page');

    await element.click({ button: 'middle' });

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL(/#foo$/);
  });

  // TODO: currently in Playwright there's no way to know if the new page is a new window or a new tab,
  // and all pages are treated as focused. See https://playwright.dev/docs/pages#multiple-pages
  test('should open the link in a new unfocused tab when `CtrlOrMeta` is pressed while clicked', async ({
    page,
    context,
  }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    const pagePromise = context.waitForEvent('page');

    await element.click({ modifiers: ['ControlOrMeta'] });

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL(/#foo$/);
  });

  // TODO: currently in Playwright there's no way to know if the new page is a new window or a new tab,
  // and all pages are treated as focused. See https://playwright.dev/docs/pages#multiple-pages
  test('should open the link in a new window when `Shift` is pressed while clicked', async ({ page, context }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    const pagePromise = context.waitForEvent('page');

    await element.click({ modifiers: ['Shift'] });

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL(/#foo$/);
  });

  test('should open the link in the same tab when `Enter` is pressed', async ({ page }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    await element.focus();

    await element.press('Enter');

    await expect(page).toHaveURL(/#foo$/);
  });

  // TODO: currently in Playwright there's no way to know if the new page is a new window or a new tab,
  // and all pages are treated as focused. See https://playwright.dev/docs/pages#multiple-pages
  test('should open the link in a new unfocused tab when `CtrlOrMeta+Enter` is pressed', async ({ page, context }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    const pagePromise = context.waitForEvent('page');

    await element.press('ControlOrMeta+Enter');

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL(/#foo$/);
  });

  // TODO: currently in Playwright there's no way to know if the new page is a new window or a new tab,
  // and all pages are treated as focused. See https://playwright.dev/docs/pages#multiple-pages
  test('should open the link in a new focused tab when `CtrlOrMeta+Shift+Enter` is pressed', async ({
    page,
    context,
  }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button href="#foo"></fluent-anchor-button>
    `);

    const pagePromise = context.waitForEvent('page');

    await element.press('ControlOrMeta+Shift+Enter');

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL(/#foo$/);
  });

  test('should NOT open the link when no `href` is provided', async ({ page }) => {
    const element = page.locator('fluent-anchor-button');

    await page.setContent(/* html */ `
      <fluent-anchor-button></fluent-anchor-button>
    `);

    await test.step('when clicked', async () => {
      await element.click();

      await expect(page).not.toHaveURL(/#/);
    });

    await test.step('when `Enter` is pressed', async () => {
      await element.focus();

      await element.press('Enter');

      await expect(page).not.toHaveURL(/#/);
    });
  });
});
