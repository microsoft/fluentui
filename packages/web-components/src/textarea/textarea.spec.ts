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
    element = page.locator('fluent-textarea');
    root = page.locator('#root');
    control = root.locator('textarea');

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

      await element.focus();
      await element.press('a');
      await element.blur();

      await expectToHaveState(element, 'user-valid', true);
      await expectToHaveState(element, 'user-invalid', false);

      await element.focus();
      await element.press('Backspace');
      await element.blur();

      await expectToHaveState(element, 'user-valid', false);
      await expectToHaveState(element, 'user-invalid', true);
    });
  });

  test.describe('default value', () => {
    test('should have default value as empty string if no children', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
          <fluent-textarea></fluent-textarea>
        `;
      });

      await expect(element).toHaveJSProperty('defaultValue', '');
      await expect(element).toHaveJSProperty('value', '');
    });

    test('should have default value as its inner text if has text content', async () => {
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

    test('should have default value as its inner HTML if has HTML content', async () => {
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

    test('should have default value as set to defaultValue prop', async () => {
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

    test('should not have default value as set to value prop', async () => {
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

    test('should have default value as set to innerText', async () => {
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

    test('should have default value as set to textContent', async () => {
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

    test('should have default value as set to the defaultValue prop before connected', async () => {
      await root.evaluate(async (node) => {
        node.innerHTML = '';

        const textarea = document.createElement('fluent-textarea') as TextArea;
        textarea.defaultValue = 'some text';
        node.append(textarea);
      });

      await expect(element).toHaveJSProperty('defaultValue', 'some text');
      await expect(element).toHaveJSProperty('value', 'some text');
    });
  });
});
