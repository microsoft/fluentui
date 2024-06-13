import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Accordion', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-accordion');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-accordion--accordion'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set an expand mode of `multi` when passed to the `expand-mode` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="multi">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    await expect(element).toHaveAttribute('expand-mode', 'multi');
  });
  test('should navigate the accordion on arrow up/down keys', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-accordion>
            <fluent-accordion-item id="accordion-1" tabindex="0">
                <span slot="heading">Heading 1</span>
                <div>Content 1</div>
            </fluent-accordion-item>
            <fluent-accordion-item id="accordion-2">
                <span slot="heading">Heading 2</span>
                <div>Content 2</div>
            </fluent-accordion-item>
            <fluent-accordion-item id="accordion-3">
                <span slot="heading">Heading 3</span>
                <div>Content 3</div>
            </fluent-accordion-item>
          </fluent-accordion>
      `;
    });

    const accordionItems = page.locator('fluent-accordion-item') as Locator;

    await expect(accordionItems).toHaveCount(3);

    const firstItem = accordionItems.nth(0);
    const secondItem = accordionItems.nth(1);
    const thirdItem = accordionItems.nth(2);

    await firstItem.evaluate(node => {
      node.focus();
    });

    await expect(firstItem).toBeFocused();

    await firstItem.press('ArrowDown');
    await expect(secondItem).toBeFocused();

    await secondItem.press('ArrowDown');
    await expect(thirdItem).toBeFocused();

    await thirdItem.press('ArrowUp');
    await expect(secondItem).toBeFocused();

    await secondItem.press('ArrowUp');
    await expect(firstItem).toBeFocused();
  });

  test('should open/close appropriate accordion items on Enter key in multiple expand mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-accordion expand-mode="single">
            <fluent-accordion-item tabindex="0" id="item-one">
                <span slot="heading">Heading 1</span>
                <div>Content 1</div>
            </fluent-accordion-item>
            <fluent-accordion-item id="item-two">
                <span slot="heading">Heading 1</span>
                <div>Content 1</div>
            </fluent-accordion-item>
          </fluent-accordion>
      `;
    });

    const accordionItems = page.locator('fluent-accordion-item') as Locator;
    const firstItem = accordionItems.nth(0);
    const secondItem = accordionItems.nth(1);

    await expect(firstItem).toHaveAttribute('expanded', '');
    await expect(firstItem).toHaveJSProperty('expanded', true);
    await expect(secondItem).not.toHaveAttribute('expanded', '');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await firstItem.evaluate(node => {
      node.focus();
    });

    await expect(firstItem).toBeFocused();

    await firstItem.press('ArrowDown');

    await expect(secondItem).toBeFocused();

    await secondItem.press('Enter');

    await expect(firstItem).not.toHaveAttribute('expanded', '');
    await expect(firstItem).toHaveJSProperty('expanded', false);
    await expect(secondItem).toHaveAttribute('expanded', '');
    await expect(secondItem).toHaveJSProperty('expanded', true);
  });

  test('should open/close appropriate accordion items on Enter key in single expand mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-accordion expand-mode="multi">
            <fluent-accordion-item tabindex="0" id="item-one">
                <span slot="heading">Heading 1</span>
                <div>Content 1</div>
            </fluent-accordion-item>
            <fluent-accordion-item id="item-two">
                <span slot="heading">Heading 1</span>
                <div>Content 1</div>
            </fluent-accordion-item>
          </fluent-accordion>
      `;
    });

    const accordionItems = page.locator('fluent-accordion-item') as Locator;
    const firstItem = accordionItems.nth(0);
    const secondItem = accordionItems.nth(1);

    await expect(firstItem).toHaveJSProperty('expanded', false);
    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).not.toHaveAttribute('expanded', '');
    await expect(secondItem).toHaveJSProperty('expanded', false);

    await firstItem.evaluate(node => {
      node.focus();
    });

    await expect(firstItem).toBeFocused();

    await firstItem.press('ArrowDown');

    await expect(secondItem).toBeFocused();

    await secondItem.press('Enter');

    await expect(secondItem).toHaveAttribute('expanded', '');
    await expect(secondItem).toHaveJSProperty('expanded', true);

    await expect(firstItem).not.toHaveAttribute('expanded', '');
    await expect(firstItem).toHaveJSProperty('expanded', false);
  });

  test('should set an expand mode of `single` when passed to the `expand-mode` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    await expect(element).toHaveAttribute('expand-mode', 'single');
  });

  test('should set a default expand mode of `multi` when `expand-mode` attribute is not passed', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    await expect(element).toHaveJSProperty('expandmode', 'multi');

    await expect(element).toHaveAttribute('expand-mode', 'multi');
  });

  test('should expand/collapse items when clicked in multi mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="multi">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    await items.nth(0).click();

    await items.nth(1).click();

    await expect(items.nth(0)).toHaveAttribute('expanded', '');

    await expect(items.nth(1)).toHaveAttribute('expanded', '');
  });

  test('should only have one expanded item in single mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded', '');

    await expect(secondItem).not.toHaveAttribute('expanded', '');

    const secondItemButton = secondItem.locator(`[part="button"]`);

    await secondItemButton.click();

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).toHaveAttribute('expanded', '');
  });

  test("should set the expanded items' button to aria-disabled when in single expand mode", async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded', '');

    await expect(firstItem.locator('button')).toHaveAttribute('aria-disabled', 'true');

    await secondItem.click();

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled', 'true');
    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled', 'false');

    await expect(secondItem).toHaveAttribute('expanded', '');

    await expect(secondItem.locator('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test("should remove an expanded items' expandbutton aria-disabled attribute when expand mode changes from single to multi", async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    await firstItem.click();

    await expect(firstItem).toHaveAttribute('expanded', '');

    await expect(firstItem.locator('button')).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate(node => {
      node.setAttribute('expand-mode', 'multi');
    });

    await expect(firstItem.locator('button')).not.toHaveAttribute('aria-disabled', '');
  });

  test('should set the first item as expanded if no child is expanded by default in single mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <span slot="heading">Heading 1</span>
                        <div>Content 1</div>
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <span slot="heading">Heading 2</span>
                        <div>Content 2</div>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    await expect(firstItem).toHaveAttribute('expanded', '');

    await expect(secondItem).not.toHaveAttribute('expanded', '');

    await secondItem.evaluate<void>(node => node.setAttribute('expanded', ''));

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).toHaveAttribute('expanded', '');
  });

  test('should set the first item with an expanded attribute to expanded in single mode', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
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
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    const thirdItem = items.nth(2);

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).toHaveAttribute('expanded', '');

    await expect(thirdItem).not.toHaveAttribute('expanded', '');
  });

  test('should allow disabled items to be expanded when in single mode', async () => {
    test.slow();
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
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
                </fluent-accordion>
            `;
    });

    const items = element.locator('fluent-accordion-item');

    const firstItem = items.nth(0);

    const secondItem = items.nth(1);

    const thirdItem = items.nth(2);

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).toHaveAttribute('expanded', '');

    await expect(thirdItem).toHaveAttribute('expanded', '');

    await secondItem.evaluate(node => {
      node.removeAttribute('disabled');
    });

    await expect(firstItem).not.toHaveAttribute('expanded', '');

    await expect(secondItem).toHaveAttribute('expanded', '');

    await expect(thirdItem).not.toHaveAttribute('expanded', '');
  });

  test('should ignore `change` events from components other than accordion items', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-accordion expand-mode="single">
                    <fluent-accordion-item>
                        <div slot="heading">Accordion Item 1 Heading</div>
                        Accordion Item 1 Content
                    </fluent-accordion-item>
                    <fluent-accordion-item>
                        <div slot="heading">Accordion Item 2 Heading</div>
                        <fluent-checkbox>A checkbox as content</fluent-checkbox>
                    </fluent-accordion-item>
                </fluent-accordion>
            `;
    });

    const item = element.locator('fluent-accordion-item').nth(1);

    const button = item.locator(`button[part="button"]`);

    await button.click();

    await expect(item).toHaveAttribute('expanded', '');

    const checkbox = item.locator('fluent-checkbox');

    await checkbox.click();

    await expect(item).toHaveAttribute('expanded', '');
  });
});
