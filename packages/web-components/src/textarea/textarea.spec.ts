import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { expectToHaveState, fixtureURL } from '../helpers.tests.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';
import type { TextArea } from './textarea.js';

test.describe('TextArea', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let control: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    root = page.locator('#root');
    element = root.locator('fluent-textarea');
    control = element.locator('textarea');

    await page.goto(fixtureURL('components-textarea--text-area'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  // TODO: This should test elementInternals.role === 'textbox' when Reference Target is widely supported.
  test('should not have a role on element internals', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-textarea></fluent-textarea>
      `;
    });

    await expect(element).toHaveJSProperty('elementInternals.role', 'presentation');
  });

  test("should always return 'textarea' for the `type` prop", async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-textarea></fluent-textarea>
      `;
    });

    await expect(element).toHaveJSProperty('type', 'textarea');
  });

  test('should pass down attributes to the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
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
      `;
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

  test('should be associated with the given labels', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <label for="textarea" data-testid="label1">Text area</label>
        <fluent-textarea id="textarea"></fluent-textarea>
        <label for="textarea" data-testid="label2">Text area</lable>
      `;
    });

    const label1El = await root.getByTestId('label1').evaluate(node => node);
    const label2El = await root.getByTestId('label2').evaluate(node => node);
    const labelsValue = await element.evaluate((el: TextArea) => Array.from(el.labels));

    expect(labelsValue).toStrictEqual([label1El, label2El]);
  });

  test('should be focused when associated label is clicked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <label for="textarea">Text area</label>
        <fluent-textarea id="textarea"></fluent-textarea>
      `;
    });

    const label = root.locator('label');

    await label.click();

    await expect(control).toBeFocused();
  });

  test('should have the contrl focused when `focus()` is called', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-textarea id="textarea"></fluent-textarea>
      `;
    });

    await element.evaluate((el: TextArea) => {
      el.focus();
    });

    await expect(control).toBeFocused();
  });

  test.describe('visual styles', () => {
    test('should have default custom states', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'outline');
      await expectToHaveState(element, 'auto-resize', false);
      await expectToHaveState(element, 'block', false);
      await expectToHaveState(element, 'display-shadow', false);
      await expectToHaveState(element, 'resize', false);
    });

    test('should toggle appearance states', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea appearance="filled-darker"></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'filled-darker');
      await expectToHaveState(element, 'filled-lighter', false);
      await expectToHaveState(element, 'outline', false);

      await element.evaluate((node: TextArea) => {
        node.appearance = 'filled-lighter';
      });

      await expectToHaveState(element, 'filled-lighter');
      await expectToHaveState(element, 'filled-darker', false);
      await expectToHaveState(element, 'outline', false);

      await element.evaluate((node: TextArea) => {
        node.removeAttribute('appearance');
      });

      await expectToHaveState(element, 'outline');
      await expectToHaveState(element, 'filled-lighter', false);
      await expectToHaveState(element, 'filled-darker', false);
    });

    test('should toggle auto-resize state', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea auto-resize></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'auto-resize');

      await element.evaluate((node: TextArea) => {
        node.autoResize = false;
      });

      await expectToHaveState(element, 'auto-resize', false);
    });

    test('should toggle block state', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea block></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'block');

      await element.evaluate((node: TextArea) => {
        node.block = false;
      });

      await expectToHaveState(element, 'block', false);
    });

    test('should toggle display-shadow state', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea display-shadow></fluent-textarea>
        `;
      });

      // Expecting `false` because the default appearance, outline, shouldn’t have shadow
      await expectToHaveState(element, 'display-shadow', false);

      await element.evaluate((el: TextArea, apperance: TextAreaAppearance) => {
        el.appearance = apperance;
      }, TextAreaAppearance.filledDarker);

      await expectToHaveState(element, 'display-shadow');

      await element.evaluate((el: TextArea) => {
        el.displayShadow = false;
      });

      await expectToHaveState(element, 'display-shadow', false);

      await element.evaluate((el: TextArea, apperance: TextAreaAppearance) => {
        el.displayShadow = true;
        el.appearance = apperance;
      }, TextAreaAppearance.filledLighter);

      await expectToHaveState(element, 'display-shadow');
    });

    test('should toggle resize states', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea resize="both"></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'resize');
      await expectToHaveState(element, 'resize-both');
      await expectToHaveState(element, 'resize-vertical', false);
      await expectToHaveState(element, 'resize-horizontal', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.horizontal);

      await expectToHaveState(element, 'resize');
      await expectToHaveState(element, 'resize-horizontal');
      await expectToHaveState(element, 'resize-vertical', false);
      await expectToHaveState(element, 'resize-both', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.vertical);

      await expectToHaveState(element, 'resize');
      await expectToHaveState(element, 'resize-vertical');
      await expectToHaveState(element, 'resize-horizontal', false);
      await expectToHaveState(element, 'resize-both', false);

      await element.evaluate((node: TextArea, resize: TextAreaResize) => {
        node.resize = resize;
      }, TextAreaResize.none);

      await expectToHaveState(element, 'resize', false);
      await expectToHaveState(element, 'resize-horizontal', false);
      await expectToHaveState(element, 'resize-vertical', false);
    });

    test('should toggle size states', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea size="small"></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'small');
      await expectToHaveState(element, 'large', false);

      await element.evaluate((node: TextArea, size: TextAreaSize) => {
        node.size = size;
      }, TextAreaSize.large);

      await expectToHaveState(element, 'large');
      await expectToHaveState(element, 'small', false);

      await element.evaluate((node: TextArea) => {
        node.removeAttribute('size');
      });

      await expectToHaveState(element, 'small', false);
      await expectToHaveState(element, 'large', false);
    });

    test('should toggle user-invalid state', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea required></fluent-textarea>
        `;
      });

      await expectToHaveState(element, 'user-valid', false);
      await expectToHaveState(element, 'user-invalid', false);

      await control.fill('a');
      await element.blur();

      await expectToHaveState(element, 'user-valid', true);
      await expectToHaveState(element, 'user-invalid', false);

      await element.press('Backspace');
      await element.blur();

      await expectToHaveState(element, 'user-valid', false);
      await expectToHaveState(element, 'user-invalid', true);
    });
  });

  test.describe('`value` and `defaultValue` props', () => {
    test('should have `defaultValue` as empty string if no children', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', '');
    });

    test('should have `defaultValue` as its inner text if has text content', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea>
            some text
          </fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as its inner HTML if has HTML content', async () => {
      await root.evaluate(node => {
        node.innerHTML = [
          '<fluent-textarea>',
          '  <div>some text</div>',
          '  <p>more text</p>',
          '</fluent-textarea>',
        ].join('\n');
      });

      const expectedValue = '<div>some text</div>\n  <p>more text</p>';
      await expect(element).toHaveJSProperty('defaultValue', expectedValue);
      await expect(element).toHaveJSProperty('value', expectedValue);
    });

    test('should have `defaultValue` as set to `defaultValue` prop', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await element.evaluate((el: TextArea) => {
        el.defaultValue = 'some text';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should not have `defaultValue` as set to `value` prop', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await element.evaluate((el: TextArea) => {
        el.value = 'some text';
      });

      await expect(element).not.toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should have `defaultValue` as set to `innerText`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await element.evaluate((el: TextArea) => {
        el.innerText = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some<br>text');
      await expect(element).toHaveJSProperty('value', 'some<br>text');
    });

    test('should have `defaultValue` as set to `textContent`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await element.evaluate((el: TextArea) => {
        el.textContent = '  some\ntext  ';
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some\ntext');
      await expect(element).toHaveJSProperty('value', 'some\ntext');
    });

    test('should have `defaultValue` as set to the `defaultValue` prop before connected', async () => {
      await root.evaluate(async node => {
        node.innerHTML = '';

        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.defaultValue = 'some text';
        node.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });

    test('should set `value` before connected', async () => {
      await root.evaluate(node => {
        node.innerHTML = '';

        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.value = 'some text';
        node.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', 'some text');
      await expect(control).toHaveValue('some text');
    });

    // This behavior is consistent with the built-in `<textarea>` element
    test('should only downstream to the `value` prop before user interaction', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea>1</fluent-textarea>
        `;
      });

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

    test('should never be upstreamed by the `value` prop', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea>1</fluent-textarea>
        `;
      });

      await element.evaluate((el: TextArea) => {
        el.value = '2';
      });

      await expect(element).toHaveJSProperty('value', '2');
      await expect(element).toHaveJSProperty('defaultValue', '1');
    });

    test('should return the text length of the value with `textLength` prop', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await control.fill('123456\n7890 ');

      await expect(element).toHaveJSProperty('textLength', 12);
    });
  });

  test.describe('validity and validation message', () => {
    test('should set `valueMissing` flag if required and value is empty', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea required></fluent-textarea>
        `;
      });

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

    test('should set `tooShort` flag if value is shorter than `minlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea minlength="10"></fluent-textarea>
        `;
      });

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

    test('should set `tooLong` flag if value is longer than `maxlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea maxlength="3">12345</fluent-textarea>
        `;
      });

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

    test('should always be valid if disabled', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea required disabled></fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.disabled = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    test('should always be valid if read-only', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea required readonly></fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('validity.valid', true);

      await element.evaluate((el: TextArea) => {
        el.readOnly = false;
      });

      await expect(element).toHaveJSProperty('validity.valueMissing', true);
      await expect(element).toHaveJSProperty('validity.valid', false);
    });

    // TODO: Update validation messages for other browsers.
    test('should set the correct validation messages', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea required></fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('validationMessage', 'Please fill out this field.');

      await control.fill('12345');

      await expect(element).toHaveJSProperty('validationMessage', '');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('minlength', '6');
      });

      await expect(element).toHaveJSProperty(
        'validationMessage', 
        'Please lengthen this text to 6 characters or more (you are currently using 5 characters).'
      );

      await element.press('6');

      await expect(element).toHaveJSProperty('validationMessage', '');

      await element.pressSequentially('78');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('maxlength', '7');
      });

      await expect(element).toHaveJSProperty(
        'validationMessage', 
        'Please shorten this text to 7 characters or less (you are currently using 8 characters).'
      );

      await element.evaluate((el: TextArea) => {
        el.setAttribute('disabled', '');
      });

      await expect(element).toHaveJSProperty('validationMessage', '');
    });
  });

  test.describe('with form', () => {
    test('should connect to the given `<form>` element', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <form id="form1">
            <fluent-textarea></fluent-textarea>
          </form>
          <form id="form2"></form>
        `;
      });

      await expect(element).toHaveJSProperty('form.id', 'form1');

      await element.evaluate((el: TextArea) => {
        el.setAttribute('form', 'form2');
      });

      await expect(element).toHaveJSProperty('form.id', 'form2');
    });

    test('should be disabled when the parent `<fieldset>` is disabled', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <form>
            <fieldset>
              <fluent-textarea></fluent-textarea>
            </fieldset>
          </form>
        `;
      });

      const fieldset = root.locator('fieldset');

      await fieldset.evaluate((node: HTMLFieldSetElement) => {
        node.disabled = true;
      });

      // The `disabled` property and attribute should not be affected.
      await expect(element).toHaveJSProperty('disabled', false);
      await expect(element).not.toHaveAttribute('disabled');
      // But `ariaDisabled` and `tabIndex` should be updated.
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

      await fieldset.evaluate((node: HTMLFieldSetElement) => {
        node.disabled = false;
      });

      // The `disabled` property and attribute should not be affected.
      await expect(element).toHaveJSProperty('disabled', false);
      await expect(element).not.toHaveAttribute('disabled');
      // But `ariaDisabled` and `tabIndex` should be updated.
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
    });

    test.describe('form reset', () => {
      let form: Locator;
      let reset: Locator;

      test.beforeEach(async () => {
        form = root.locator('form');
        reset = form.locator('button[type=reset]');
      });

      test('should reset value to empty if no `defaultValue`', async () => {
        await root.evaluate(node => {
          node.innerHTML = /* html */ `
            <form>
              <fluent-textarea></fluent-textarea>
              <button type="reset"></button>
            </form>
          `;
        });

        await control.fill('1234');

        await expect(element).toHaveJSProperty('value', '1234');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '');
      });

      test('should reset value to `defaultvalue`', async () => {
        await root.evaluate(node => {
          node.innerHTML = /* html */ `
            <form>
              <fluent-textarea>1234</fluent-textarea>
              <button type="reset"></button>
            </form>
          `;
        });

        await control.selectText();
        await element.press('ArrowRight');
        await element.press('5');

        await expect(element).toHaveJSProperty('value', '12345');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '1234');
      });

      test('should reset value to updated `defaultValue`', async () => {
        await root.evaluate(node => {
          node.innerHTML = /* html */ `
            <form>
              <fluent-textarea>1234</fluent-textarea>
              <button type="reset"></button>
            </form>
          `;
        });

        await element.evaluate((el: TextArea) => {
          el.defaultValue = '7890';
        });

        await control.fill('abcd');

        await expect(element).toHaveJSProperty('value', 'abcd');

        await reset.click();

        await expect(element).toHaveJSProperty('value', '7890');
      });
    });

    test('should set form value', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <form>
            <fluent-textarea name="content"></fluent-textarea>
          </form>
        `;
      });

      let formData;

      const form = root.locator('form');
      formData = await form.evaluate((node: HTMLFormElement) => {
        return Array.from(new FormData(node).entries());
      });

      expect(formData).toStrictEqual([['content', '']]);

      await control.fill('some text');
      formData = await form.evaluate((node: HTMLFormElement) => {
        return Array.from(new FormData(node).entries());
      });

      expect(formData).toStrictEqual([['content', 'some text']]);
    });
  });

  test.describe('`select` events', () => {
    test.beforeEach(async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea>12345</fluent-textarea>
        `;
      });
    });

    test('should emit when text is selected', async () => {
      const [wasSelected] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('select', () => resolve(true), { once: true }))
        ),
        control.selectText(),
      ]);

      expect(wasSelected).toBe(true);
    });

    test('should emit when `select()` is called', async () => {
      const [wasSelected] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('select', () => resolve(true), { once: true }))
        ),
        element.evaluate((el: TextArea) => {
          el.select();
        }),
      ]);

      expect(wasSelected).toBe(true);
    });
  });

  test.describe('`change` events', () => {
    test.beforeEach(async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea>12345</fluent-textarea>
        `;
      });
    });

    test('should emit if value changed before blur', async () => {
      const [wasChanged] = await Promise.all([
        element.evaluate(
          el => new Promise(resolve => el.addEventListener('change', () => resolve(true), { once: true }))
        ),
        (async () => {
          await element.press('0');
          await element.blur();
        })(),
      ]);

      expect(wasChanged).toBe(true);
    });

    test('should not emit if value didn’t change before blur', async () => {
      const [wasChanged] = await Promise.all([
        element.evaluate(el => {
          return new Promise(resolve => {
            // If, after 1 second, the promise hasn’t fulfilled, consider the
            // event didn’t fire.
            const timeout = setTimeout(() => {
              resolve(false);
            }, 1000);

            el.addEventListener('change', () => {
              clearTimeout(timeout);
              resolve(true);
            }, { once: true });
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
