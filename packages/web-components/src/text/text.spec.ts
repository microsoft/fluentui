import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Text } from './text.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

test.describe('Text Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-text--text'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-text'));
  });

  for (const attribute of ['nowrap', 'truncate', 'italic', 'underline', 'strikethrough', 'block']) {
    test(`should set and reflect and update the ${attribute} attribute and property when provided`, async ({
      page,
    }) => {
      const element = page.locator('fluent-text');

      await page.setContent(/* html */ `
        <fluent-text ${attribute}>Text</fluent-text>
      `);

      await expect(element).toHaveAttribute(attribute);

      await expect(element).toHaveJSProperty(attribute, true);

      await expect(element).toHaveCustomState(attribute);

      await element.evaluate((node: any, attribute) => {
        node[attribute] = false;
      }, attribute);

      await expect(element).not.toHaveAttribute(attribute);

      await expect(element).toHaveJSProperty(attribute, false);

      await expect(element).not.toHaveCustomState(attribute);
    });
  }

  for (const value of Object.values(TextSize)) {
    test(`should set and reflect the size attribute to \`${value}\` when provided`, async ({ page }) => {
      const element = page.locator('fluent-text');

      await page.setContent(/* html */ `
        <fluent-text size="${value}">Text</fluent-text>
      `);

      await expect(element).toHaveJSProperty('size', value);

      await expect(element).toHaveAttribute('size', value);

      await expect(element).toHaveCustomState(`size-${value}`);
    });
  }

  for (const value of Object.values(TextWeight)) {
    test(`should set and reflect the weight attribute to the \`${value}\` when provided`, async ({ page }) => {
      const element = page.locator('fluent-text');

      await page.setContent(/* html */ `
        <fluent-text weight="${value}">Text</fluent-text>
      `);

      await expect(element).toHaveJSProperty('weight', value);

      await expect(element).toHaveAttribute('weight', value);

      await expect(element).toHaveCustomState(value);
    });
  }

  for (const value of Object.values(TextAlign)) {
    test(`should set and reflect the align attribute to \`${value}\` when provided`, async ({ page }) => {
      const element = page.locator('fluent-text');

      await element.evaluate((node: Text, alignValue: string) => {
        node.align = alignValue as TextAlign;
      }, value as string);

      await expect(element).toHaveJSProperty('align', value);

      await expect(element).toHaveAttribute('align', value);

      await expect(element).toHaveCustomState(value);
    });
  }

  for (const value of Object.values(TextFont)) {
    test(`should set and reflect the font attribute to \`${value}\` when provided`, async ({ page }) => {
      const element = page.locator('fluent-text');

      await element.evaluate((node: Text, fontValue: string) => {
        node.font = fontValue as TextFont;
      }, value as string);

      await expect(element).toHaveJSProperty('font', value);

      await expect(element).toHaveAttribute('font', value);

      await expect(element).toHaveCustomState(value);
    });
  }
});
