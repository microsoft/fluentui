import { expect, test } from '../../test/playwright/index.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';
import type { TextArea } from './textarea.js';

test.describe('TextArea', () => {
  test.use({
    tagName: 'fluent-textarea',
    waitFor: ['fluent-label'],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-textarea');
    });

    expect(hasError).toBe(false);
  });

  // TODO: This should test 'elementInternals.role' as 'textbox' when Reference Target is widely supported.
  test('should not have a role on element internals', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', null);
  });

  test("should always return 'textarea' for the `type` prop", async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('type', 'textarea');
  });

  test('should pass down attributes to the internal control', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('textarea');

    await fastPage.setTemplate({
      attributes: {
        required: true,
        disabled: true,
        readonly: true,
        spellcheck: true,
        autocomplete: 'on',
        maxlength: '100',
        minlength: '10',
        placeholder: 'Placeholder',
      },
    });

    await expect(control).toHaveJSProperty('required', true);
    await expect(control).toHaveJSProperty('disabled', true);
    await expect(control).toHaveJSProperty('readOnly', true);
    await expect(control).toHaveJSProperty('spellcheck', true);
    await expect(control).toHaveJSProperty('autocomplete', 'on');
    await expect(control).toHaveJSProperty('maxLength', 100);
    await expect(control).toHaveJSProperty('minLength', 10);
    await expect(control).toHaveJSProperty('placeholder', 'Placeholder');
  });

  test('should be associated with the given external labels', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <label for="textarea" data-testid="label1">Text area</label>
      <fluent-textarea id="textarea"></fluent-textarea>
      <label for="textarea" data-testid="label2">Text area</lable>
    `);

    const label1El = await page.getByTestId('label1').evaluate(node => node);
    const label2El = await page.getByTestId('label2').evaluate(node => node);
    const labelsValue = await element.evaluate((el: TextArea) => Array.from(el.labels));

    expect(labelsValue).toStrictEqual([label1El, label2El]);
  });

  test('should be focused when associated external label is clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const control = element.locator('textarea');

    await fastPage.setTemplate(/* html */ `
      <label for="textarea" data-testid="label">Text area</label>
      <fluent-textarea id="textarea"></fluent-textarea>
    `);

    const label = page.getByTestId('label');

    await label.click();

    await expect(control).toBeFocused();
  });

  test('should have the control focused when `focus()` is called', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('textarea');

    await fastPage.setTemplate({ attributes: { id: 'textarea' } });

    await element.evaluate((el: TextArea) => {
      el.focus();
    });

    await expect(control).toBeFocused();
  });

  test.describe('visual styles', () => {
    test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
      const { element } = fastPage;

      for (const appearance of Object.values(TextAreaAppearance)) {
        await test.step(appearance, async () => {
          await fastPage.setTemplate({ attributes: { appearance } });

          await expect(element).toHaveJSProperty('appearance', appearance);

          await expect(element).toHaveAttribute('appearance', appearance);
        });
      }
    });

    test('should toggle auto-resize attribute', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { 'auto-resize': true } });

      await expect(element).toHaveJSProperty('autoResize', true);

      await element.evaluate((node: TextArea) => {
        node.autoResize = false;
      });

      await expect(element).not.toHaveAttribute('auto-resize');
    });

    test('should toggle block attribute', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { block: true } });

      await expect(element).toHaveJSProperty('block', true);

      await element.evaluate((node: TextArea) => {
        node.block = false;
      });

      await expect(element).not.toHaveAttribute('block');
    });

    test('should set the `resize` property to match the `resize` attribute', async ({ fastPage }) => {
      const { element } = fastPage;

      for (const resize of Object.values(TextAreaResize)) {
        await test.step(resize, async () => {
          await fastPage.setTemplate({ attributes: { resize } });

          await expect(element).toHaveJSProperty('resize', resize);

          await expect(element).toHaveAttribute('resize', resize);
        });
      }
    });

    test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
      const { element } = fastPage;

      for (const size of Object.values(TextAreaSize)) {
        await test.step(size, async () => {
          await fastPage.setTemplate({ attributes: { size } });

          await expect(element).toHaveJSProperty('size', size);

          await expect(element).toHaveAttribute('size', size);
        });
      }
    });

    test('should toggle user-invalid state', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate({ attributes: { required: true } });

      await expect(element).not.toHaveCustomState('user-valid');
      await expect(element).not.toHaveCustomState('user-invalid');

      await control.fill('a');
      await element.blur();

      await expect(element).toHaveCustomState('user-valid');
      await expect(element).not.toHaveCustomState('user-invalid');

      await element.press('Backspace');
      await element.blur();

      await expect(element).not.toHaveCustomState('user-valid');
      await expect(element).toHaveCustomState('user-invalid');
    });
  });

  test.describe('internal label', () => {
    test('should not display label if no elements assigned to the `label` slot', async ({ fastPage }) => {
      const { element } = fastPage;
      const label = element.locator('label');

      await expect(label).toBeHidden();
    });

    test('should display label when defined and associate to the internal textarea', async ({ fastPage }) => {
      const { element } = fastPage;
      const label = element.locator('label');
      const control = element.locator('textarea');

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <fluent-label slot="label">Details</fluent-label>
        `,
      });

      await expect(label).toBeVisible();
      await expect(control).toHaveAccessibleName('Details');
    });

    test('should not include `label` slotted elements in its value', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <fluent-label slot="label">Details</fluent-label>
          Some text
        `,
      });

      await expect(element).toHaveJSProperty('value', 'Some text');
    });

    test('should downstream `required` to the label', async ({ fastPage }) => {
      const { element } = fastPage;
      const label = element.locator('fluent-label');

      await fastPage.setTemplate({
        attributes: { required: true },
        innerHTML: /* html */ `
          <fluent-label slot="label">Details</fluent-label>
        `,
      });

      await expect(label).toHaveJSProperty('required', true);

      await element.evaluate((el: TextArea) => {
        el.required = false;
      });

      await expect(label).toHaveJSProperty('required', false);
    });

    test('should downstream `disabled` to the label', async ({ fastPage }) => {
      const { element } = fastPage;
      const label = element.locator('fluent-label');

      await fastPage.setTemplate({
        attributes: { disabled: true },
        innerHTML: /* html */ `
          <fluent-label slot="label">Details</fluent-label>
        `,
      });

      await expect(label).toHaveJSProperty('disabled', true);

      await element.evaluate((el: TextArea) => {
        el.disabled = false;
      });

      await expect(label).toHaveJSProperty('disabled', false);
    });

    for (const size of Object.values(TextAreaSize)) {
      test(`should downstream \`${size}\` size to the label`, async ({ fastPage }) => {
        const { element } = fastPage;
        const label = element.locator('fluent-label');

        await fastPage.setTemplate({
          attributes: { size },
          innerHTML: /* html */ `
            <fluent-label slot="label">Details</fluent-label>
          `,
        });

        await expect(label).toHaveJSProperty('size', size);
      });
    }
  });

  test.describe('`value` and `defaultValue` props', () => {
    test('should have `defaultValue` as empty string if no children', async ({ fastPage }) => {
      const { element } = fastPage;

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', '');
    });

    test('should have `defaultValue` as its inner text if has text content', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({
        innerHTML: 'some text',
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as its inner HTML if has HTML content', async ({ fastPage, page }) => {
      const { element } = fastPage;

      const expectedValue = '<div>some text</div><p>more text</p>';

      await fastPage.setTemplate({ innerHTML: expectedValue });

      await expect(element).toHaveJSProperty('defaultValue', expectedValue);
      await expect(element).toHaveJSProperty('value', expectedValue);
    });

    test('should have `defaultValue` as set to `defaultValue` prop', async ({ fastPage }) => {
      const { element } = fastPage;

      await element.evaluate((el: TextArea) => {
        el.defaultValue = 'some text';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should not have `defaultValue` as set to `value` prop', async ({ fastPage }) => {
      const { element } = fastPage;

      await element.evaluate((el: TextArea) => {
        el.value = 'some text';
      });

      await expect(element).not.toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as set to `innerText`', async ({ fastPage }) => {
      const { element } = fastPage;

      await element.evaluate((el: TextArea) => {
        el.innerText = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some<br>text');
      await expect(element).toHaveJSProperty('value', 'some<br>text');
    });

    test('should have `defaultValue` as set to `textContent`', async ({ fastPage }) => {
      const { element } = fastPage;

      await element.evaluate((el: TextArea) => {
        el.textContent = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some\ntext');
      await expect(element).toHaveJSProperty('value', 'some\ntext');
    });

    test('should have `defaultValue` as set to the `defaultValue` prop before connected', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate('');
      await page.evaluate(() => {
        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.defaultValue = 'some text';
        document.body.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should set `value` before connected', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate('');
      await page.evaluate(() => {
        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.value = 'some text';
        document.body.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', 'some text');
      await expect(control).toHaveValue('some text');
    });

    // This behavior is consistent with the built-in `<textarea>` element
    test('should only downstream to the `value` prop before user interaction', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate({ innerHTML: '1' });

      await element.evaluate((el: TextArea) => {
        el.defaultValue = '2';
      });

      await expect(element).toHaveJSProperty('value', '2');
      await expect(element).toHaveJSProperty('defaultValue', '2');

      await control.fill('3');

      await expect(element).toHaveJSProperty('value', '3');
      await expect(element).toHaveJSProperty('defaultValue', '2');

      await element.evaluate((el: TextArea) => {
        el.defaultValue = '4';
      });

      await expect(element).toHaveJSProperty('value', '3');
      await expect(element).toHaveJSProperty('defaultValue', '4');

      await element.evaluate((el: TextArea) => {
        el.value = '5';
      });

      await expect(element).toHaveJSProperty('value', '5');
      await expect(element).toHaveJSProperty('defaultValue', '4');
    });

    test('should never be upstreamed by the `value` prop', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ innerHTML: '1' });

      await element.evaluate((el: TextArea) => {
        el.value = '2';
      });

      await expect(element).toHaveJSProperty('value', '2');
      await expect(element).toHaveJSProperty('defaultValue', '1');
    });

    test('should return the text length of the value with `textLength` prop', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await control.fill('123456\n7890 ');

      await expect(element).toHaveJSProperty('textLength', 12);
    });
  });

  test.describe('validity and validation message', () => {
    test('should set `valueMissing` flag if required and value is empty', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate({ attributes: { required: true } });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);

      await control.fill('some text');

      await expect(element).toHaveJSProperty('validity.valueMissing', false);
      await expect(element).toHaveJSProperty('validity.valid', true);

      await control.selectText();
      await element.press('Backspace');

      await expect(element).toHaveJSProperty('validity.valueMissing', true);

      await element.evaluate((el: TextArea) => {
        el.required = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', false);
      await expect(element).toHaveJSProperty('validity.valid', true);
    });

    test('should set `tooShort` flag if value is shorter than `minlength`', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { minlength: '10' } });

      // `tooShort` is not set until user interacted.
      await expect(element).toHaveJSProperty('validity.tooShort', false);
      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.pressSequentially('123');

      await expect(element).toHaveJSProperty('validity.tooShort', true);

      await element.evaluate((el: TextArea) => {
        el.minLength = 2;
      });

      await expect(element).toHaveJSProperty('validity.tooShort', false);
      await expect(element).toHaveJSProperty('validity.valid', true);
    });

    test('should set `tooLong` flag if value is longer than `maxlength`', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate({ attributes: { maxlength: '3' }, innerHTML: '12345' });

      // `tooLong` is not set until user interacted.
      await expect(element).toHaveJSProperty('validity.tooLong', false);
      await expect(element).toHaveJSProperty('validity.valid', true);

      // Move cursor to the end of the text then press backspace
      await control.selectText();
      await element.press('ArrowRight');
      await element.press('Backspace'); // value = 1234

      await expect(element).toHaveJSProperty('validity.tooLong', true);

      // Move cursor to the end of the text then press backspace
      await control.selectText();
      await element.press('ArrowRight');
      await element.press('Backspace'); // value = 123

      await expect(element).toHaveJSProperty('validity.tooLong', false);
      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.maxLength = 2;
      });

      await expect(element).toHaveJSProperty('validity.tooLong', true);

      await element.evaluate((el: TextArea) => {
        el.maxLength = 4;
      });

      await expect(element).toHaveJSProperty('validity.tooLong', false);
      await expect(element).toHaveJSProperty('validity.valid', true);
    });

    test('should always be valid if disabled', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { disabled: true, required: true } });

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.disabled = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    test('should always be valid if read-only', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate(/* html */ `
        <fluent-textarea required readonly></fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.readOnly = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    test('should set the correct validation message for `valueMissing` validity state', async ({
      fastPage,
      browserName,
    }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      const messages: Record<string, string> = {
        chromium: 'Please fill out this field.',
        edge: 'Please fill out this field.',
        firefox: 'Please fill out this field.',
        webkit: 'Fill out this field',
      };

      await fastPage.setTemplate({ attributes: { required: true } });

      await expect.soft(element).toHaveJSProperty('validationMessage', messages[browserName]);

      await control.fill('12345');

      await expect(element).toHaveJSProperty('validationMessage', '');
    });

    test('should set the correct validation message for `tooShort` validity state', async ({
      fastPage,
      browserName,
    }) => {
      const { element } = fastPage;

      const messages: Record<string, string> = {
        chromium: 'Please lengthen this text to 6 characters or more (you are currently using 5 characters).',
        firefox: 'Please use at least 6 characters (you are currently using 5 characters).',
        webkit: 'Use at least 6 characters',
      };

      await fastPage.setTemplate({ attributes: { minlength: '6' } });

      await element.pressSequentially('12345');

      await expect.soft(element).toHaveJSProperty('validationMessage', messages[browserName]);

      await element.press('6');

      await expect(element).toHaveJSProperty('validationMessage', '');
    });

    test('should set the correct validation message for `tooLong` validity state', async ({
      fastPage,
      browserName,
    }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      const messages: Record<string, string> = {
        chromium: 'Please shorten this text to 7 characters or less (you are currently using 8 characters).',
        edge: 'Please shorten this text to 7 characters or less (you are currently using 8 characters).',
        firefox: 'Please shorten this text to 7 characters or less (you are currently using 8 characters).',
        webkit: 'Use no more than 7 characters',
      };

      await control.fill('12345678');

      await element.evaluate((node: TextArea) => {
        node.setAttribute('maxlength', '7');
      });

      await expect(element).toHaveJSProperty('validationMessage', messages[browserName]);

      await element.press('Backspace');

      await expect(element).toHaveJSProperty('validationMessage', '');
    });

    test('should NOT show validation message when disabled', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { required: true, disabled: true } });

      await expect(element).toHaveJSProperty('validationMessage', '');
    });
  });

  test.describe('with form', () => {
    test('should connect to the given `<form>` element', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate(/* html */ `
        <form id="form1">
          <fluent-textarea></fluent-textarea>
        </form>
        <form id="form2"></form>
      `);

      await expect(element).toHaveJSProperty('form.id', 'form1');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('form', 'form2');
      });

      await expect(element).toHaveJSProperty('form.id', 'form2');
    });

    test('should be disabled when the parent `<fieldset>` is disabled', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate(/* html */ `
        <form>
          <fieldset>
            <fluent-textarea></fluent-textarea>
          </fieldset>
        </form>
      `);

      const fieldset = page.locator('fieldset');

      await fieldset.evaluate((node: HTMLFieldSetElement) => {
        node.disabled = true;
      });

      // The `disabled` property and attribute should not be affected.
      await expect(element).toHaveJSProperty('disabled', false);
      await expect(element).not.toHaveAttribute('disabled');
      // But `ariaDisabled` and `tabIndex` should be updated.
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
      await expect(control).toBeDisabled();

      await fieldset.evaluate((node: HTMLFieldSetElement) => {
        node.disabled = false;
      });

      // The `disabled` property and attribute should not be affected.
      await expect(element).toHaveJSProperty('disabled', false);
      await expect(element).not.toHaveAttribute('disabled');
      // But `ariaDisabled` and `tabIndex` should be updated.
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
      await expect(control).toBeEnabled();
    });

    test.describe('form reset', () => {
      test('should reset value to empty if no `defaultValue`', async ({ fastPage, page }) => {
        const { element } = fastPage;
        const control = element.locator('textarea');
        const form = page.locator('form');
        const reset = form.locator('button[type=reset]');

        await fastPage.setTemplate(/* html */ `
          <form>
            <fluent-textarea></fluent-textarea>
            <button type="reset"></button>
          </form>
        `);

        await control.fill('1234');

        await expect(element).toHaveJSProperty('value', '1234');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '');
      });

      test('should reset value to `defaultvalue`', async ({ fastPage, page }) => {
        const { element } = fastPage;
        const control = element.locator('textarea');
        const reset = page.locator('button[type="reset"]');

        await fastPage.setTemplate(/* html */ `
          <form>
            <fluent-textarea>1234</fluent-textarea>
            <button type="reset"></button>
          </form>
        `);

        await control.selectText();
        await element.press('ArrowRight');
        await element.press('5');

        await expect(element).toHaveJSProperty('value', '12345');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '1234');
      });

      test('should reset value to updated `defaultValue`', async ({ fastPage, page }) => {
        const { element } = fastPage;
        const control = element.locator('textarea');
        const reset = page.locator('button[type="reset"]');

        await fastPage.setTemplate(/* html */ `
          <form>
            <fluent-textarea>1234</fluent-textarea>
            <button type="reset"></button>
          </form>
        `);

        await element.evaluate((el: TextArea) => {
          el.defaultValue = '7890';
        });

        await control.fill('abcd');

        await expect(element).toHaveJSProperty('value', 'abcd');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '7890');
      });
    });

    test('should set form value', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');
      const form = page.locator('form');

      await fastPage.setTemplate(/* html */ `
        <form>
          <fluent-textarea name="content"></fluent-textarea>
        </form>
      `);

      const formData1 = await form.evaluate((node: HTMLFormElement) => {
        return Array.from(new FormData(node).entries());
      });

      expect(formData1).toStrictEqual([['content', '']]);

      await control.fill('some text');
      const formData2 = await form.evaluate((node: HTMLFormElement) => {
        return Array.from(new FormData(node).entries());
      });

      expect(formData2).toStrictEqual([['content', 'some text']]);
    });
  });

  test.describe('`select` events', () => {
    test('should emit when text is selected', async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('textarea');

      await fastPage.setTemplate({ innerHTML: '12345' });

      const [wasSelected] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('select', () => resolve(true), { once: true })),
        ),
        control.selectText(),
      ]);

      expect(wasSelected).toBe(true);
    });

    test('should emit when `select()` is called', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ innerHTML: '12345' });

      const [wasSelected] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('select', () => resolve(true), { once: true })),
        ),
        element.evaluate((el: TextArea) => {
          el.select();
        }),
      ]);

      expect(wasSelected).toBe(true);
    });
  });

  test.describe('`change` events', () => {
    test('should emit a `change` event when value changes and the control loses focus', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ innerHTML: '12345' });

      const [wasChanged] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('change', () => resolve(true), { once: true })),
        ),
        (async () => {
          await element.press('0');
          await element.blur();
        })(),
      ]);

      expect(wasChanged).toBe(true);
    });

    test('should NOT emit a `change` event when the value is the same and the control loses focus', async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ innerHTML: '12345' });

      const wasChanged = element.evaluate(node =>
        Promise.race([
          new Promise(resolve => node.addEventListener('change', () => resolve(true))),
          new Promise(resolve => setTimeout(() => resolve(false), 100)),
        ]),
      );

      await element.press('0');
      await element.press('Backspace');
      await element.blur();

      await expect(wasChanged).resolves.toBe(false);
    });
  });
});
