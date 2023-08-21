import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Switch } from './switch.js';

test.describe('Switch', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-switch');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-switch--switch'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have a role of `switch`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('role', 'switch');
  });

  test('should set the label value when passed a value attribute', async () => {
    const testValue = 'My Test Value';

    await root.evaluate((node, testValue) => {
      node.innerHTML = /* html */ `
        <fluent-switch value="${testValue}">
          ${testValue}
        </fluent-switch>
      `;
    }, testValue);

    const switchElement = page.locator('fluent-switch');

    expect(await switchElement.textContent()).toContain(testValue);
    await expect(switchElement).toHaveAttribute('current-value', testValue);
  });

  test('should set and retrieve the `label-position` property correctly', async () => {
    await element.evaluate((node: Switch) => {
      node.labelPosition = 'before';
    });

    await expect(element).toHaveJSProperty('labelPosition', 'before');

    await element.evaluate((node: Switch) => {
      node.labelPosition = 'after';
    });

    await expect(element).toHaveJSProperty('labelPosition', 'after');

    await element.evaluate((node: Switch) => {
      node.labelPosition = 'above';
    });

    await expect(element).toHaveJSProperty('labelPosition', 'above');
  });

  test('should reflect the correct value when supplied the labelPosition', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a tabindex of 0 on the element', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a default `aria-checked` value when `checked` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('aria-checked', 'false');
  });

  test('should set a default `aria-disabled` value when `disabled` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should NOT set a default `aria-readonly` value when `readonly` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    const hasAriaReadonlyAttribute = await element.evaluate((node: Element) => node.hasAttribute('aria-readonly'));
    expect(hasAriaReadonlyAttribute).toBe(false);
  });

  test('should set the `aria-checked` attribute equal to the `checked` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await element.evaluate((node: Switch) => {
      node.checked = true;
    });

    await expect(element).toHaveAttribute('aria-checked', 'true');

    await element.evaluate((node: Switch) => {
      node.checked = false;
    });

    await expect(element).toHaveAttribute('aria-checked', 'false');
  });

  test('should set the `aria-readonly` attribute equal to the `readonly` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await element.evaluate((node: Switch) => {
      node.readOnly = true;
    });

    await expect(element).toHaveAttribute('aria-readonly', 'true');

    await element.evaluate((node: Switch) => {
      node.readOnly = false;
    });

    await expect(element).toHaveAttribute('aria-readonly', 'false');
  });

  test('should initialize to the initial value if no value property is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    const initialValue = await element.evaluate<string, Switch>(node => node.initialValue);

    await expect(element).toHaveJSProperty('value', initialValue);
  });

  test('should add a class of `label` to the internal label when default slotted content exists', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });
    const label = element.locator('.label');

    await element.evaluate(node => {
      node.innerHTML = 'Label';
    });

    await expect(label).toHaveClass(/label/);

    await expect(label).not.toHaveClass(/label__hidden/);
  });

  test('should add classes of `label` and `label__hidden` to the internal label when default slotted content exists', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch>Switch</fluent-switch>
        `;
    });

    const label = element.locator('.label');

    await element.evaluate(node => {
      node.innerHTML = '';
    });

    await expect(label).toHaveClass(/label/);

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should set the `aria-disabled` attribute equal to the `disabled` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');

    await element.evaluate((node: Switch) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate((node: Switch) => {
      node.disabled = false;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should NOT set a tabindex when disabled is `true`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch disabled></fluent-switch>
        `;
    });

    await expect(element).not.toHaveAttribute('tabindex', '');

    await element.evaluate((node: Switch) => {
      node.disabled = false;
    });

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should initialize to the provided value attribute if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch value="foo"></fluent-switch>
        `;
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    await element.evaluate((node: Switch) => {
      node.setAttribute('value', 'foo');
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value property if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = '';

      const switchElement = document.createElement('fluent-switch') as Switch;
      switchElement.value = 'foobar';
      node.appendChild(switchElement);
    });

    await expect(element).toHaveJSProperty('value', 'foobar');
  });

  test('should emit an event when clicked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    const [wasClicked] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('click', () => resolve(true));
          }),
      ),
      element.evaluate(node => {
        node.dispatchEvent(new MouseEvent('click'));
      }),
    ]);

    expect(wasClicked).toBe(true);
  });

  test('should fire an event when spacebar is invoked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    const [wasEmitted] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('keydown', () => resolve(true));
          }),
      ),
      element.evaluate(node => {
        node.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      }),
    ]);

    expect(wasEmitted).toBe(true);
  });

  test('should fire an event when enter is invoked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-switch></fluent-switch>
        `;
    });

    const [wasEmitted] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('keydown', () => resolve(true));
          }),
      ),
      element.evaluate(node => {
        node.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }),
    ]);

    expect(wasEmitted).toBe(true);
  });

  test('should be invalid when required and unchecked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-switch required></fluent-switch>
            </form>
        `;
    });

    expect(await element.evaluate<boolean, Switch>(node => node.validity.valueMissing)).toBe(true);
  });

  test('should be valid when required and checked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-switch required checked></fluent-switch>
            </form>
        `;
    });

    expect(await element.evaluate<boolean, Switch>(node => node.validity.valueMissing)).toBe(false);
  });

  test.describe("who's parent form has it's reset() method invoked", () => {
    test('should set its checked property to false if the checked attribute is unset', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-switch></fluent-switch>
                </form>
            `;
      });

      const form = page.locator('form');

      const hasCheckedAttributeInitially = await element.evaluate((node: Element) => node.hasAttribute('checked'));
      expect(hasCheckedAttributeInitially).toBe(false); // Direct evaluation

      await element.evaluate((node: Switch) => {
        node.checked = true;
      });

      await expect(element).toHaveJSProperty('checked', true);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('checked', false);
    });

    test('should set its checked property to true if the checked attribute is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-switch checked></fluent-switch>
                </form>
            `;
      });

      const form = page.locator('form');

      const hasCheckedAttributeInitially = await element.evaluate((node: Element) => node.hasAttribute('checked'));
      expect(hasCheckedAttributeInitially).toBe(true);

      await element.evaluate((node: Switch) => {
        node.checked = false;
      });

      await expect(element).toHaveJSProperty('checked', false);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('checked', true);
    });

    test('should put the control into a clean state, where `checked` attribute modifications update the `checked` property prior to user or programmatic interaction', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-switch></fluent-switch>
                </form>
            `;
      });

      const form = page.locator('form');

      await element.evaluate((node: Switch) => {
        node.checked = true;
        node.removeAttribute('checked');
      });

      await expect(element).toHaveJSProperty('checked', true);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('checked', false);

      await element.evaluate((node: Switch) => {
        node.setAttribute('checked', '');
      });

      await expect(element).toHaveJSProperty('checked', true);
    });
  });
});
