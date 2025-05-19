import { expect, test } from '../../test/playwright/index.js';
import type { Label } from './label.js';
import { LabelSize, LabelWeight } from './label.options.js';

test.describe('Label', () => {
  test.use({ tagName: 'fluent-label' });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(LabelSize)) {
      await test.step(`should set the \`size\` property to "${size}"`, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `weight` property to match the `weight` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const weight of Object.values(LabelWeight)) {
      await test.step(`should set the \`weight\` property to "${weight}"`, async () => {
        await fastPage.setTemplate({ attributes: { weight } });

        await expect(element).toHaveAttribute('weight', weight);

        await expect(element).toHaveJSProperty('weight', weight);
      });
    }
  });

  test('should set the `disabled` property to match the `disabled` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', true);

    await element.evaluate((node: Label) => {
      node.disabled = false;
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', false);
  });

  test('should set the `required` property to match the `required` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { required: true } });

    await expect(element).toHaveAttribute('required');

    await expect(element).toHaveJSProperty('required', true);

    await test.step('should display an asterisk when the `required` attribute is set', async () => {
      const asterisk = element.locator('span.asterisk');

      await expect(asterisk).toBeVisible();
    });

    await element.evaluate((node: Label) => {
      node.required = false;
    });

    await expect(element).not.toHaveAttribute('required');

    await expect(element).toHaveJSProperty('required', false);

    await test.step('should NOT display an asterisk when the `required` attribute is NOT set', async () => {
      const asterisk = element.locator('span.asterisk');

      await expect(asterisk).toBeHidden();
    });
  });

  test('should insert all slotted content into a generated label element when no slotted label is provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `Hello <span>World</span><span>!</span>`,
    });

    const labelElement = element.locator('label');

    await expect(labelElement).toHaveCount(1);

    await expect(labelElement).toBeVisible();

    await expect(labelElement).toHaveText('Hello World!');
  });

  test('should NOT insert slotted content into a generated label element when a slotted label is provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `<label>Hello</label> <span>World</span><span>!</span>`,
    });

    const label = element.locator('label');

    await expect(label).toHaveCount(1);

    await expect(label).toBeVisible();

    await expect(label).toHaveText('Hello');

    await expect(element).toContainText('Hello World!');
  });

  test('should NOT create a label element when the element is the child of a label element', async ({
    fastPage,
    page,
  }) => {
    await fastPage.setTemplate(/* html */ `<label><fluent-label>Hello</fluent-label></label>`);

    const label = page.locator('label');

    await expect(label).toHaveCount(1);

    await expect(label).toContainText('Hello');
  });

  test('should NOT move slotted content that has been added to the element when a slotted label is provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `<label>Hello</label> <span>World</span><span>!</span>`,
    });

    const label = page.locator('label');

    await expect(label).toHaveCount(1);

    await expect(label).toBeVisible();

    await expect(label).toHaveText('Hello');

    await expect(element).toContainText('Hello World!');

    await element.evaluate(node => {
      node.appendChild(document.createTextNode('!'));
    });

    await expect(label).toHaveText('Hello');

    await expect(element).toContainText('Hello World!!');
  });

  test('should NOT move slotted content that has been added to the element after connection when no slotted label is provided', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `Hello <span>World</span><span>!</span>`,
    });

    const label = page.locator('label');

    await expect(label).toHaveCount(1);

    await expect(label).toBeVisible();

    await expect(label).toHaveText('Hello World!');

    await element.evaluate(node => {
      node.appendChild(document.createTextNode('!'));
    });

    await expect(label).toHaveText('Hello World!');

    await expect(element).toContainText('Hello World!!');
  });
});
