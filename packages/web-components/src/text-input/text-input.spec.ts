import { spinalCase } from '@microsoft/fast-web-utilities';
import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { TextInput } from './text-input.js';

test.describe('TextInput', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let control: Locator;
  let label: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-text-input');

    root = page.locator('#root');

    control = element.locator('.control');

    label = element.locator('.label');

    await page.goto(fixtureURL('components-textinput--text-input'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set the `autofocus` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input autofocus></fluent-text-input>
            `;
    });

    await expect(control).toHaveAttribute('autofocus', '');
  });

  test('should set the `disabled` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input disabled></fluent-text-input>
            `;
    });

    await expect(control).toHaveAttribute('disabled', '');
  });

  test('should set the `readonly` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input readonly></fluent-text-input>
            `;
    });

    await expect(control).toHaveAttribute('readonly', '');
  });

  test('should set the `required` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input required></fluent-text-input>
            `;
    });

    await expect(control).toHaveAttribute('required', '');
  });

  test('should set the `spellcheck` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input spellcheck></fluent-text-input>
            `;
    });

    await expect(control).toHaveAttribute('spellcheck', '');
  });

  test.describe('should set the attribute on the internal control', () => {
    const attributes = {
      maxlength: 14,
      minlength: 14,
      name: 'foo',
      placeholder: 'foo',
      size: 4,
      list: 'listId',
      ariaAtomic: 'true',
      ariaBusy: 'false',
      ariaControls: 'testId',
      ariaCurrent: 'page',
      ariaDescribedby: 'testId',
      ariaDetails: 'testId',
      ariaDisabled: 'true',
      ariaErrormessage: 'test',
      ariaFlowto: 'testId',
      ariaHaspopup: 'true',
      ariaHidden: 'true',
      ariaInvalid: 'spelling',
      ariaKeyshortcuts: 'F4',
      ariaLabel: 'Foo label',
      ariaLabelledby: 'testId',
      ariaLive: 'polite',
      ariaOwns: 'testId',
      ariaRelevant: 'removals',
      ariaRoledescription: 'search',
    };

    for (const [attribute, value] of Object.entries(attributes)) {
      const attrToken = spinalCase(attribute);

      test(`should set the \`${attrToken}\` attribute on the internal control`, async () => {
        await root.evaluate(
          (node, { attrToken, value }) => {
            node.innerHTML = /* html */ `
                            <fluent-text-input ${attrToken}="${value}"></fluent-text-input>
                        `;
          },
          { attrToken, value },
        );

        await expect(control).toHaveAttribute(attrToken, `${value}`);
      });
    }
  });
  test('should reflect control-size attribute values', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input control-size="small"></fluent-text-input>
            `;
    });

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

  test('should reflect appearance attribute values', async () => {
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

  test('should initialize to the `initialValue` property if no value property is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input></fluent-text-input>
            `;
    });

    const initialValue = await element.evaluate<string, TextInput>(node => node.initialValue);

    await expect(element).toHaveJSProperty('value', initialValue);
  });

  test('should initialize to the provided `value` attribute if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input value="foo"></fluent-text-input>
            `;
    });

    const element = page.locator('fluent-text-input');

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` property if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ ``;

      const textField = document.createElement('fluent-text-input') as TextInput;

      textField.value = 'foo';

      node.appendChild(textField);
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input></fluent-text-input>
            `;
    });

    await element.evaluate(node => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should hide the label when no default slotted content is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = '<fluent-text-input></fluent-text-input>';
    });

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should hide the label when start content is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input>
                    <div slot="start"></div>
                </fluent-text-input>
            `;
    });

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should hide the label when end content is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input>
                    <div slot="end"></div>
                </fluent-text-input>
            `;
    });

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should hide the label when start and end content are provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input>
                    <div slot="start"></div>
                    <div slot="end"></div>
                </fluent-text-input>
            `;
    });

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should hide the label when space-only text nodes are slotted', async () => {
    await root.evaluate(node => {
      node.innerHTML = `<fluent-text-input>\n \n</fluent-text-input>`;
    });

    await expect(element).toHaveText(/\n\s\n/);

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should fire a `change` event when the internal control emits a `change` event', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-text-input></fluent-text-input>
            `;
    });

    const [wasChanged] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('change', () => resolve(true));
          }),
      ),
      control.evaluate(node => {
        node.dispatchEvent(
          new Event('change', {
            key: 'a',
          } as EventInit),
        );
      }),
    ]);

    expect(wasChanged).toBeTruthy();
  });

  test.describe('with a type of `password`', () => {
    test('should report invalid validity when the `value` property is an empty string and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" required></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeTruthy();
    });

    test('should report valid validity when the `value` property is a string that is non-empty and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" required value="some-value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeFalsy();
    });

    test('should report valid validity when `value` is empty and `minlength` is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" minlength="1"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when `value` has a length less than `minlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" minlength="10" value="123456789"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when `value` is empty and `maxlength` is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" maxlength="10"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when `value` has a length which exceeds the `maxlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" maxlength="10" value="12345678901"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` is shorter than `maxlength` and the element is `required`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" maxlength="10" required value="123456789"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` property matches the `pattern` property', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" pattern="\\d+" value="123456789"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeFalsy();
    });

    test('should report invalid validity when `value` does not match `pattern`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="password" pattern="value" value="other value"></fluent-text-input>
                `;
      });

      const element = page.locator('fluent-text-input');

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeTruthy();
    });
  });

  test.describe('with a type of `tel`', () => {
    test('should report invalid validity when the `value` property is an empty string and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" required></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeTruthy();
    });

    test('should report valid validity when the `value` property is not empty and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" required value="some-value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeFalsy();
    });

    test('should report valid validity when `minlength` is set and `value` is an empty string', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" minlength="1"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when the length of `value` is less than `minlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" minlength="10" value="123456789"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when `value` is an empty string', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" maxlength="10"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when `value` has a length which exceeds `maxlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" maxlength="10" value="12345678901"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` is shorter than `maxlength` and the element is `required`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" maxlength="10" required value="123456789"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` matches `pattern`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" pattern="\\d+" value="123456789"></fluent-text-input>
                `;
      });

      const element = page.locator('fluent-text-input');

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeFalsy();
    });

    test('should report invalid validity when `value` does not match `pattern`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="tel" pattern="value" required value="555"></fluent-text-input>
                `;
      });

      const element = page.locator('fluent-text-input');

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeTruthy();
    });
  });

  test.describe('with a type of `text`', () => {
    test('should report invalid validity when the `value` property is an empty string and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" required></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeTruthy();
    });

    test('should report valid validity when the `value` property is not empty and `required` is true', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" required value="some value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.valueMissing)).toBeFalsy();
    });

    test('should report valid validity when `value` is an empty string and `minlength` is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" minlength="1"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when `value` has a length less than `minlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" minlength="6" value="value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooShort)).toBeFalsy();
    });

    test('should report valid validity when `value` is empty and `maxlength` is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" maxlength="0"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when `value` has a length which exceeds `maxlength`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" maxlength="4" value="value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` is shorter than `maxlength` and the element is `required`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" maxlength="6" required value="value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.tooLong)).toBeFalsy();
    });

    test('should report valid validity when the `value` matches `pattern`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" pattern="value" required value="value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeFalsy();
    });

    test('should report invalid validity when `value` does not match `pattern`', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="text" pattern="value" required value="other value"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.patternMismatch)).toBeTruthy();
    });
  });

  test.describe('with a type of `email`', () => {
    test('should report valid validity when `value` is an empty string', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="email"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.typeMismatch)).toBeFalsy();
    });

    test('should have invalid invalidity with a `typeMismatch` when `value` is not a valid email', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="email" value="not an email"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.typeMismatch)).toBeTruthy();
    });
  });

  test.describe('with a type of `url`', () => {
    test('should report valid validity when `value` is an empty string', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="url"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.typeMismatch)).toBeFalsy();
    });

    test('should have invalid invalidity with a `typeMismatch` when `value` is not a valid URL', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <fluent-text-input type="url" value="not a url"></fluent-text-input>
                `;
      });

      expect(await element.evaluate<boolean, TextInput>(node => node.validity.typeMismatch)).toBeTruthy();
    });
  });
});
