import type { Locator } from '@playwright/test';
import { expect, test } from '../../test/playwright/index.js';
import { tagName as DialogBodyTagName } from '../dialog-body/dialog-body.options.js';
import { tagName as TabTagName } from '../tab/tab.options.js';
import { tagName as TablistTagName } from '../tablist/tablist.options.js';
import { tagName as TextInputTagName } from '../text-input/text-input.options.js';
import type { Dialog } from './dialog.js';
import { tagName } from './dialog.options.js';

test.describe('Dialog', () => {
  test.use({
    tagName,
    innerHTML: /* html */ `<div id="content">Dialog Body</div>`,
    waitFor: [DialogBodyTagName],
  });

  async function getPointOutside(element: Locator) {
    // Get the bounding box of the element
    const boundingBox = await element.boundingBox();

    // Calculate a point outside the bounding box
    return {
      x: boundingBox!.x + boundingBox!.width + 10, // 10 pixels to the right
      y: boundingBox!.y + boundingBox!.height + 10, // 10 pixels below
    };
  }

  test('should create with document.createElement()', async ({ page, fastPage }) => {
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

  test('should open and close programmatically', async ({ fastPage }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate();

    await test.step('should show the dialog content when the dialog is shown', async () => {
      await expect(content).toBeHidden();

      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();
    });

    await test.step('should hide the dialog content when the dialog is hidden', async () => {
      await element.evaluate((node: Dialog) => {
        node.hide();
      });

      await expect(content).toBeHidden();
    });
  });

  test('should close after clicking outside its bounds when its `type` attribute is set to "modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate();

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeHidden();
  });

  test('should NOT close after clicking outside its bounds when its `type` attribute is set to "non-modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate({
      attributes: {
        type: 'non-modal',
      },
    });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeVisible();
  });

  test('should NOT close after clicking outside its bounds when its `type` attribute is set to "alert"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate();

    await element.evaluate((node: Dialog) => {
      node.setAttribute('type', 'alert');
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeVisible();
  });

  test('should close after the escape key is pressed when its `type` attribute is set to "modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate();

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(content).toBeHidden();
  });

  test('should close after a button is slotted into the close slot and clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const closeButton = element.locator('button[slot="close"]');
    const content = element.locator('#content');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${DialogBodyTagName}>
          <button slot="close">Close</button>
          <div id="content">content</div>
        </${DialogBodyTagName}>
      `,
    });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await closeButton.click();

    await expect(content).toBeHidden();
  });

  test('should NOT close after a slotted button is clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const genericButton = element.locator('button');
    const content = element.locator('#content');

    await fastPage.setTemplate({
      attributes: { type: 'non-modal' },
      innerHTML: /* html */ `
        <${DialogBodyTagName}>
          <button>Close</button>
          <div id="content">content</div>
        </${DialogBodyTagName}>
      `,
    });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await genericButton.click();

    await expect(content).toBeVisible();
  });

  test('should NOT close after the escape key is pressed when its `type` attribute is set to "non-modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(content).toBeVisible();
  });

  test('should set the `role` attribute to "dialog" on the internal dialog element when the `type` attribute is set to "dialog"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'dialog' } });

    await expect(dialog).toHaveRole('dialog');
  });

  test('should set the `role` attribute to "dialog" on the internal dialog element when the `type` attribute is set to "non-modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await expect(dialog).toHaveRole('dialog');
  });

  test('should set the `role` attribute to "alertdialog" on the internal dialog element when the `type` attribute is set to "alert"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'alert' } });

    await expect(dialog).toHaveRole('alertdialog');
  });

  test('should set the `aria-modal` attribute to "true" on the internal dialog element when the `type` attribute is set to "modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'modal' } });

    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('should set the `aria-modal` attribute to "false" on the internal dialog element when the `type` attribute is set to "non-modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await expect(dialog).not.toHaveAttribute('aria-modal');
  });

  test('should set the `aria-modal` attribute to "true" on the internal dialog element when the `type` attribute is set to "alert"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'alert' } });

    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('should set the `aria-labelledby` attribute on the internal dialog element when the `aria-labelledby` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate();

    await expect(dialog).not.toHaveAttribute('aria-labelledby');

    await element.evaluate(node => {
      node.setAttribute('aria-labelledby', 'label');
    });

    await expect(dialog).toHaveAttribute('aria-labelledby', 'label');
  });

  test('should set the `aria-describedby` attribute on the internal dialog element when the `aria-describedby` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate();

    await expect(dialog).not.toHaveAttribute('aria-describedby');

    await element.evaluate(node => {
      node.setAttribute('aria-describedby', 'elementID');
    });

    await expect(dialog).toHaveAttribute('aria-describedby', 'elementID');
  });

  test('should set the `aria-label` attribute on the internal dialog element when the `aria-label` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate();

    await expect(dialog).not.toHaveAttribute('aria-label');

    await element.evaluate(node => {
      node.setAttribute('aria-label', 'My dialog');
    });

    await expect(dialog).toHaveAttribute('aria-label', 'My dialog');
  });

  test('should not prevent default on clicks for dialog content', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const content = element.locator('#content');
    const label = page.locator('label');
    const input = page.locator('input');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${DialogBodyTagName} id="content">
          <label for="input">Label</label>
          <input id="input" />
        </${DialogBodyTagName}>
      `,
    });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await label.click();

    await expect(content).toBeVisible();

    await expect(input).toBeFocused();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeHidden();
  });

  test.describe('sets focus when show() is called', () => {
    test.use({
      tagName,
      waitFor: [DialogBodyTagName, TablistTagName, TabTagName, TextInputTagName],
    });

    test('should not change tablist’s `activeid` attribute', async ({ fastPage }) => {
      const { element } = fastPage;
      const content = element.locator('#content');
      const tablist = element.locator(TablistTagName);

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${DialogBodyTagName} id="content">
            <${TablistTagName} activeid="tab2">
              <${TabTagName} id="tab1">tab 1</${TabTagName}>
              <${TabTagName} id="tab2">tab 2</${TabTagName}>
            </${TablistTagName}>
          </${DialogBodyTagName}>
        `,
      });

      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();
      await expect(tablist).toHaveAttribute('activeid', 'tab2');

      await element.evaluate((node: Dialog) => {
        node.hide();
        node.show();
      });

      await expect(content).toBeVisible();
      await expect(tablist).toHaveAttribute('activeid', 'tab2');
    });

    test('should focus on itself if no slotted content has `autofocus` attribute', async ({ fastPage }) => {
      const { element } = fastPage;
      const content = element.locator('#content');

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${DialogBodyTagName} id="content">
            <button>before</button>
            <${TextInputTagName}></${TextInputTagName}>
            <button>after</button>
          </${DialogBodyTagName}>
        `,
      });

      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();
      await expect(element).toBeFocused();
    });

    test('should focus on the first element with `autofocus` attribute', async ({ fastPage }) => {
      const { element } = fastPage;
      const content = element.locator('#content');
      const input = element.getByTestId('input');

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${DialogBodyTagName} id="content">
            <button>before</button>
            <${TextInputTagName} autofocus data-testid="input"></${TextInputTagName}>
            <${TextInputTagName} autofocus></${TextInputTagName}>
            <button>after</button>
          </${DialogBodyTagName}>
        `,
      });

      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();
      await expect(input).toBeFocused();
    });
  });
});
