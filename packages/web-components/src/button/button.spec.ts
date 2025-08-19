import { expect, test } from '../../test/playwright/index.js';

test.describe('Button', () => {
  test.use({
    tagName: 'fluent-button',
    innerHTML: 'Button',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-button');
    });

    expect(hasError).toBe(false);
  });

  test('should NOT submit the parent form when clicked and `type` attribute is not set', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <fluent-button>Button</fluent-button>
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
        <fluent-button type="button">Button</fluent-button>
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
        <fluent-button type="reset">Button</fluent-button>
      </form>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);
  });

  test("should submit the form with the submit button's name and value when clicked", async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="foo">
        <fluent-button type="submit" name="bar" value="baz">Button</fluent-button>
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
        <fluent-button type="submit" value="baz">Button</fluent-button>
      </form>
    `);

    await element.click();

    await expect(page).toHaveURL(/foo\?$/);
  });

  test('should be focusable by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should apply transparency correctly when the `disabled` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { disabled: true } });

    const transparent = 'rgba(0, 0, 0, 0)';

    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'primary'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'secondary'));
    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'outline'));
    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'subtle'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'transparent'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);
  });

  test('should be focusable when the `disabled-focusable` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'disabled-focusable': true } });

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should apply transparency correctly when the `disabled-focusable` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { 'disabled-focusable': true } });

    const transparent = 'rgba(0, 0, 0, 0)';

    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'primary'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'secondary'));
    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).not.toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'outline'));
    await expect(element).not.toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'subtle'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);

    await element.evaluate(node => node.setAttribute('appearance', 'transparent'));
    await expect(element).toHaveCSS('border-color', transparent);
    await expect(element).toHaveCSS('background-color', transparent);
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

      await fastPage.setTemplate({ attributes: { 'disabled-focusable': true } });

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
    const element = page.locator('fluent-button', { hasText: 'Not Focusable' });
    const focusable = page.locator('fluent-button', { hasText: 'Recieves Focus' });

    await fastPage.setTemplate(/* html */ `
      <fluent-button>Recieves Focus</fluent-button>
      <fluent-button tabindex="-1">Not Focusable</fluent-button>
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
        <fluent-button type="submit">Submit Button</fluent-button>
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
        <input type="text" id="text-input">
        <fluent-button type="reset">Reset Button</fluent-button>
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
        <input type="text" id="text-input">
        <fluent-button type="reset" disabled>Reset Button</fluent-button>
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
      <fluent-button type="submit">Submit Button</fluent-button>
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
        <input type="text" id="text-input">
      </form>
      <fluent-button type="reset">Submit Button</fluent-button>
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
        <fluent-button type="submit" disabled>Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="bar">
      </form>

      <fluent-button type="submit" form="testform">Submit Button</fluent-button>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo/);
  });

  test('should override the form action when the `formaction` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <fluent-button type="submit" formaction="bar">Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="baz">
      </form>
      <fluent-button type="submit" form="testform" formaction="bar">Submit Button</fluent-button>
    `);

    await element.click();

    await expect(page).not.toHaveURL(/foo/);

    await expect(page).toHaveURL(/bar/);
  });

  test('should override the form method when the `formmethod` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo" formmethod="get">
        <fluent-button type="submit" formmethod="post">Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="bar">
      </form>

      <fluent-button type="submit" form="testform" formmethod="post">Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="hello world">
        <fluent-button type="submit" formenctype="plain/text">Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="hello world">
      </form>

      <fluent-button type="submit" form="testform" formenctype="plain/text">Submit Button</fluent-button>
    `);

    await expect(page).not.toHaveURL(/foo/);

    await element.click();

    await expect(page).toHaveURL(/foo\?testinput=hello\+world$/);
  });

  test('should override the form target when the `formtarget` attribute is provided', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form action="foo" target="_blank">
        <fluent-button type="submit" formtarget="_self">Submit Button</fluent-button>
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
        <input type="text" name="testinput" value="hello world">
      </form>

      <fluent-button type="submit" form="testform" formtarget="_self">Submit Button</fluent-button>
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
        <input id="text-input" name="input-field" type="email">
        <fluent-button type="submit" formnovalidate>Button</fluent-button>
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
        <input id="text-input" name="input-field" type="email">
      </form>

      <fluent-button type="submit" form="test-form" formnovalidate>Button</fluent-button>
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
    const button = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email">
        <fluent-button type="submit">Button</fluent-button>
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
    const button = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email">
      </form>

      <fluent-button type="submit" form="test-form">Button</fluent-button>
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
