import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-button-button--button'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-button'));
  });

  test('should NOT submit the parent form when clicked and `type` attribute is not set', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button>Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).not.toContain('foo');
  });

  test('should NOT submit the parent form when clicked and `type` attribute is set to "button"', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button type="button">Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).not.toContain('foo');
  });

  test('should NOT submit the parent form when clicked and `type` attribute is set to "reset"', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button type="reset">Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).not.toMatch(/foo/);
  });

  test("should submit the form with the submit button's name and value when clicked", async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="test-form" action="foo">
        <fluent-button type="submit" name="bar" value="baz">Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).toMatch(/foo\?bar=baz$/);
  });

  test('should NOT submit a value when the `name` attribute is NOT set and the `value` attribute is set', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="test-form" action="foo">
        <fluent-button type="submit" value="baz">Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).toMatch(/foo\?$/);
  });

  test('should be focusable by default', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button>Button</fluent-button>
    `);

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button disabled>Button</fluent-button>
    `);

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should apply transparency correctly when the `disabled` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');
    const transparent = 'rgba(0, 0, 0, 0)';
    await page.setContent(/* html */ `
      <fluent-button disabled>Button</fluent-button>
    `);

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

  test('should be focusable when the `disabled-focusable` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button disabled-focusable>Button</fluent-button>
    `);

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should apply transparency correctly when the `disabled-focusable` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');
    const transparent = 'rgba(0, 0, 0, 0)';
    await page.setContent(/* html */ `
      <fluent-button disabled-focusable>Button</fluent-button>
    `);

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

  test('should NOT be clickable when the `disabled` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button disabled>Disabled Button</fluent-button>
    `);

    const elementHandle = Promise.race([
      element.evaluate(node => new Promise(resolve => node.addEventListener('click', () => resolve(false)))),
      new Promise(resolve => setTimeout(() => resolve(true), 10)),
    ]);

    await element.click();

    const wasNotClicked = await elementHandle;

    expect(wasNotClicked).toBeTruthy();
  });

  test('should NOT be actionable via keyboard when the `disabled-focusable` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button disabled-focusable>Disabled Button</fluent-button>
    `);

    await element.focus();

    const elementHandle = Promise.race([
      element.evaluate(node => new Promise(resolve => node.addEventListener('keydown', () => resolve(false)))),
      new Promise(resolve => setTimeout(() => resolve(true), 10)),
    ]);

    await page.keyboard.press('Enter');

    const ReceivedNoKeyDownEvent = await elementHandle;

    expect(ReceivedNoKeyDownEvent).toBeTruthy();

    await page.keyboard.press('Space');

    const ReceivedNoKeyDownEvent2 = await elementHandle;

    expect(ReceivedNoKeyDownEvent2).toBeTruthy();
  });

  test('should focus the element when the `autofocus` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <fluent-button autofocus>Button</fluent-button>
    `);

    await expect(element).toBeFocused();
  });

  test('should submit the parent form when clicked and `type` attribute is set to "submit"', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button type="submit">Submit Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should reset the parent form when clicked and `type` attribute is set to "reset"', async ({ page }) => {
    const element = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">Unrelated Form</form>
      <fluent-button type="submit">Submit Button</fluent-button>
    `);

    await element.click();

    expect(page.url()).not.toContain('foo');
  });

  test('should do nothing when clicked while not in a form and the `type` attribute is set to "reset"', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
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

    expect(page.url()).not.toContain('foo');
  });

  test('should NOT submit the parent form when clicked and `disabled` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button type="submit" disabled>Submit Button</fluent-button>
      </form>
    `);

    await element.click();

    expect(page.url()).not.toContain('foo');
  });

  test('should submit the parent form when clicked and the `form` attribute is provided', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="testform" action="foo">
        <input type="text" name="testinput" value="bar">
      </form>

      <fluent-button type="submit" form="testform">Submit Button</fluent-button>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should override the form action when the `formaction` attribute is provided', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-button type="submit" formaction="bar">Submit Button</fluent-button>
      </form>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).not.toContain('foo');

    expect(page.url()).toContain('bar');
  });

  test('should override the action of the referenced form when the `formaction` and `form` attributes are provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="testform" action="foo">
        <input type="text" name="testinput" value="bar">
      </form>

      <fluent-button type="submit" form="testform" formaction="bar">Submit Button</fluent-button>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).not.toContain('foo');

    expect(page.url()).toContain('bar');
  });

  test('should override the form method when the `formmethod` attribute is provided', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo" formmethod="get">
        <fluent-button type="submit" formmethod="post">Submit Button</fluent-button>
      </form>
    `);

    expect(page.url()).not.toContain('foo');

    const method = page.waitForRequest(request => request.method() === 'POST');

    await element.click();

    expect(await method).toBeTruthy();

    expect(page.url()).toContain('foo');
  });

  test('should override the method of the referenced form when the `formmethod` and `form` attributes are provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="testform" action="foo" method="get">
        <input type="text" name="testinput" value="bar">
      </form>

      <fluent-button type="submit" form="testform" formmethod="post">Submit Button</fluent-button>
    `);

    expect(page.url()).not.toContain('foo');

    const method = page.waitForRequest(request => request.method() === 'POST');

    await element.click();

    expect(await method).toBeTruthy();

    expect(page.url()).toContain('foo');
  });

  test('should override the form encoding when the `formenctype` attribute is provided', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo" enctype="application/x-www-form-urlencoded">
        <input type="text" name="testinput" value="hello world">
        <fluent-button type="submit" formenctype="plain/text">Submit Button</fluent-button>
      </form>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toMatch(/foo\?testinput=hello\+world$/);
  });

  test('should override the encoding of the referenced form when the `formenctype` and `form` attributes are provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="testform" action="foo" enctype="application/x-www-form-urlencoded">
        <input type="text" name="testinput" value="hello world">
      </form>

      <fluent-button type="submit" form="testform" formenctype="plain/text">Submit Button</fluent-button>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toMatch(/foo\?testinput=hello\+world$/);
  });

  test('should override the form target when the `formtarget` attribute is provided', async ({ page }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form action="foo" target="_blank">
        <fluent-button type="submit" formtarget="_self">Submit Button</fluent-button>
      </form>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should override the target of the referenced form when the `formtarget` and `form` attributes are provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-button');

    await page.setContent(/* html */ `
      <form id="testform" action="foo" target="_blank">
        <input type="text" name="testinput" value="hello world">
      </form>

      <fluent-button type="submit" form="testform" formtarget="_self">Submit Button</fluent-button>
    `);

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should submit the parent form when form validation errors are present and the `formnovalidate` attribute is present', async ({
    page,
  }) => {
    const form = page.locator('#test-form');
    const element = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
      <form id="test-form" action="foo">
        <input id="text-input" name="input-field" type="email">
        <fluent-button type="submit" formnovalidate>Button</fluent-button>
      </form>
    `);

    await input.fill('foo');

    expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBeFalsy();

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should submit the referenced form when form validation errors are present and the `formnovalidate` and `form` attributes are present', async ({
    page,
  }) => {
    const form = page.locator('#test-form');
    const element = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
      <form id="test-form" action="foo">
        <input id="text-input" name="input-field" type="email">
      </form>

      <fluent-button type="submit" form="test-form" formnovalidate>Button</fluent-button>
    `);

    await input.fill('foo');

    expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBeFalsy();

    expect(page.url()).not.toContain('foo');

    await element.click();

    expect(page.url()).toContain('foo');
  });

  test('should NOT submit the parent form when form validation errors are present and the `formnovalidate` is NOT present', async ({
    page,
  }) => {
    const button = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email">
        <fluent-button type="submit">Button</fluent-button>
      </form>
    `);

    await input.fill('foo');

    const [wasNotSubmitted] = await Promise.all([
      input.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('invalid', () => resolve(true));
          }),
      ),

      button.click(),
    ]);

    expect(wasNotSubmitted).toBeTruthy();
  });

  test('should NOT submit the referenced form when form validation errors are present and the `formnovalidate` attribute is NOT present and the `form` attribute is present', async ({
    page,
  }) => {
    const button = page.locator('fluent-button');
    const input = page.locator('#text-input');

    await page.setContent(/* html */ `
      <form id="test-form" action="#">
        <input id="text-input" name="input-field" type="email">
      </form>

      <fluent-button type="submit" form="test-form">Button</fluent-button>
    `);

    await input.fill('foo');

    const [wasInvalid] = await Promise.all([
      input.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('invalid', () => resolve(true));
          }),
      ),

      button.click(),
    ]);

    expect(wasInvalid).toBeTruthy();
  });
});
