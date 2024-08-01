import { test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';
import type { TextArea } from './textarea.js';

test.describe('TextArea', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-textarea--text-area'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-textarea'));
  });

  // TODO: This should test elementInternals.role === 'textbox' when Reference Target is widely supported.
  test('should not have a role on element internals', async ({page}) => {
    const element = page.locator('fluent-textarea');

    await page.setContent(/* html */ `
      <fluent-textarea></fluent-textarea>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'presentation');
  });

  test("should always return 'textarea' for the `type` prop", async ({page}) => {
    const element = page.locator('fluent-textarea');

    await page.setContent( /* html */ `
      <fluent-textarea></fluent-textarea>
    `);

    await expect(element).toHaveJSProperty('type', 'textarea');
  });

  test('should pass down attributes to the internal control', async ({page}) => {
    const element = page.locator('fluent-textarea');
    const control = element.locator('textarea');

    await page.setContent( /* html */ `
      <fluent-textarea
        required
        disabled
        readonly
        spellcheck
        autocomplete="on"
        maxlength="100"
        minlength="10"
        placeholder="Placeholder"
      ></fluent-textarea>
    `);

    await expect(control).toHaveJSProperty('required', true);
    await expect(control).toHaveJSProperty('disabled', true);
    await expect(control).toHaveJSProperty('readOnly', true);
    await expect(control).toHaveJSProperty('spellcheck', true);
    await expect(control).toHaveJSProperty('autocomplete', 'on');
    await expect(control).toHaveJSProperty('maxLength', 100);
    await expect(control).toHaveJSProperty('minLength', 10);
    await expect(control).toHaveJSProperty('placeholder', 'Placeholder');
  });

  test('should be associated with the given labels', async ({page}) => {
    const element = page.locator('fluent-textarea');

    await page.setContent( /* html */ `
      <label for="textarea" data-testid="label1">Text area</label>
      <fluent-textarea id="textarea"></fluent-textarea>
      <label for="textarea" data-testid="label2">Text area</lable>
    `);

    const label1El = await page.getByTestId('label1').evaluate(node => node);
    const label2El = await page.getByTestId('label2').evaluate(node => node);
    const labelsValue = await element.evaluate((el: TextArea) => Array.from(el.labels));

    expect(labelsValue).toStrictEqual([label1El, label2El]);
  });

  test('should be focused when associated label is clicked', async ({page}) => {
    const element = page.locator('fluent-textarea');
    const control = element.locator('textarea');

    await page.setContent( /* html */ `
      <label for="textarea">Text area</label>
      <fluent-textarea id="textarea"></fluent-textarea>
    `);

    const label = page.locator('label');

    await label.click();

    await expect(control).toBeFocused();
  });

  test('should have the contrl focused when `focus()` is called', async ({page}) => {
    const element = page.locator('fluent-textarea');
    const control = element.locator('textarea');

    await page.setContent( /* html */ `
      <fluent-textarea id="textarea"></fluent-textarea>
    `);

    await element.evaluate((el: TextArea) => {
      el.focus();
    });

    await expect(control).toBeFocused();
  });

  test.describe('visual styles', () => {
    test('should have default custom states', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('outline');
      await expect(element).toHaveCustomState('auto-resize', false);
      await expect(element).toHaveCustomState('block', false);
      await expect(element).toHaveCustomState('display-shadow', false);
      await expect(element).toHaveCustomState('resize', false);
    });

    test('should toggle appearance states', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea appearance="filled-darker"></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('filled-darker');
      await expect(element).toHaveCustomState('filled-lighter', false);
      await expect(element).toHaveCustomState('outline', false);

      await element.evaluate((node: TextArea) => {
        node.appearance = 'filled-lighter';
      });

      await expect(element).toHaveCustomState('filled-lighter');
      await expect(element).toHaveCustomState('filled-darker', false);
      await expect(element).toHaveCustomState('outline', false);

      await element.evaluate((node: TextArea) => {
        node.removeAttribute('appearance');
      });

      await expect(element).toHaveCustomState('outline');
      await expect(element).toHaveCustomState('filled-lighter', false);
      await expect(element).toHaveCustomState('filled-darker', false);
    });

    test('should toggle auto-resize state', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea auto-resize></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('auto-resize');

      await element.evaluate((node: TextArea) => {
        node.autoResize = false;
      });

      await expect(element).toHaveCustomState('auto-resize', false);
    });

    test('should toggle block state', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea block></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('block');

      await element.evaluate((node: TextArea) => {
        node.block = false;
      });

      await expect(element).toHaveCustomState('block', false);
    });

    test('should toggle display-shadow state', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea display-shadow></fluent-textarea>
      `);

      // Expecting `false` because the default appearance, outline, shouldn’t have shadow
      await expect(element).toHaveCustomState('display-shadow', false);

      await element.evaluate((el: TextArea, apperance: TextAreaAppearance) => {
        el.appearance = apperance;
      }, TextAreaAppearance.filledDarker);

      await expect(element).toHaveCustomState('display-shadow');

      await element.evaluate((el: TextArea) => {
        el.displayShadow = false;
      });

      await expect(element).toHaveCustomState('display-shadow', false);

      await element.evaluate((el: TextArea, apperance: TextAreaAppearance) => {
        el.displayShadow = true;
        el.appearance = apperance;
      }, TextAreaAppearance.filledLighter);

      await expect(element).toHaveCustomState('display-shadow');
    });

    test('should toggle resize states', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea resize="both"></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('resize');
      await expect(element).toHaveCustomState('resize-both');
      await expect(element).toHaveCustomState('resize-vertical', false);
      await expect(element).toHaveCustomState('resize-horizontal', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.horizontal);

      await expect(element).toHaveCustomState('resize');
      await expect(element).toHaveCustomState('resize-horizontal');
      await expect(element).toHaveCustomState('resize-vertical', false);
      await expect(element).toHaveCustomState('resize-both', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.vertical);

      await expect(element).toHaveCustomState('resize');
      await expect(element).toHaveCustomState('resize-vertical');
      await expect(element).toHaveCustomState('resize-horizontal', false);
      await expect(element).toHaveCustomState('resize-both', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.none);

      await expect(element).toHaveCustomState('resize', false);
      await expect(element).toHaveCustomState('resize-horizontal', false);
      await expect(element).toHaveCustomState('resize-vertical', false);
    });

    test('should toggle size states', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea size="small"></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('small');
      await expect(element).toHaveCustomState('large', false);

      await element.evaluate((node: TextArea, size: TextAreaSize) => {
        node.size = size;
      }, TextAreaSize.large);

      await expect(element).toHaveCustomState('large');
      await expect(element).toHaveCustomState('small', false);

      await element.evaluate((node: TextArea) => {
        node.removeAttribute('size');
      });

      await expect(element).toHaveCustomState('small', false);
      await expect(element).toHaveCustomState('large', false);
    });

    test('should toggle user-invalid state', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea required></fluent-textarea>
      `);

      await expect(element).toHaveCustomState('user-valid', false);
      await expect(element).toHaveCustomState('user-invalid', false);

      await control.fill('a');
      await element.blur();

      await expect(element).toHaveCustomState('user-valid', true);
      await expect(element).toHaveCustomState('user-invalid', false);

      await element.press('Backspace');
      await element.blur();

      await expect(element).toHaveCustomState('user-valid', false);
      await expect(element).toHaveCustomState('user-invalid', true);
    });
  });

  test.describe('`value` and `defaultValue` props', () => {
    test('should have `defaultValue` as empty string if no children', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', '');
    });

    test('should have `defaultValue` as its inner text if has text content', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>
          some text
        </fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as its inner HTML if has HTML content', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent([
        '<fluent-textarea>',
        '  <div>some text</div>',
        '  <p>more text</p>',
        '</fluent-textarea>',
      ].join('\n'));

      const expectedValue = '<div>some text</div>\n  <p>more text</p>';
      await expect(element).toHaveJSProperty('defaultValue', expectedValue);
      await expect(element).toHaveJSProperty('value', expectedValue);
    });

    test('should have `defaultValue` as set to `defaultValue` prop', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await element.evaluate((el: TextArea) => {
        el.defaultValue = 'some text';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should not have `defaultValue` as set to `value` prop', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await element.evaluate((el: TextArea) => {
        el.value = 'some text';
      });

      await expect(element).not.toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as set to `innerText`', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await element.evaluate((el: TextArea) => {
        el.innerText = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some<br>text');
      await expect(element).toHaveJSProperty('value', 'some<br>text');
    });

    test('should have `defaultValue` as set to `textContent`', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await element.evaluate((el: TextArea) => {
        el.textContent = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some\ntext');
      await expect(element).toHaveJSProperty('value', 'some\ntext');
    });

    test('should have `defaultValue` as set to the `defaultValue` prop before connected', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent('');
      await page.evaluate(() => {
        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.defaultValue = 'some text';
        document.body.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should set `value` before connected', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent('');
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
    test('should only downstream to the `value` prop before user interaction', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>1</fluent-textarea>
      `);

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

    test('should never be upstreamed by the `value` prop', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>1</fluent-textarea>
      `);

      await element.evaluate((el: TextArea) => {
        el.value = '2';
      });

      await expect(element).toHaveJSProperty('value', '2');
      await expect(element).toHaveJSProperty('defaultValue', '1');
    });

    test('should return the text length of the value with `textLength` prop', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea></fluent-textarea>
      `);

      await control.fill('123456\n7890 ');

      await expect(element).toHaveJSProperty('textLength', 12);
    });
  });

  test.describe('validity and validation message', () => {
    test('should set `valueMissing` flag if required and value is empty', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea required></fluent-textarea>
      `);

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

    test('should set `tooShort` flag if value is shorter than `minlength`', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea minlength="10"></fluent-textarea>
      `);

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

    test('should set `tooLong` flag if value is longer than `maxlength`', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea maxlength="3">12345</fluent-textarea>
      `);

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

    test('should always be valid if disabled', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea required disabled></fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.disabled = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    test('should always be valid if read-only', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea required readonly></fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.readOnly = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    // TODO: Update validation messages for other browsers.
    test('should set the correct validation messages', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea required></fluent-textarea>
      `);

      await expect(element).toHaveJSProperty('validationMessage', 'Please fill out this field.');

      await control.fill('12345');

      await expect(element).toHaveJSProperty('validationMessage', '');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('minlength', '6');
      });

      await expect(element).toHaveJSProperty(
        'validationMessage',
        'Please lengthen this text to 6 characters or more (you are currently using 5 characters).',
      );

      await element.press('6');

      await expect(element).toHaveJSProperty('validationMessage', '');

      await element.pressSequentially('78');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('maxlength', '7');
      });

      await expect(element).toHaveJSProperty(
        'validationMessage',
        'Please shorten this text to 7 characters or less (you are currently using 8 characters).',
      );

      await element.evaluate((el: TextArea) => {
        el.setAttribute('disabled', '');
      });

      await expect(element).toHaveJSProperty('validationMessage', '');
    });
  });

  test.describe('with form', () => {
    test('should connect to the given `<form>` element', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
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

    test('should be disabled when the parent `<fieldset>` is disabled', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
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
      test('should reset value to empty if no `defaultValue`', async ({page}) => {
        const element = page.locator('fluent-textarea');
        const control = element.locator('textarea');
        const form = page.locator('form');
        const reset = form.locator('button[type=reset]');

        await page.setContent( /* html */ `
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

      test('should reset value to `defaultvalue`', async ({page}) => {
        const element = page.locator('fluent-textarea');
        const control = element.locator('textarea');
        const reset = page.locator('button[type="reset"]');

        await page.setContent( /* html */ `
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

      test('should reset value to updated `defaultValue`', async ({page}) => {
        const element = page.locator('fluent-textarea');
        const control = element.locator('textarea');
        const reset = page.locator('button[type="reset"]');

        await page.setContent( /* html */ `
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

    test('should set form value', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');
      const form = page.locator('form');

      await page.setContent( /* html */ `
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
    test('should emit when text is selected', async ({page}) => {
      const element = page.locator('fluent-textarea');
      const control = element.locator('textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>12345</fluent-textarea>
      `);

      const [wasSelected] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('select', () => resolve(true), { once: true })),
        ),
        control.selectText(),
      ]);

      expect(wasSelected).toBe(true);
    });

    test('should emit when `select()` is called', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>12345</fluent-textarea>
      `);

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
    test('should emit if value changed before blur', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>12345</fluent-textarea>
      `);

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

    test('should not emit if value didn’t change before blur', async ({page}) => {
      const element = page.locator('fluent-textarea');

      await page.setContent( /* html */ `
        <fluent-textarea>12345</fluent-textarea>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(el => {
          return new Promise(resolve => {
            // If, after 1 second, the promise hasn’t fulfilled, consider the
            // event didn’t fire.
            const timeout = setTimeout(() => {
              resolve(false);
            }, 1000);

            el.addEventListener(
              'change',
              () => {
                clearTimeout(timeout);
                resolve(true);
              },
              { once: true },
            );
          });
        }),
        (async () => {
          await element.press('0');
          await element.press('Backspace');
          await element.blur();
        })(),
      ]);

      expect(wasChanged).toBe(false);
    });
  });
});
