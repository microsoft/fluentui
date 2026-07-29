import { expect, test } from '../../test/playwright/index.js';
import { tagName } from './drawer-body.options.js';

test.describe('DrawerBody', () => {
  test.use({
    tagName,
    innerHTML: 'Drawer Body',
  });

  test('should create with `document.createElement()`', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should display a title when content is provided in the title slot', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
          <h2 slot="title">Drawer Title</h2>
      `,
    });

    await expect(element).toHaveText('Drawer Title');
  });

  test("should call the parent element's `hide` method when elements in the close slot are clicked", async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const closeButton = element.locator('#close-button');
    const customDrawer = page.locator('custom-drawer');

    await fastPage.setTemplate(/* html */ `
      <custom-drawer>
        <${tagName}>
          <h2 slot="title">Drawer Title</h2>
          <div>Drawer Body</div>
          <button id="close-button" slot="close">Close</button>
        </${tagName}>
      </custom-drawer>
    `);

    await customDrawer.evaluate((node: HTMLElement) => {
      (node as any).hide = () => {
        node.dataset.hideCalled = 'true';
      };
    });

    await closeButton.click();

    await expect(customDrawer).toHaveAttribute('data-hide-called', 'true');
  });

  test("should not throw an error if the parent element doesn't have a `hide` method when elements in the close slot are clicked", async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const closeButton = element.locator('#close-button');

    await fastPage.setTemplate(/* html */ `
      <div>
        <${tagName}>
          <h2 slot="title">Drawer Title</h2>
          <div>Drawer Body</div>
          <button id="close-button" slot="close">Close</button>
        </${tagName}>
      </div>
    `);

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await closeButton.click();

    expect(hasError).toBe(false);
  });
});
