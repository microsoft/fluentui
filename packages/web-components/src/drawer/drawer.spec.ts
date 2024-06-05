import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { keyEscape } from '@microsoft/fast-web-utilities';

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

  test('should reflect type attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer type="modal"></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('type', 'modal');
    await expect(element).toHaveJSProperty('Type', 'modal');

    await element.evaluate((node: Drawer) => {
      node.type = 'non-modal';
    });

    await expect(element).toHaveAttribute('type', 'non-modal');
    await expect(element).toHaveJSProperty('type', 'non-modal');
  });

  test('should reflect ariaLabel attribute', async () => {
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
      node.hide();
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });

  test('close method should close drawer', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer></fluent-drawer>
          `;
    });

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate((node: Drawer) => {
      node.hide();
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
            node.addEventListener('toggle', () => resolve(true));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(wasOpened).toBe(true);
  });

  test('drawer should close on escape keypress', async () => {
    const first: Locator = element.locator('button', { hasText: 'First' });

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer>
              <button>First</button>
            </fluent-drawer>
        `;
    });

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await first.focus();

    await expect(first).toBeFocused();

    await first.press(keyEscape);

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);
  });

  test("should fire a 'cancel' event when keydown is invoked on the document", async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer type="modal"></fluent-drawer>
        `;
    });

    const [wasDismissed] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('cancel', () => resolve(true));
          }),
      ),
      element.evaluate(node => {
        node.dispatchEvent(
          new Event('cancel', {
            key: 'Escape',
          } as EventInit),
        );
      }),
    ]);

    expect(wasDismissed).toBe(true);
  });
});
