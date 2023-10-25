import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { keyEscape } from '@microsoft/fast-web-utilities';
import { Updates } from '@microsoft/fast-element';

import { fixtureURL } from '../helpers.tests.js';
import type { Drawer } from './drawer.js';

test.describe('Drawer', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    root = page.locator('#root');
    element = page.locator('fluent-drawer');

    await page.goto(fixtureURL('components-drawer--drawer'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  // eslint-disable-next-line playwright/no-focused-test
  test('should reflect size attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer size="medium"></fluent-drawer>
      `;
    });

    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Drawer) => {
      node.size = 'small';
    });

    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Drawer) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');

    await element.evaluate((node: Drawer) => {
      node.size = 'full';
    });
    await expect(element).toHaveAttribute('size', 'full');
    await expect(element).toHaveJSProperty('size', 'full');
  });

  test('should reflect position attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer position="end"></fluent-drawer>
      `;
    });

    await expect(element).toHaveAttribute('position', 'end');
    await expect(element).toHaveJSProperty('position', 'end');

    await element.evaluate((node: Drawer) => {
      node.position = 'start';
    });

    await expect(element).toHaveAttribute('position', 'start');
    await expect(element).toHaveJSProperty('position', 'start');
  });

  test('should reflect modal-type attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer modal-type="modal"></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('modal-type', 'modal');
    await expect(element).toHaveJSProperty('modalType', 'modal');

    await element.evaluate((node: Drawer) => {
      node.modalType = 'non-modal';
    });

    await expect(element).toHaveAttribute('modal-type', 'non-modal');
    await expect(element).toHaveJSProperty('modalType', 'non-modal');

    await element.evaluate((node: Drawer) => {
      node.modalType = 'alert';
    });

    await expect(element).toHaveAttribute('modal-type', 'alert');
    await expect(element).toHaveJSProperty('modalType', 'alert');
  });

  test('should reflect open attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer open></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate((node: Drawer) => {
      node.open = false;
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });

  test('should reflect aria-label attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-drawer aria-label="abc"></fluent-drawer>
          `;
    });

    await expect(element).toHaveAttribute('aria-label', 'abc');
    await expect(element).toHaveJSProperty('ariaLabel', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabel = 'def';
    });

    await expect(element).toHaveAttribute('aria-label', 'def');
    await expect(element).toHaveJSProperty('ariaLabel', 'def');
  });

  test('should reflect ariaLabelledby attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer aria-labelledby="abc"></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('aria-labelledby', 'abc');
    await expect(element).toHaveJSProperty('ariaLabelledby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabelledby = 'def';
    });

    await expect(element).toHaveAttribute('aria-labelledby', 'def');
    await expect(element).toHaveJSProperty('ariaLabelledby', 'def');
  });

  test('should reflect ariaDescribedby attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer aria-describedby="abc"></fluent-drawer>
          `;
    });

    await expect(element).toHaveAttribute('aria-describedby', 'abc');
    await expect(element).toHaveJSProperty('ariaDescribedby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaDescribedby = 'def';
    });

    await expect(element).toHaveAttribute('aria-describedby', 'def');
    await expect(element).toHaveJSProperty('ariaDescribedby', 'def');
  });

  test('show and hide methods should toggle open state of drawer', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer></fluent-drawer>
        `;
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate((node: Drawer) => {
      node.close();
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });

  test('hide method should close drawer', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer open></fluent-drawer>
          `;
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate((node: Drawer) => {
      node.close();
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });

  test('show method should open drawer', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-drawer ></fluent-drawer>
            `;
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);
  });

  test('should emit an event when open property changes', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer></fluent-drawer>
        `;
    });

    const [wasOpened] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('onOpenChange', () => resolve(true));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(wasOpened).toBe(true);
  });

  test('drawer should close on escape keypress', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer open tabindex="0"></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate(node => {
      node.focus();
    });

    await expect(element).toBeFocused();

    await element.press(keyEscape);

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });
});
