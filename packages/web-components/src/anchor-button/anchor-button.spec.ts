import { spinalCase } from '@microsoft/fast-web-utilities';
import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

// Regular Attributes
const attributes = {
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
  ariaControls: 'testId',
  ariaCurrent: 'page',
  ariaDescribedby: 'testId',
  ariaDetails: 'testId',
  ariaErrormessage: 'test',
  ariaFlowto: 'testId',
  ariaInvalid: 'spelling',
  ariaKeyshortcuts: 'F4',
  ariaLabel: 'foo',
  ariaLabelledby: 'testId',
  ariaLive: 'polite',
  ariaOwns: 'testId',
  ariaRelevant: 'removals',
  ariaRoledescription: 'slide',
};

// Boolean Attributes
const booleanAttributes = {
  iconOnly: true,
  disabled: true,
  disabledFocusable: true,
  ariaAtomic: true,
  ariaBusy: false,
  ariaDisabled: true,
  ariaExpanded: true,
  ariaHaspopup: true,
  ariaHidden: true,
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

    test(`should set the regular attribute: \`${attributeSpinalCase}\` to \`${value}\` on the internal control`, async () => {
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

  test(`should have transparent border when the \`disabled\` or \`disabled-focus\` attribute is present`, async ({
    page,
  }) => {
    await element.evaluate((node: any) => {
      node.setAttribute('appearance', 'primary');
      node.setAttribute('disabled', true);
    });

    await expect(element).toHaveCSS('border-color', 'rgb(0, 0, 0)');

    await element.evaluate((node: any) => {
      node.setAttribute('disabled', false); // Reset
      node.setAttribute('disabled-focusable', true);
    });

    await expect(element).toHaveCSS('border-color', 'rgb(0, 0, 0)');
  });
});
