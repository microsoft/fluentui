import { expect, test } from '../../test/playwright/index.js';
import type { TextInput } from './text-input.js';
import { ImplicitSubmissionBlockingTypes } from './text-input.options.js';

test.describe('TextInput', () => {
  test.use({ tagName: 'fluent-text-input' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-text-input');
    });

    expect(hasError).toBe(false);
  });

  test('should focus the element when the `autofocus` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { autofocus: true } });

    await expect(element).toBeFocused();
  });

  test('should set the `disabled` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(control).toBeDisabled();
  });

  test('should set the `readonly` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { readonly: true } });

    await expect(control).toHaveAttribute('readonly');
  });

  test('should set the `required` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { required: true } });

    await expect(control).toHaveAttribute('required');
  });

  test('should set the `spellcheck` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { spellcheck: 'true' } });

    await expect(control).toHaveAttribute('spellcheck', 'true');
  });

  test('should set the `maxlength` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { maxlength: '14' } });

    await expect(control).toHaveAttribute('maxlength', '14');
  });

  test('should set the `minlength` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { minlength: '14' } });

    await expect(control).toHaveAttribute('minlength', '14');
  });

  test('should set the `name` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { name: 'foo' } });

    await expect(control).toHaveAttribute('name', 'foo');
  });

  test('should set the `placeholder` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { placeholder: 'foo' } });

    await expect(control).toHaveAttribute('placeholder', 'foo');
  });

  test('should set the `size` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { size: '4' } });

    await expect(control).toHaveAttribute('size', '4');
  });

  test('should set the `list` attribute on the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { list: 'listId' } });

    await expect(control).toHaveAttribute('list', 'listId');
  });

  test('should reflect `control-size` attribute values', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'control-size': 'small' } });

    await expect(element).toHaveAttribute('control-size', 'small');
    await expect(element).toHaveJSProperty('controlSize', 'small');

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'medium';
    });

    await expect(element).toHaveAttribute('control-size', 'medium');
    await expect(element).toHaveJSProperty('controlSize', 'medium');

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'large';
    });
    await expect(element).toHaveAttribute('control-size', 'large');
    await expect(element).toHaveJSProperty('controlSize', 'large');

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'small';
    });
    await expect(element).toHaveAttribute('control-size', 'small');
    await expect(element).toHaveJSProperty('controlSize', 'small');
  });

  test('should reflect `appearance` attribute values', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { appearance: 'outline' } });

    await expect(element).toHaveAttribute('appearance', 'outline');
    await expect(element).toHaveJSProperty('appearance', 'outline');

    await element.evaluate((node: TextInput) => {
      node.appearance = 'underline';
    });

    await expect(element).toHaveAttribute('appearance', 'underline');
    await expect(element).toHaveJSProperty('appearance', 'underline');

    await element.evaluate((node: TextInput) => {
      node.appearance = 'filled-darker';
    });
    await expect(element).toHaveAttribute('appearance', 'filled-darker');
    await expect(element).toHaveJSProperty('appearance', 'filled-darker');

    await element.evaluate((node: TextInput) => {
      node.appearance = 'filled-lighter';
    });
    await expect(element).toHaveAttribute('appearance', 'filled-lighter');
    await expect(element).toHaveJSProperty('appearance', 'filled-lighter');
  });

  test('should have an undefined `value` property when no `value` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('value', undefined);
  });

  test('should initialize to the provided `value` attribute when set before connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: 'foo' } });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` property if set pre-connection', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate('');

    await page.evaluate(() => {
      const textInput = document.createElement('fluent-text-input') as TextInput;

      textInput.value = 'foo';

      document.body.append(textInput);
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute if set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await element.evaluate(node => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'foo');

    await expect(control).toHaveValue('foo');
  });

  test('should NOT initialize to the provided `value` attribute if set post-connection and the control has a dirty value', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await control.fill('bar');

    await element.evaluate(node => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'bar');

    await expect(control).toHaveValue('bar');
  });

  test('should hide the label when no default slotted content is provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const label = element.locator('label');

    await expect(label).toBeHidden();
  });

  test('should hide the label when start content is provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const label = element.locator('label');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <div slot="start"></div>
      `,
    });

    await expect(label).toBeHidden();
  });

  test('should hide the label when end content is provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const label = element.locator('label');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <div slot="end"></div>
      `,
    });

    await expect(label).toBeHidden();
  });

  test('should hide the label when start and end content are provided', async ({ fastPage }) => {
    const { element } = fastPage;
    const label = element.locator('label');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <div slot="start"></div>
        <div slot="end"></div>
      `,
    });

    await expect(label).toBeHidden();
  });

  test('should hide the label when space-only text nodes are slotted', async ({ fastPage }) => {
    const { element } = fastPage;
    const label = element.locator('label');

    await fastPage.setTemplate({
      innerHTML: '\n \n',
    });

    await expect(element).toHaveText(/\n\s\n/);

    await expect(label).toBeHidden();
  });

  test('should fire a `change` event when the internal control emits a `change` event', async ({ fastPage }) => {
    const { element } = fastPage;

    const wasChanged = element.evaluate(
      node =>
        new Promise(resolve => {
          node.addEventListener('change', () => resolve(true));
        }),
    );

    await element.evaluate((node: TextInput) => node.control.dispatchEvent(new Event('change')));

    await expect(wasChanged).resolves.toBe(true);
  });

  test('should be invalid when the `required` attribute is set and the `value` property is empty', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { required: true } });

    await expect(element).toHaveJSProperty('validity.valueMissing', true);

    await expect(element).toHaveJSProperty('validity.valid', false);
  });

  test('should be valid when the `required` attribute is set and the `value` property is not empty', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { required: true, value: 'foo' } });

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.valueMissing', false);
  });

  test('should be valid when the `minlength` attribute is set and the `value` attribute is empty', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { minlength: '10' } });

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooShort', false);
  });

  test('should be valid when the `value` attribute length is less than the `minlength` attribute and the value is not dirty', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { minlength: '10', value: '123456789' } });

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooShort', false);
  });

  test('should be valid when the `value` attribute is not set and the `maxlength` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { maxlength: '10' } });

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` attribute has a length which exceeds the `maxlength`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { maxlength: '10', value: '123456789' } });

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` is shorter than `maxlength` and the element is `required`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { required: true, maxlength: '10', value: '123456789' } });

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` property matches the `pattern` property', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { pattern: '\\d+', value: '123456789' } });

    await expect(element).toHaveJSProperty('validity.patternMismatch', false);
  });

  test('should report invalid validity when `value` does not match `pattern`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { pattern: 'value', value: 'other value' } });

    await expect(element).toHaveJSProperty('validity.patternMismatch', true);
  });

  test('should report valid validity when `value` is an empty string', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { pattern: 'value', value: '' } });

    await expect(element).toHaveJSProperty('validity.typeMismatch', false);
  });

  test('should have invalid invalidity with a `typeMismatch` when `value` is not a valid email', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { type: 'email', value: 'not an email' } });

    await expect(element).toHaveJSProperty('validity.typeMismatch', true);
  });

  test('should be invalid when `value` is not a valid URL', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { type: 'url', value: 'not a url' } });

    await expect(element).toHaveJSProperty('validity.valid', false);

    await expect(element).toHaveJSProperty('validity.typeMismatch', true);
  });

  test('should not accept user input when the `readonly` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { readonly: true } });

    await control.fill('foo', {
      // eslint-disable-next-line playwright/no-force-option
      force: true,
    });

    await expect(control).toHaveValue('');
  });

  test('should not accept user input when the `disabled` attribute is present', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await control.fill('foo', {
      // eslint-disable-next-line playwright/no-force-option
      force: true,
    });

    await expect(control).toHaveValue('');
  });

  test('should set the `willValidate` property to `false` when the `disabled` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('willValidate', false);
  });

  test('should set the `willValidate` property to `false` when the `readonly` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { readonly: true } });

    await expect(element).toHaveJSProperty('willValidate', false);
  });

  test('should set the `form` property to the parent form element', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="foo">
        <fluent-text-input></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form.id', 'foo');
  });

  test('should set the `form` property to `null` when the element is not in a form', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('form', null);
  });

  test('should set the `form` property to the form element referenced by the `form` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="foo">
        <fluent-text-input form="foo"></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form.id', 'foo');
  });

  test('should set the `form` property to `null` when the element is in a form with the `form` attribute set to an invalid value', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="foo">
        <fluent-text-input form="bar"></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form', null);
  });

  test('should submit the form via implicit submission when the form has no other controls', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput"></fluent-text-input>
      </form>
    `);

    // Playwright won't fill custom elements
    await control.fill('hello');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello$/);
  });

  test('should submit the form via implicit submission when the form contains a submit button', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput"></fluent-text-input>
        <button type="submit">Submit</button>
      </form>
    `);

    await control.fill('hello');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello$/);
  });

  test('should submit the form via implicit submission when the form has no other implicit submission blocking controls', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput"></fluent-text-input>
        <button type="reset">Reset</button>
      </form>
    `);

    // Playwright won't fill custom elements
    await control.fill('hello');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello$/);
  });

  test.describe('should NOT submit the form via implicit submission when the form has other implicit submission blocking controls', () => {
    for (const type of ImplicitSubmissionBlockingTypes) {
      test(`Blocking type: ${type}`, async ({ fastPage, page }) => {
        const { element } = fastPage;
        const control = element.locator('input');

        await fastPage.setTemplate(/* html */ `
          <form id="form" action="foo">
            <fluent-text-input name="testinput"></fluent-text-input>
            <input name="extrainput" type="${type}" value="extravalue" />
          </form>
        `);

        await control.fill('hello');

        await element.press('Enter');

        expect(page.url()).not.toMatch(/foo\?testinput=hello&extrainput=extravalue$/);
      });
    }
  });

  test('should prevent form submission when the `required` attribute is set and the `value` property is empty', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput" required></fluent-text-input>
      </form>
    `);

    await element.press('Enter');

    expect(page.url()).not.toMatch(/foo/);
  });

  test('should NOT prevent form submission when the `readonly` attribute is set', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <fluent-text-input name="testinput" readonly></fluent-text-input>
      </form>
    `);

    await control.press('Enter');

    expect(page.url()).toMatch(/foo/);
  });

  test('should allow comma-separated values when the `multiple` attribute is set and the `type` is "email"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const control = element.locator('input');

    await fastPage.setTemplate(/* html */ `
      <form action="foo">
        <fluent-text-input name="testinput" multiple type="email"></fluent-text-input>
      </form>
    `);

    await control.fill('hello@example.com, world@example.com');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello%40example\.com%2Cworld%40example\.com/);
  });

  test('should allow focusable start and end slotted content to be focused', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const control = element.locator('input');
    const start = element.locator('[slot="start"]');
    const end = element.locator('[slot="end"]');
    const label = element.locator('text=Label');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <span>Label</span>
        <button slot="start">start</button>
        <button slot="end">end</button>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(start).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(control).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(end).toBeFocused();

    await test.step('should focus the control when the label is clicked', async () => {
      await label.click();

      await expect(control).toBeFocused();
    });
  });

  test('should reset the value to an empty string when the form is reset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const control = element.locator('input');
    const reset = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput"></fluent-text-input>
        <button type="reset">Reset</button>
      </form>
    `);

    await expect(control).toHaveValue('');

    await control.fill('hello');

    await reset.click();

    await expect(control).toHaveValue('');
  });

  test('should change the `value` property when the `current-value` attribute changes', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await element.evaluate(node => {
      node.setAttribute('current-value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should change the `value` property when the `currentValue` property changes', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await element.evaluate((node: TextInput) => {
      node.currentValue = 'foo';
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should set the `current-value` attribute to match the `value` property', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await expect(element).not.toHaveAttribute('current-value');

    await element.evaluate((node: TextInput) => {
      node.value = 'foo';
    });

    await expect(element).toHaveAttribute('current-value', 'foo');
  });

  test('should set the `currentValue` property to match the `value` property', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('currentValue', undefined);

    await element.evaluate((node: TextInput) => {
      node.value = 'foo';
    });

    await expect(element).toHaveJSProperty('currentValue', 'foo');
  });
});
