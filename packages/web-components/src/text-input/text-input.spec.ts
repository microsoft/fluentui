import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { TextInput } from './text-input.js';
import { ImplicitSubmissionBlockingTypes } from './text-input.options.js';

test.describe('TextInput', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-textinput--text-input'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-text-input'));
  });

  test('should focus the element when the `autofocus` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input autofocus></fluent-text-input>
    `);

    await expect(element).toBeFocused();
  });

  test('should set the `disabled` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input disabled></fluent-text-input>
    `);

    await expect(control).toBeDisabled();
  });

  test('should set the `readonly` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input readonly></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('readonly');
  });

  test('should set the `required` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input required></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('required');
  });

  test('should set the `spellcheck` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input spellcheck="true"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('spellcheck', 'true');
  });

  test('should set the `maxlength` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input maxlength="14"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('maxlength', '14');
  });

  test('should set the `minlength` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input minlength="14"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('minlength', '14');
  });

  test('should set the `name` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input name="foo"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('name', 'foo');
  });

  test('should set the `placeholder` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input placeholder="foo"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('placeholder', 'foo');
  });

  test('should set the `size` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input size="4"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('size', '4');
  });

  test('should set the `list` attribute on the internal control', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input list="listId"></fluent-text-input>
    `);

    await expect(control).toHaveAttribute('list', 'listId');
  });

  test('should reflect `control-size` attribute values', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input control-size="small"></fluent-text-input>
    `);

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

  test('should add a custom state matching the `size` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input control-size="small"></fluent-text-input>
    `);

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'small';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('small'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'medium';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('small'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('medium'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.controlSize = 'large';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('medium'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('large'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.controlSize = undefined;
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('small'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('medium'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('large'))).toBe(false);
  });

  test('should reflect `appearance` attribute values', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await element.evaluate((node: TextInput) => {
      node.appearance = 'outline';
    });

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

  test('should add a custom state matching the `appearance` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    await element.evaluate((node: TextInput) => {
      node.appearance = 'outline';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('outline'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.appearance = 'underline';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('outline'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('underline'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.appearance = 'filled-lighter';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('underline'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('filled-lighter'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.appearance = 'filled-darker';
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('filled-lighter'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('filled-darker'))).toBe(true);

    await element.evaluate((node: TextInput) => {
      node.appearance = undefined;
    });

    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('outline'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('underline'))).toBe(false);
    expect(await element.evaluate((node: TextInput) => node.elementInternals.states.has('filled-lighter'))).toBe(false);
  });

  test('should have an undefined `value` property when no `value` attribute is set', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
        <fluent-text-input></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('value', undefined);
  });

  test('should initialize to the provided `value` attribute when set before connection', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
        <fluent-text-input value="foo"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` property if set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent('');

    await page.evaluate(() => {
      const textInput = document.createElement('fluent-text-input') as TextInput;

      textInput.value = 'foo';

      document.body.append(textInput);
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute if set post-connection', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    await element.evaluate(node => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'foo');

    await expect(control).toHaveValue('foo');
  });

  test('should NOT initialize to the provided `value` attribute if set post-connection and the control has a dirty value', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    await control.fill('bar');

    await element.evaluate(node => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'bar');

    await expect(control).toHaveValue('bar');
  });

  test('should hide the label when no default slotted content is provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const label = element.locator('label');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    await expect(label).toBeHidden();
  });

  test('should hide the label when start content is provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const label = element.locator('label');

    await page.setContent(/* html */ `
      <fluent-text-input>
        <div slot="start"></div>
      </fluent-text-input>
    `);

    await expect(label).toBeHidden();
  });

  test('should hide the label when end content is provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const label = element.locator('label');

    await page.setContent(/* html */ `
      <fluent-text-input>
        <div slot="end"></div>
      </fluent-text-input>
    `);

    await expect(label).toBeHidden();
  });

  test('should hide the label when start and end content are provided', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const label = element.locator('label');

    await page.setContent(/* html */ `
      <fluent-text-input>
        <div slot="start"></div>
        <div slot="end"></div>
      </fluent-text-input>
    `);

    await expect(label).toBeHidden();
  });

  test('should hide the label when space-only text nodes are slotted', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const label = element.locator('label');

    await page.setContent(/* html */ `<fluent-text-input>\n \n</fluent-text-input>`);

    await expect(element).toHaveText(/\n\s\n/);

    await expect(label).toBeHidden();
  });

  test('should fire a `change` event when the internal control emits a `change` event', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    const [wasChanged] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('change', () => resolve(true));
          }),
      ),
      element.evaluate((node: TextInput) => node.control.dispatchEvent(new Event('change'))),
    ]);

    expect(wasChanged).toBeTruthy();
  });

  test('should be invalid when the `required` attribute is set and the `value` property is empty', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input required></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valueMissing', true);

    await expect(element).toHaveJSProperty('validity.valid', false);
  });

  test('should be valid when the `required` attribute is set and the `value` property is not empty', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input required value="some-value"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.valueMissing', false);
  });

  test('should be valid when the `minlength` attribute is set and the `value` attribute is empty', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input minlength="1"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooShort', false);
  });

  test('should be valid when the `value` attribute length is less than the `minlength` attribute and the value is not dirty', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="password" minlength="10" value="123456789"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooShort', false);
  });

  test('should be valid when the `value` attribute is not set and the `maxlength` attribute is set', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
        <fluent-text-input maxlength="10"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valid', true);

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` attribute has a length which exceeds the `maxlength`', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="password" maxlength="10" value="12345678901"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` is shorter than `maxlength` and the element is `required`', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="password" maxlength="10" required value="123456789"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.tooLong', false);
  });

  test('should report valid validity when the `value` property matches the `pattern` property', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="password" pattern="\\d+" value="123456789"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.patternMismatch', false);
  });

  test('should report invalid validity when `value` does not match `pattern`', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="password" pattern="value" value="other value"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.patternMismatch', true);
  });

  test('should report valid validity when `value` is an empty string', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="email"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.typeMismatch', false);
  });

  test('should have invalid invalidity with a `typeMismatch` when `value` is not a valid email', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="email" value="not an email"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.typeMismatch', true);
  });

  test('should be invalid when `value` is not a valid URL', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input type="url" value="not a url"></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('validity.valid', false);

    await expect(element).toHaveJSProperty('validity.typeMismatch', true);
  });

  test('should not accept user input when the `readonly` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input readonly></fluent-text-input>
    `);

    await control.fill('foo', {
      // eslint-disable-next-line playwright/no-force-option
      force: true,
    });

    await expect(control).toHaveValue('');
  });

  test('should not accept user input when the `disabled` attribute is present', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <fluent-text-input disabled></fluent-text-input>
    `);

    await control.fill('foo', {
      // eslint-disable-next-line playwright/no-force-option
      force: true,
    });

    await expect(control).toHaveValue('');
  });

  test('should set the `willValidate` property to `false` when the `disabled` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input disabled></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('willValidate', false);
  });

  test('should set the `willValidate` property to `false` when the `readonly` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input readonly></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('willValidate', false);
  });

  test('should set the `form` property to the parent form element', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <form id="foo">
        <fluent-text-input></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form.id', 'foo');
  });

  test('should set the `form` property to `null` when the element is not in a form', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <fluent-text-input></fluent-text-input>
    `);

    await expect(element).toHaveJSProperty('form', null);
  });

  test('should set the `form` property to the form element referenced by the `form` attribute', async ({ page }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <form id="foo">
        <fluent-text-input form="foo"></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form.id', 'foo');
  });

  test('should set the `form` property to `null` when the element is in a form with the `form` attribute set to an invalid value', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <form id="foo">
        <fluent-text-input form="bar"></fluent-text-input>
      </form>
    `);

    await expect(element).toHaveJSProperty('form', null);
  });

  test('should submit the form via implicit submission when the form has no other controls', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput"></fluent-text-input>
      </form>
    `);

    // Playwright won't fill custom elements
    await control.fill('hello');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello$/);
  });

  test('should submit the form via implicit submission when the form contains a submit button', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
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
      test(`Blocking type: ${type}`, async ({ page }) => {
        const element = page.locator('fluent-text-input');
        const control = element.locator('input');

        await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-text-input');

    await page.setContent(/* html */ `
      <form id="form" action="foo">
        <fluent-text-input name="testinput" required></fluent-text-input>
      </form>
    `);

    await element.press('Enter');

    expect(page.url()).not.toMatch(/foo/);
  });

  test('should NOT prevent form submission when the `readonly` attribute is set', async ({ page }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-text-input name="testinput" readonly></fluent-text-input>
      </form>
    `);

    await control.press('Enter');

    expect(page.url()).toMatch(/foo/);
  });

  test('should allow comma-separated values when the `multiple` attribute is set and the `type` is "email"', async ({
    page,
  }) => {
    const element = page.locator('fluent-text-input');
    const control = element.locator('input');

    await page.setContent(/* html */ `
      <form action="foo">
        <fluent-text-input name="testinput" multiple type="email"></fluent-text-input>
      </form>
    `);

    await control.fill('hello@example.com, world@example.com');

    await element.press('Enter');

    expect(page.url()).toMatch(/foo\?testinput=hello%40example\.com%2Cworld%40example\.com/);
  });
});
