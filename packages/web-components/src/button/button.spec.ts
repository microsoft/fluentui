import { spinalCase } from '@microsoft/fast-web-utilities';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Button } from './button.js';

test.describe('Button', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let control: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-button--button'));
    element = page.locator('fluent-button');
    root = page.locator('#root');
    control = element.locator('.control');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set the `disabled` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-button disabled></fluent-button>
            `;
    });

    await expect(element).toHaveJSProperty('disabled', true);
    await expect(control).toHaveJSProperty('disabled', true);

    await element.evaluate((node: Button) => {
      node.disabled = false;
    });

    await expect(element).not.toHaveJSProperty('disabled', true);
    await expect(control).not.toHaveJSProperty('disabled', true);
  });

  test('should set the `formnovalidate` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-button formnovalidate></fluent-button>
            `;
    });

    await expect(element).toHaveJSProperty('formnovalidate', true);
    await expect(element).toHaveAttribute('formnovalidate', '');
    await expect(control).toHaveAttribute('formnovalidate', '');

    await element.evaluate((node: Button) => {
      node.formnovalidate = false;
    });

    await expect(element).not.toHaveJSProperty('formnovalidate', true);
    await expect(element).not.toHaveAttribute('formnovalidate', '');
    await expect(control).not.toHaveAttribute('formnovalidate', '');
  });

  test('should set the `form` attribute on the internal button when `formId` is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <form id="foo">
          <fluent-button></fluent-button>
        </form>
            `;
    });

    await element.evaluate((node: Button) => {
      node.formId = 'foo';
    });

    await expect(control).toHaveAttribute('form', 'foo');
  });

  test('of type `submit` should submit the parent form when clicked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <form>
                    <fluent-button type="submit">Submit Button</fluent-button>
                </form>
            `;
    });

    const form = page.locator('form');

    const [wasSubmitted] = await Promise.all([
      form.evaluate(node => {
        return new Promise(resolve => {
          node.addEventListener('submit', e => {
            e.preventDefault();
            resolve(true);
            return false;
          });
        });
      }),

      element.click(),
    ]);

    expect(wasSubmitted).toBeTruthy();
  });

  test('of type `reset` should reset the parent form when clicked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <form>
                    <input type="text" value="foo" />
                    <fluent-button type="reset">Reset Button</fluent-button>
                </form>
            `;
    });

    const form = page.locator('form');

    const [wasReset] = await Promise.all([
      form.evaluate(node => {
        return new Promise(resolve => {
          node.addEventListener('reset', () => resolve(true));
        });
      }),

      element.evaluate((node: Button) => {
        node.click();
      }),
    ]);

    expect(wasReset).toBeTruthy();
  });

  test('should not propagate when clicked and `disabled` is true', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-button disabled>Disabled Button</fluent-button>
            `;
    });

    const content = element.locator('.content');

    const [wasNotClicked] = await Promise.all([
      element.evaluate(node =>
        Promise.race([
          new Promise(resolve => {
            node.addEventListener('click', () => resolve(false));
          }),
          new Promise(resolve => requestAnimationFrame(() => setTimeout(() => resolve(true)))),
        ]),
      ),

      content.evaluate(node =>
        Promise.race([
          new Promise(resolve => {
            node.addEventListener('click', () => resolve(false));
          }),
          new Promise(resolve => requestAnimationFrame(() => setTimeout(() => resolve(true)))),
        ]),
      ),

      element.click(),
    ]);

    expect(wasNotClicked).toBeTruthy();
  });

  test('should set and retrieve the `appearance` property correctly', async () => {
    await element.evaluate((node: Button) => {
      node.appearance = 'primary';
    });

    await expect(element).toHaveJSProperty('appearance', 'primary');

    await element.evaluate((node: Button) => {
      node.appearance = 'outline';
    });

    await expect(element).toHaveJSProperty('appearance', 'outline');

    await element.evaluate((node: Button) => {
      node.appearance = 'subtle';
    });

    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: Button) => {
      node.appearance = 'secondary';
    });

    await expect(element).toHaveJSProperty('appearance', 'secondary');

    await element.evaluate((node: Button) => {
      node.appearance = 'transparent';
    });

    await expect(element).toHaveJSProperty('appearance', 'transparent');
  });

  test('should set and retrieve the `shape` property correctly', async () => {
    await element.evaluate((node: Button) => {
      node.shape = 'circular';
    });

    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: Button) => {
      node.shape = 'rounded';
    });

    await expect(element).toHaveJSProperty('shape', 'rounded');

    await element.evaluate((node: Button) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');
  });

  test('should set and retrieve the `size` property correctly', async () => {
    await element.evaluate((node: Button) => {
      node.size = 'small';
    });

    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Button) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Button) => {
      node.size = 'large';
    });

    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should set the `form` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <form id="formFruit">
          <fluent-button form="formFruit">Button</fluent-button>
        </form>
            `;
    });

    const buttonFormProperty = await element.evaluate(node => {
      if (node instanceof HTMLButtonElement) {
        return node.form;
      }
      return null;
    });
    expect(buttonFormProperty).toBeDefined();
  });

  test.describe('Button - Regular Attributes', () => {
    let page: Page;
    let element: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(fixtureURL('components-button-button--button', attributes));
      element = page.locator('fluent-button');
    });

    test.afterAll(async () => {
      await page.close();
    });

    const attributes = {
      formaction: 'submit',
      formenctype: 'UTF-8',
      formmethod: 'post',
      formtarget: '_blank',
      name: 'fruit',
      type: 'submit',
      value: 'reset',
      ariaBusy: 'false',
      ariaControls: 'testId',
      ariaCurrent: 'page',
      ariaDescribedby: 'testId',
      ariaDetails: 'testId',
      ariaErrormessage: 'test',
      ariaFlowto: 'testId',
      ariaInvalid: 'spelling',
      ariaKeyshortcuts: 'F4',
      ariaLabel: 'Foo label',
      ariaLabelledby: 'testId',
      ariaLive: 'polite',
      ariaOwns: 'testId',
      ariaRelevant: 'removals',
      ariaRoledescription: 'slide',
    };

    for (const [attribute, value] of Object.entries(attributes)) {
      const attributeSpinalCase = spinalCase(attribute);

      test(`should set the attribute: \`${attributeSpinalCase}\` to \`${value}\``, async () => {
        await element.evaluate(
          (node: any, { attribute, value }) => {
            node.setAttribute(attribute, value);
          },
          { attribute: attributeSpinalCase, value },
        );

        await expect(element).toHaveJSProperty(`${attribute}`, `${value}`);
      });
    }
  });

  test.describe('Button - Boolean Attributes', () => {
    let page: Page;
    let element: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(fixtureURL('components-button-button--button', booleanAttributes));
      element = page.locator('fluent-button');
    });

    test.afterAll(async () => {
      await page.close();
    });

    const booleanAttributes = {
      autofocus: 'true',
      disabled: 'true',
      disabledFocusable: 'true',
      iconOnly: 'true',
      ariaBusy: 'false',
      ariaAtomic: 'true',
      ariaDisabled: 'true',
      ariaExpanded: 'true',
      ariaHaspopup: 'true',
      ariaHidden: 'true',
      ariaPressed: 'true',
    };

    for (const [attribute, value] of Object.entries(booleanAttributes)) {
      const attributeSpinalCase = spinalCase(attribute);

      test(`should set the boolean attribute: \`${attributeSpinalCase}\` to \`${value}\``, async () => {
        await element.evaluate(
          (node: any, { attribute, value }) => {
            if (value === 'true') {
              node[attribute] = true;
            } else if (value === 'false') {
              node[attribute] = false;
            }
          },
          { attribute, value },
        );

        // If value is "true" or "false", convert it to a boolean for comparison
        const expectedValue = value === 'true' || value === 'false' ? value === 'true' : value;

        await expect(element).toHaveJSProperty(`${attribute}`, expectedValue);
      });
    }
  });
});
