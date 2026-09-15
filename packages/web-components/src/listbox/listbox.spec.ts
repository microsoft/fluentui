import { expect, test } from '../../test/playwright/index.js';
import { tagName as OptionTagName } from '../option/option.options.js';
import type { Listbox } from './listbox.js';
import { tagName } from './listbox.options.js';

test.describe('Listbox', () => {
  test.use({
    tagName,
    innerHTML: /* html */ `
      <${OptionTagName} value="apple">Apple</${OptionTagName}>
      <${OptionTagName} value="banana">Banana</${OptionTagName}>
      <${OptionTagName} value="orange">Orange</${OptionTagName}>
      <${OptionTagName} value="mango">Mango</${OptionTagName}>
      <${OptionTagName} value="kiwi">Kiwi</${OptionTagName}>
      <${OptionTagName} value="cherry">Cherry</${OptionTagName}>
      <${OptionTagName} value="grapefruit">Grapefruit</${OptionTagName}>
      <${OptionTagName} value="papaya">Papaya</${OptionTagName}>
    `,
    waitFor: [OptionTagName],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should render a listbox', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveCount(1);
  });

  test('should set a unique id on the listbox when one is not provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveAttribute('id', /^listbox-\d+$/);
  });

  test('should NOT set a unique id on the listbox when one is provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { id: 'custom-id' } });

    await expect(element).toHaveAttribute('id', 'custom-id');
  });

  test('should set multiselect values when the `multiple` property is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await element.evaluate((node: Listbox) => {
      node.multiple = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaMultiSelectable', 'true');

    await expect(element).toHaveCustomState('multiple');
  });

  test('should set the `multiple` property on the options when the `multiple` property is true', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const options = element.locator(OptionTagName);

    await fastPage.setTemplate();

    await element.evaluate((node: Listbox) => {
      node.multiple = true;
    });

    for (const option of await options.all()) {
      await expect(option).toHaveJSProperty('multiple', true);
    }
  });

  test('should have a collection of options on the `options` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('options.length', 8);
  });

  test('should set the `ariaPosInSet` and `ariaSetSize` properties on the options', async ({ fastPage }) => {
    const { element } = fastPage;
    const options = element.locator(OptionTagName);

    await fastPage.setTemplate();

    const optionsCount = await options.count();

    for (let i = 0; i < optionsCount; i++) {
      const option = options.nth(i);

      await expect(option).toHaveJSProperty('elementInternals.ariaPosInSet', `${i + 1}`);

      await expect(option).toHaveJSProperty('elementInternals.ariaSetSize', `${optionsCount}`);
    }

    await test.step('should update the `ariaPosInSet` and `ariaSetSize` properties when the options change', async () => {
      await element.evaluate((node: Listbox, OptionTagName) => {
        const newOption = document.createElement(OptionTagName);
        newOption.textContent = 'New Option';
        node.appendChild(newOption);

        // shuffle the option elements
        for (let i = node.children.length; i >= 0; i--) {
          node.appendChild(node.children[(Math.random() * i) | 0]);
        }
      }, OptionTagName);

      const newOptionsCount = await options.count();

      expect(newOptionsCount).toBe(optionsCount + 1);

      for (let i = 0; i < newOptionsCount; i++) {
        const option = options.nth(i);

        await expect(option).toHaveJSProperty('elementInternals.ariaPosInSet', `${i + 1}`);

        await expect(option).toHaveJSProperty('elementInternals.ariaSetSize', `${newOptionsCount}`);
      }
    });
  });

  test('should NOT have a reference to the parent dropdown element when one is not provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('dropdown', undefined);
  });
});

test.describe('Listbox upgrade order', () => {
  test('should apply multiple state when options upgrade after the listbox', async ({ fastPage }) => {
    await fastPage.page.goto('/test/parent-child-upgrade-order.html');

    const result = await fastPage.page.evaluate(async () => {
      return (
        window as unknown as {
          runListboxUpgradeOrderTest(): Promise<{
            firstOptionMultiple: boolean;
            hasOwnMultiple: boolean;
            optionsLength: number;
          }>;
        }
      ).runListboxUpgradeOrderTest();
    });

    expect(result.optionsLength).toBe(3);
    expect(result.firstOptionMultiple).toBe(true);
    expect(result.hasOwnMultiple).toBe(false);
  });
});
