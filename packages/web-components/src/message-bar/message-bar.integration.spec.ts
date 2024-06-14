import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

test.describe('MessageBar component', () => {
  const componentID = 'components-messagebar--message-bar';
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    root = page.locator('#root');
    element = page.locator('fluent-message-bar');
    await page.goto(`iframe.html?id=${componentID}`);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should render with default attributes', async () => {
    const role = await element.getAttribute('role');
    const shape = await element.getAttribute('shape');
    const layout = await element.getAttribute('layout');
    const intent = await element.getAttribute('intent');

    expect(role).toEqual('status');
    expect(shape).toEqual('rounded');
    expect(layout).toEqual('singleline');
    expect(intent).toEqual('info');
  });

  test('should have correct `aria-labelledby` attribute', async () => {
    const attribute = await element.getAttribute('aria-labelledby');
    expect(attribute).toBeNull();
  });

  test('on dismissing the MessageBar, it should emit `dismiss` event', async () => {
    const [dismissed] = await Promise.all([
      element.evaluate(el => {
        return new Promise(resolve => {
          el.addEventListener('dismiss', () => resolve(true), {
            once: true,
          });
          (el as any).dismissMessageBar();
        });
      }),
    ]);
    expect(dismissed).toBeTruthy();
  });

  test('when the `layout` attribute is changed, it should reflect the new value', async () => {
    await element.evaluate(el => el.setAttribute('layout', 'multiline'));
    const layout = await element.getAttribute('layout');
    expect(layout).toEqual('multiline');
  });

  test('when the `intent` attribute is changed, it should reflect the new value', async () => {
    await element.evaluate(el => el.setAttribute('intent', 'warning'));
    const intent = await element.getAttribute('intent');
    expect(intent).toEqual('warning');
  });

  test('when the `shape` attribute is changed, it should reflect the new value', async () => {
    await element.evaluate(el => el.setAttribute('shape', 'rectangular'));
    const shape = await element.getAttribute('shape');
    expect(shape).toEqual('rectangular');
  });
});
