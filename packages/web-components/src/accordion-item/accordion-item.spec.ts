import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { AccordionItem } from './accordion-item.js';

test.describe('Accordion item', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-accordion--accordion'));

    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-accordion'),
        customElements.whenDefined('fluent-accordion-item'),
      ]),
    );
  });

  test('should set a default heading level of 2 when `headinglevel` is not provided', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element).toHaveJSProperty('headinglevel', 2);
  });

  test('should set the `aria-level` attribute on the internal heading element equal to the heading level', async ({
    page,
  }) => {
    const element = page.locator('fluent-accordion-item');
    const heading = page.locator(`[role="heading"]`);

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
      </fluent-accordion>
    `);

    await element.evaluate<void, AccordionItem>(node => {
      node.headinglevel = 3;
    });

    await expect(heading).toHaveAttribute('aria-level', '3');
  });

  test('should set `aria-expanded` property on the internal control equal to the `expanded` property', async ({
    page,
  }) => {
    const element = page.locator('fluent-accordion-item');
    const button = element.locator('button');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item expanded></fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await element.evaluate<void, AccordionItem>(node => {
      node.expanded = false;
    });

    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should set `disabled` attribute on the internal control equal to the `disabled` property', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');
    const button = element.locator('button');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item disabled></fluent-accordion-item>
        <fluent-accordion> </fluent-accordion
      ></fluent-accordion>
    `);

    await expect(button).toHaveAttribute('disabled');

    await element.evaluate<void, AccordionItem>(node => {
      node.disabled = false;
    });

    await expect(button).not.toHaveAttribute('disabled');
  });

  test('accordion-item should NOT be expandable via click when accordion is disabled', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item></fluent-accordion-item>
        <fluent-accordion-item disabled></fluent-accordion-item>
        <fluent-accordion-item></fluent-accordion-item>
      </fluent-accordion>
    `);
    const firstItem = element.nth(0);
    const secondItem = element.nth(1);

    await firstItem.click();
    await expect(firstItem).toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', true);

    await secondItem.click();
    await expect(secondItem).not.toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await expect(firstItem).toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', true);
  });

  test('should set internal properties to match the id when provided', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');
    const button = element.locator('button');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item id="foo"></fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element.locator(`[role="region"]`)).toHaveAttribute('aria-labelledby', 'foo');
    await expect(button).toHaveId('foo');
  });

  test('should set the size attribute to the provided size value', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item></fluent-accordion-item>
      </fluent-accordion>
    `);

    await element.evaluate<void, AccordionItem>(node => {
      node.size = 'small';
    });
    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate<void, AccordionItem>(node => {
      node.size = 'medium';
    });

    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate<void, AccordionItem>(node => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');

    await element.evaluate<void, AccordionItem>(node => {
      node.size = 'extra-large';
    });
    await expect(element).toHaveAttribute('size', 'extra-large');
    await expect(element).toHaveJSProperty('size', 'extra-large');
  });

  test('should set the block attribute when block is set to true', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item block></fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element).toHaveAttribute('block');
    await expect(element).toHaveJSProperty('block', true);

    await element.evaluate<void, AccordionItem>(node => {
      node.block = false;
    });

    await expect(element).not.toHaveAttribute('block');
    await expect(element).toHaveJSProperty('block', false);
  });

  test('should set the marker-position attribute to the provided value', async ({ page }) => {
    const element = page.locator('fluent-accordion-item');

    await page.setContent(/* html */ `
      <fluent-accordion>
        <fluent-accordion-item marker-position="end"></fluent-accordion-item>
      </fluent-accordion>
    `);

    await expect(element).toHaveAttribute('marker-position', 'end');
    await expect(element).toHaveJSProperty('markerPosition', 'end');

    await element.evaluate<void, AccordionItem>(node => {
      node.markerPosition = 'start';
    });

    await expect(element).toHaveAttribute('marker-position', 'start');
    await expect(element).toHaveJSProperty('markerPosition', 'start');
  });
});
