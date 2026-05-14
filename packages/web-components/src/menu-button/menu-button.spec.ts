import { expect, test } from '../../test/playwright/index.js';
import { MenuButtonAppearance, MenuButtonSize } from './menu-button.options.js';
import { tagName } from './menu-button.options.js';

test.describe('MenuButton', () => {
  test.use({
    tagName,
    innerHTML: 'Toggle Menu',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate('');

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should render a menu button on the page', async ({ fastPage }) => {
    await fastPage.setTemplate();
    await expect(fastPage.element).toBeVisible();
  });

  test('should have a dropdown arrow icon in the end slot', async ({ fastPage }) => {
    await fastPage.setTemplate();

    const endSlot = fastPage.element.locator('slot[name="end"]');
    const dropdownIcon = endSlot.locator('svg');

    await expect(dropdownIcon).toBeVisible();
    await expect(dropdownIcon).toHaveAttribute('viewBox', '0 0 20 20');
  });

  test('should allow custom content in the end slot', async ({ fastPage }) => {
    const { element } = fastPage;
    const endSlot = element.locator('span[slot="end"]');

    await fastPage.setTemplate({
      innerHTML: `Toggle Menu <span slot="end">▼</span>`,
    });

    await expect(endSlot).toBeVisible();
    await expect(endSlot).toHaveText('▼');
  });

  test('should support start slot for icons', async ({ fastPage }) => {
    const { element } = fastPage;
    const startSlot = element.locator('span[slot="start"]');

    await fastPage.setTemplate({
      innerHTML: `<span slot="start">🎯</span> Toggle Menu`,
    });

    await expect(startSlot).toBeVisible();
    await expect(startSlot).toHaveText('🎯');
  });

  test('should apply the `icon` property when the `icon-only` attribute is set', async ({ fastPage }) => {
    await fastPage.setTemplate({ attributes: { 'icon-only': true } });

    await expect(fastPage.element).toHaveJSProperty('iconOnly', true);
  });

  for (const size in MenuButtonSize) {
    test(`should apply the \`${size}\` property when the \`size\` attribute is set to \`${size}\``, async ({
      fastPage,
    }) => {
      await fastPage.setTemplate({ attributes: { size } });

      await expect(fastPage.element).toHaveJSProperty('size', size);
    });
  }

  test('should update the button size from large to medium', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { size: 'large' } });

    await expect(element).toHaveJSProperty('size', 'large');

    await fastPage.updateTemplate(element, {
      attributes: { size: 'medium' },
    });

    await expect(element).toHaveJSProperty('size', 'medium');
  });

  for (const appearance in MenuButtonAppearance) {
    test(`should set the "${appearance}" property when the \`appearance\` attribute is set to \`${appearance}\``, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { appearance } });

      await expect(element).toHaveJSProperty('appearance', appearance);
    });
  }

  test('should be focusable and respond to clicks', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate();

    await element.focus();
    await expect(element).toBeFocused();

    // Test that Enter key triggers click using a Promise
    const clickPromise = element.evaluate(node => {
      return new Promise(resolve => {
        node.addEventListener('click', () => {
          resolve('clicked!');
        });
      });
    });

    await element.click();

    await expect(clickPromise).resolves.toBe('clicked!');
  });

  test('should have proper ARIA attributes for menu button', async ({ fastPage }) => {
    await fastPage.setTemplate({
      attributes: {
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
      },
    });

    await expect(fastPage.element).toHaveAttribute('aria-haspopup', 'true');
    await expect(fastPage.element).toHaveAttribute('aria-expanded', 'false');
  });

  test('should NOT submit the parent form when clicked and `type` attribute is not set', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName}>Toggle Menu</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);
  });

  test('should NOT submit the parent form when clicked and `type` attribute is set to "button"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName} type="button">Toggle Menu</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);
  });

  test('should NOT submit the parent form when clicked and `type` attribute is set to "reset"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName} type="reset">Toggle Menu</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);
  });

  test("should submit the form with the submit button's name and value when clicked", async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="foo">
        <${tagName} type="submit" name="bar" value="baz">Toggle Menu</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).toHaveURL(/foo\?bar=baz$/);
  });

  test('should NOT submit a value when the `name` attribute is NOT set and the `value` attribute is set', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="foo">
        <${tagName} type="submit" value="baz">Toggle Menu</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).toHaveURL(/foo\?$/);
  });

  test('should be focusable by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should be focusable when the `disabled-focusable` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'disabled-focusable': true },
    });

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be clickable when the `disabled` attribute is present', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    const wasNotClicked = await page.evaluate(el => {
      const event = new KeyboardEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      // The return value of dispatchEvent will be false if any event listener called preventDefault, or true otherwise.
      return el?.dispatchEvent(event);
    }, await element.elementHandle());

    expect(wasNotClicked).toEqual(true);
  });

  for (const key of ['Enter', ' ']) {
    test(`should NOT be actionable with \`${key}\` keypress when the \`disabled-focusable\` attribute is present`, async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({
        attributes: { 'disabled-focusable': true },
      });

      await element.focus();

      const isActionable = await page.evaluate(
        ([el, key]) => {
          const event = new KeyboardEvent('keypress', {
            key: key as string,
            bubbles: true,
            cancelable: true,
            view: window,
          });

          // The return value of dispatchEvent will be false if any event listener called preventDefault, or true otherwise.
          return (el as HTMLElement).dispatchEvent(event);
        },
        [await element.elementHandle(), key],
      );

      expect(isActionable).toBe(false);
    });
  }

  test('should NOT receive focus when the `tabindex` is manually set to -1', async ({ fastPage, page }) => {
    const element = page.locator(tagName, { hasText: 'Not Focusable' });
    const focusable = page.locator(tagName, { hasText: 'Receives Focus' });

    await fastPage.setTemplate(/* html */ `
      <${tagName}>Receives Focus</${tagName}>
      <${tagName} tabindex="-1">Not Focusable</${tagName}>
    `);

    await focusable.focus();

    await expect(focusable).toBeFocused();

    await focusable.press('Tab');

    await expect(element).not.toBeFocused();
  });

  test('should focus the element when the `autofocus` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { autofocus: true } });

    await expect(element).toBeFocused();
  });

  test('should submit the parent form when clicked and `type` attribute is set to "submit"', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName} type="submit">Submit Button</${tagName}>
      </form>
    `);

    await element.click();

    await expect(fastPage.page).toHaveURL(/foo/);
  });

  test('should reset the parent form when clicked and `type` attribute is set to "reset"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form>
        <input type="text" id="text-input" />
        <${tagName} type="reset">Reset Button</${tagName}>
      </form>
    `);

    await expect(input).toHaveValue('');

    await input.fill('foo');

    await expect(input).toHaveValue('foo');

    await element.click();

    await expect(input).toHaveValue('');
  });

  test('should NOT reset the parent form when the `type` attribute is set to "reset" and the `disabled` attribute is present', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form>
        <input type="text" id="text-input" />
        <${tagName} type="reset" disabled>Reset Button</${tagName}>
      </form>
    `);

    await input.fill('foo');

    await element.click();

    await expect(input).toHaveValue('foo');
  });

  test('should do nothing when clicked while not in a form and the `type` attribute is set to "submit"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">Unrelated Form</form>
      <${tagName} type="submit">Submit Button</${tagName}>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);
  });

  test('should do nothing when clicked while not in a form and the `type` attribute is set to "reset"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        Unrelated Form
        <input type="text" id="text-input" />
      </form>
      <${tagName} type="reset">Submit Button</${tagName}>
    `);

    await expect(input).toHaveValue('');

    await input.fill('foo');

    await expect(input).toHaveValue('foo');

    await element.click();

    await expect(input).toHaveValue('foo');

    await expect(page).not.toHaveURL(/foo/);
  });

  test('should NOT submit the parent form when clicked and `disabled` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName} type="submit" disabled>Submit Button</${tagName}>
      </form>
    `);

    await element.click();

    await expect(fastPage.page).not.toHaveURL(/foo/);
  });

  test('should submit the parent form when clicked and the `form` attribute is provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="testform" action="foo">
        <input type="text" name="testinput" value="bar" />
      </form>

      <${tagName} type="submit" form="testform">Submit Button</${tagName}>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should override the form action when the `formaction` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <${tagName} type="submit" formaction="bar">Submit Button</${tagName}>
      </form>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);

    await expect(page).toHaveURL(/bar/);
  });

  test('should override the action of the referenced form when the `formaction` and `form` attributes are provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="testform" action="foo">
        <input type="text" name="testinput" value="baz" />
      </form>
      <${tagName} type="submit" form="testform" formaction="bar">Submit Button</${tagName}>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);

    await expect(page).toHaveURL(/bar/);
  });

  test('should override the form method when the `formmethod` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo" formmethod="get">
        <${tagName} type="submit" formmethod="post">Submit Button</${tagName}>
      </form>
    `);

    await expect(page).not.toHaveURL(/foo/);

    const method = page.waitForRequest(request => request.method() === 'POST');

    await element.click();

    await expect(method).resolves.toBeTruthy();

    await expect(page).toHaveURL(/foo/);
  });

  test('should override the method of the referenced form when the `formmethod` and `form` attributes are provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="testform" action="foo" method="get">
        <input type="text" name="testinput" value="bar" />
      </form>

      <${tagName} type="submit" form="testform" formmethod="post">Submit Button</${tagName}>
    `);

    await expect(page).not.toHaveURL(/foo/);

    const method = page.waitForRequest(request => request.method() === 'POST');

    await element.click();

    await expect(method).resolves.toBeTruthy();

    await expect(page).toHaveURL(/foo/);
  });

  test('should override the form encoding when the `formenctype` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo" enctype="application/x-www-form-urlencoded">
        <input type="text" name="testinput" value="hello world" />
        <${tagName} type="submit" formenctype="plain/text">Submit Button</${tagName}>
      </form>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo\?testinput=hello\+world$/);
  });

  test('should override the encoding of the referenced form when the `formenctype` and `form` attributes are provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="testform" action="foo" enctype="application/x-www-form-urlencoded">
        <input type="text" name="testinput" value="hello world" />
      </form>

      <${tagName} type="submit" form="testform" formenctype="plain/text">Submit Button</${tagName}>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo\?testinput=hello\+world$/);
  });

  test('should override the form target when the `formtarget` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo" target="_blank">
        <${tagName} type="submit" formtarget="_self">Submit Button</${tagName}>
      </form>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should override the target of the referenced form when the `formtarget` and `form` attributes are provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="testform" action="foo" target="_blank">
        <input type="text" name="testinput" value="hello world" />
      </form>

      <${tagName} type="submit" form="testform" formtarget="_self">Submit Button</${tagName}>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should submit the parent form when form validation errors are present and the `formnovalidate` attribute is present', async ({
    fastPage,
    page,
  }) => {
    const form = page.locator('#test-form');
    const { element } = fastPage;
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="foo">
        <input id="text-input" name="input-field" type="email" />
        <${tagName} type="submit" formnovalidate>Toggle Menu</${tagName}>
      </form>
    `);

    await input.fill('foo');

    const validity = await form.evaluate((node: HTMLFormElement) => node.checkValidity());

    expect(validity).toBe(false);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should submit the referenced form when form validation errors are present and the `formnovalidate` and `form` attributes are present', async ({
    fastPage,
    page,
  }) => {
    const form = page.locator('#test-form');
    const { element } = fastPage;
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="foo">
        <input id="text-input" name="input-field" type="email" />
      </form>

      <${tagName} type="submit" form="test-form" formnovalidate>Toggle Menu</${tagName}>
    `);

    await input.fill('foo');

    expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBeFalsy();

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should NOT submit the parent form when form validation errors are present and the `formnovalidate` is NOT present', async ({
    fastPage,
    page,
  }) => {
    const button = page.locator(tagName);
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email" />
        <${tagName} type="submit">Toggle Menu</${tagName}>
      </form>
    `);

    await input.fill('foo');

    const wasNotSubmitted = input.evaluate(
      node =>
        new Promise(resolve => {
          node.addEventListener('invalid', () => resolve(true));
        }),
    );

    await button.click();

    await expect(wasNotSubmitted).resolves.toBeTruthy();
  });

  test('should NOT submit the referenced form when form validation errors are present and the `formnovalidate` attribute is NOT present and the `form` attribute is present', async ({
    fastPage,
    page,
  }) => {
    const button = page.locator(tagName);
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email" />
      </form>

      <${tagName} type="submit" form="test-form">Toggle Menu</${tagName}>
    `);

    await input.fill('foo');

    const wasInvalid = input.evaluate(
      node =>
        new Promise(resolve => {
          node.addEventListener('invalid', () => resolve(true));
        }),
    );

    await button.click();

    await expect(wasInvalid).resolves.toBeTruthy();
  });
});
