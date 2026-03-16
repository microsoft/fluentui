import { expect, test } from '../../test/playwright/index.js';

test.describe('Accordion', () => {
  test.use({
    innerHTML: 'Hello, World!',
    tagName: 'fluent-accordion',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-accordion');
    });

    expect(hasError).toBe(false);
  });

  test('should set an expand mode of `multi` when passed to the `expand-mode` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'multi' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    await expect(element).toHaveAttribute('expand-mode', 'multi');
  });

  test('should open/close appropriate accordion items on Enter key in single expand mode', async ({ fastPage }) => {
    const { element } = fastPage;
    const accordionItems = element.locator('fluent-accordion-item');
    const firstItem = accordionItems.nth(0);
    const secondItem = accordionItems.nth(1);

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item tabindex="0" id="item-one">
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item id="item-two">
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
      `,
    });

    await expect(firstItem).toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', true);
    await expect(secondItem).not.toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await firstItem.focus();

    await expect(firstItem).toBeFocused();

    await secondItem.locator('button').press('Enter');

    await expect(firstItem).not.toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', false);
    await expect(secondItem).toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', true);
  });

  test('should open/close appropriate accordion items on Enter key in multi expand mode', async ({ fastPage }) => {
    const { element } = fastPage;
    const accordionItems = element.locator('fluent-accordion-item');
    const firstItem = accordionItems.nth(0);
    const secondItem = accordionItems.nth(1);

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'multi' },
      innerHTML: /* html */ `
        <fluent-accordion-item tabindex="0" id="item-one">
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item id="item-two">
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
      `,
    });

    await expect(firstItem).toHaveJSProperty('expanded', false);
    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).not.toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await firstItem.evaluate(node => {
      node.focus();
    });

    await expect(firstItem).toBeFocused();

    await secondItem.locator('button').press('Enter');

    await expect(secondItem).toHaveAttribute('expanded');
    await expect(secondItem).toHaveJSProperty('expanded', true);

    await expect(firstItem).not.toHaveAttribute('expanded');
    await expect(firstItem).toHaveJSProperty('expanded', false);
  });

  test('should set an expand mode of `single` when passed to the `expand-mode` attribute', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    await expect(element).toHaveAttribute('expand-mode', 'single');
  });

  test('should set a default expand mode of `multi` when `expand-mode` attribute is not passed', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    await expect(element).toHaveJSProperty('expandmode', 'multi');

    await expect(element).toHaveAttribute('expand-mode', 'multi');
  });

  test('should expand/collapse items when clicked in multi mode', async ({ fastPage }) => {
    const { element } = fastPage;
    const items = element.locator('fluent-accordion-item');

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'multi' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    await items.nth(0).click();

    await items.nth(1).click();

    await expect(items.nth(0)).toHaveAttribute('expanded');

    await expect(items.nth(1)).toHaveAttribute('expanded');
  });

  test('should only have one expanded item in single mode', async ({ fastPage }) => {
    const { element } = fastPage;
    const items = element.locator('fluent-accordion-item');
    const firstItem = items.nth(0);
    const secondItem = items.nth(1);

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded');

    await expect(secondItem).not.toHaveAttribute('expanded');

    const secondItemButton = secondItem.locator(`[part="button"]`);

    await secondItemButton.click();

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).toHaveAttribute('expanded');
  });

  test("should set the expanded items' button to aria-disabled when in single expand mode", async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded');

    await expect(firstItem.locator('button')).toHaveAttribute('aria-disabled', 'true');

    await secondItem.click();

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled', 'true');
    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled', 'false');

    await expect(secondItem).toHaveAttribute('expanded');

    await expect(secondItem.locator('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test("should remove an expanded items' expandbutton aria-disabled attribute when expand mode changes from single to multi", async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded');

    await expect(firstItem.locator('button')).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate(node => {
      node.setAttribute('expand-mode', 'multi');
    });

    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled');
  });

  test('should set the first item as expanded if no child is expanded by default in single mode', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: {
        'expand-mode': 'single',
      },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    await expect(firstItem).toHaveAttribute('expanded');

    await expect(secondItem).not.toHaveAttribute('expanded');

    await secondItem.evaluate<void>(node => node.setAttribute('expanded', ''));

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).toHaveAttribute('expanded');
  });

  test('should set the first item with an expanded attribute to expanded in single mode', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: {
        'expand-mode': 'single',
      },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item expanded>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
        <fluent-accordion-item expanded>
          <span slot="heading">Heading 3</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    const thirdItem = items.nth(2);

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).toHaveAttribute('expanded');

    await expect(thirdItem).not.toHaveAttribute('expanded');
  });

  test('should allow disabled items to be expanded when in single mode', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: {
        'expand-mode': 'single',
      },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <span slot="heading">Heading 1</span>
          <div>Content 1</div>
        </fluent-accordion-item>
        <fluent-accordion-item expanded disabled>
          <span slot="heading">Heading 2</span>
          <div>Content 2</div>
        </fluent-accordion-item>
        <fluent-accordion-item expanded>
          <span slot="heading">Heading 3</span>
          <div>Content 2</div>
        </fluent-accordion-item>
      `,
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    const thirdItem = items.nth(2);

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).toHaveAttribute('expanded');

    await expect(thirdItem).toHaveAttribute('expanded');

    await secondItem.evaluate(node => {
      node.removeAttribute('disabled');
    });

    await expect(firstItem).not.toHaveAttribute('expanded');

    await expect(secondItem).toHaveAttribute('expanded');

    await expect(thirdItem).not.toHaveAttribute('expanded');
  });

  test('should ignore `change` events from components other than accordion items', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'expand-mode': 'single' },
      innerHTML: /* html */ `
        <fluent-accordion-item>
          <div slot="heading">Accordion Item 1 Heading</div>
          Accordion Item 1 Content
        </fluent-accordion-item>
        <fluent-accordion-item>
          <div slot="heading">Accordion Item 2 Heading</div>
          <fluent-checkbox>A checkbox as content</fluent-checkbox>
        </fluent-accordion-item>
      `,
    });

    const item = element.locator('fluent-accordion-item').nth(1);

    const button = item.locator('button[part="button"]');

    await button.click();

    await expect(item).toHaveAttribute('expanded');

    const checkbox = item.locator('fluent-checkbox');

    await checkbox.click();

    await expect(item).toHaveAttribute('expanded');
  });
});
