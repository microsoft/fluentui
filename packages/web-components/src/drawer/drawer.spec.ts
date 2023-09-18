import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { keyEscape } from '@microsoft/fast-web-utilities';
import { fixtureURL } from '../helpers.tests.js';
import type { Drawer } from './drawer.js';

test.describe('Drawer', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let overlay: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    root = page.locator('#root');
    element = page.locator('fluent-drawer');
    overlay = element.locator('.overlay');

    await page.goto(fixtureURL('components-drawer--drawer'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should render without crashing', async () => {
    await page.waitForSelector('fluent-drawer');
    await expect(element).toBeVisible();
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
  });

  test('should reflect position attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer position="right"></fluent-drawer>
      `;
    });

    await expect(element).toHaveAttribute('position', 'right');
    await expect(element).toHaveJSProperty('position', 'right');

    await element.evaluate((node: Drawer) => {
      node.position = 'left';
    });

    await expect(element).toHaveAttribute('position', 'left');
    await expect(element).toHaveJSProperty('position', 'left');
  });

  test('should reflect modal attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer modal></fluent-drawer>
        `;
    });

    await expect(element).toHaveAttribute('modal', '');
    await expect(element).toHaveJSProperty('modal', true);

    await element.evaluate((node: Drawer) => {
      node.modal = false;
    });

    await expect(element).not.toHaveAttribute('modal', '');
    await expect(element).toHaveJSProperty('modal', false);
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

  test('overlay should be hidden when drawer is open and the modal attribute is NOT present', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer open></fluent-drawer>
        `;
    });

    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
    await expect(overlay).toHaveAttribute('hidden', '');
  });

  test('overlay should NOT be hidden when modal attribute is present and open', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer modal open></fluent-drawer>
        `;
    });

    await expect(overlay).toHaveAttribute('aria-hidden', 'false');
    await expect(overlay).not.toHaveAttribute('hidden', '');
  });

  test('overlay should be hidden when not open and modal attribute is present', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-drawer modal></fluent-drawer>
          `;
    });

    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
    await expect(overlay).toHaveAttribute('hidden', '');
  });

  test('toggleDrawer method should toggle open state of drawer', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-drawer></fluent-drawer>
        `;
    });

    await expect(element).not.toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', false);

    await element.evaluate((node: Drawer) => {
      node.toggleDrawer();
    });

    await expect(element).toHaveAttribute('open', '');
    await expect(element).toHaveJSProperty('open', true);

    await element.evaluate((node: Drawer) => {
      node.toggleDrawer();
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
            node.addEventListener('openChanged', () => resolve(true));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.toggleDrawer();
      }),
    ]);

    expect(wasOpened).toBe(true);
  });

  test('openChanged event should include drawers position in detail', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer></fluent-drawer>
        `;
    });

    const [right] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.position));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.toggleDrawer();
      }),
    ]);

    expect(right).toEqual('right');

    const [left] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.position));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.position = 'left';
        node.toggleDrawer();
      }),
    ]);
    expect(left).toEqual('left');
  });

  test('openChanged event should include drawers open state in detail', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer></fluent-drawer>
        `;
    });

    const [isOpen] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.open));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(isOpen).toEqual(true);

    const [isOpen2] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.open));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.hide();
      }),
    ]);
    expect(isOpen2).not.toEqual(true);
  });

  test('openChanged event should include drawers width in detail', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer></fluent-drawer>
        `;
    });

    const [medium] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.size));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(medium).toEqual(592);

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer size="small"></fluent-drawer>
        `;
    });

    const [small] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.size));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(small).toEqual(320);

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer size="large"></fluent-drawer>
        `;
    });

    const [large] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.size));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(large).toEqual(940);

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer style="width: 222px;"></fluent-drawer>
        `;
    });

    const [custom] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('openChanged', (event: Event) => resolve((event as CustomEvent).detail.size));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(custom).toEqual(222);
  });

  test('drawer should close on escape keypress', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-drawer open></fluent-drawer>
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
