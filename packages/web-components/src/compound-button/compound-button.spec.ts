import { spinalCase } from '@microsoft/fast-web-utilities';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { CompoundButton } from './compound-button.js';

test.describe('Compound Button', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let control: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-compound-button--button'));
    element = page.locator('fluent-compound-button');
    root = page.locator('#root');
    control = element.locator('.control');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set the `disabled` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-compound-button disabled></fluent-compound-button>
            `;
    });

    await expect(element).toHaveJSProperty('disabled', true);
    await expect(control).toHaveJSProperty('disabled', true);

    await element.evaluate((node: CompoundButton) => {
      node.disabled = false;
    });

    await expect(element).not.toHaveJSProperty('disabled', true);
    await expect(control).not.toHaveJSProperty('disabled', true);
  });

  test('should set the `form` attribute on the internal button when `formId` is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <form id="foo">
          <fluent-compound-button></fluent-compound-button>
        </form>
            `;
    });

    await element.evaluate((node: CompoundButton) => {
      node.formId = 'foo';
    });

    await expect(control).toHaveAttribute('form', 'foo');
  });

  test('should not propagate when clicked and `disabled` is true', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-compound-button disabled>Disabled Button</fluent-compound-button>
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
    await element.evaluate((node: CompoundButton) => {
      node.appearance = 'primary';
    });

    await expect(element).toHaveJSProperty('appearance', 'primary');

    await element.evaluate((node: CompoundButton) => {
      node.appearance = 'outline';
    });

    await expect(element).toHaveJSProperty('appearance', 'outline');

    await element.evaluate((node: CompoundButton) => {
      node.appearance = 'subtle';
    });

    await expect(element).toHaveJSProperty('appearance', 'subtle');

    await element.evaluate((node: CompoundButton) => {
      node.appearance = 'secondary';
    });

    await expect(element).toHaveJSProperty('appearance', 'secondary');

    await element.evaluate((node: CompoundButton) => {
      node.appearance = 'transparent';
    });

    await expect(element).toHaveJSProperty('appearance', 'transparent');
  });

  test('should set and retrieve the `shape` property correctly', async () => {
    await element.evaluate((node: CompoundButton) => {
      node.shape = 'circular';
    });

    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: CompoundButton) => {
      node.shape = 'rounded';
    });

    await expect(element).toHaveJSProperty('shape', 'rounded');

    await element.evaluate((node: CompoundButton) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');
  });

  test('should set and retrieve the `size` property correctly', async () => {
    await element.evaluate((node: CompoundButton) => {
      node.size = 'small';
    });

    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: CompoundButton) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: CompoundButton) => {
      node.size = 'large';
    });

    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should set the `form` attribute', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <form id="formFruit">
          <fluent-compound-button form="formFruit">Button</fluent-compound-button>
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
});

test.describe('Compound Button - Isolating Flaky', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let control: Locator;
  test.describe.configure({ retries: 4 });

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-compound-button--button'));
    element = page.locator('fluent-compound-button');
    root = page.locator('#root');
    control = element.locator('.control');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should reflect the `autofocus` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-compound-button></fluent-compound-button>
      `;
    });

    const autofocusAttribute = await element.getAttribute('autofocus');
    expect(autofocusAttribute === '' || autofocusAttribute === 'autofocus').toBeFalsy();

    await element.evaluate(node => {
      node.toggleAttribute('autofocus');
    });

    const noAutofocusAttribute = await element.getAttribute('autofocus');
    expect(noAutofocusAttribute === '' || noAutofocusAttribute === 'autofocus').toBeTruthy();
  });

  test('should reflect the `formnovalidate` attribute on the internal control', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <fluent-compound-button></fluent-compound-button>
      `;
    });

    const autofocusAttribute = await element.getAttribute('formnovalidate');
    expect(autofocusAttribute === '' || autofocusAttribute === 'formnovalidate').toBeFalsy();

    await element.evaluate(node => {
      node.toggleAttribute('formnovalidate');
    });

    const noAutofocusAttribute = await element.getAttribute('formnovalidate');
    expect(noAutofocusAttribute === '' || noAutofocusAttribute === 'formnovalidate').toBeTruthy();
  });
});

test.describe('Compound Button - Slots Tests', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-compound-button--button'));
    element = page.locator('fluent-compound-button');
  });

  test.afterAll(async () => {
    await page.close();
  });
  test('should have content in the default slot', async () => {
    const defaultSlotContent = await element.evaluate(component => {
      const slot = component.shadowRoot?.querySelector('span.content slot:not([name])') as HTMLSlotElement;

      if (!slot) return false;

      const nodes = slot.assignedNodes({ flatten: true });
      return nodes.length > 0;
    });

    expect(defaultSlotContent).toBe(true);
  });

  test('should have content in the `description` slot', async () => {
    const descriptionSlotContent = await element.evaluate(component => {
      const slot = component.shadowRoot?.querySelector('span.content slot[name="description"]') as HTMLSlotElement;

      if (!slot) return false;

      const nodes = slot.assignedNodes({ flatten: true });
      return nodes.length > 0;
    });

    expect(descriptionSlotContent).toBe(true);
  });
});

test.describe('Compound Button - Regular Attributes', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-compound-button--button', attributes));
    element = page.locator('fluent-compound-button');
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

test.describe('Compound Button - Boolean Attributes', () => {
  let page: Page;
  let element: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(fixtureURL('components-button-compound-button--button', booleanAttributes));
    element = page.locator('fluent-compound-button');
  });

  test.afterAll(async () => {
    await page.close();
  });

  const booleanAttributes = {
    disabled: true,
    disabledFocusable: true,
    iconOnly: true,
    ariaBusy: false,
    ariaAtomic: true,
    ariaDisabled: true,
    ariaExpanded: true,
    ariaHaspopup: true,
    ariaHidden: true,
    ariaPressed: true,
  };

  for (const [attribute, value] of Object.entries(booleanAttributes)) {
    const attributeSpinalCase = spinalCase(attribute);

    test(`should set the boolean attribute: \`${attributeSpinalCase}\` to \`${value}\``, async () => {
      await element.evaluate(
        (node: any, { attribute, value }) => {
          node[attribute] = value;
        },
        { attribute, value },
      );

      await expect(element).toHaveJSProperty(attribute, value);
    });
  }
});
