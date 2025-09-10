import { expect, test } from '../../test/playwright/index.js';
import type { TextInput } from '../text-input/text-input.js';
import type { Field } from './field.js';

test.describe('Field', () => {
  test.use({
    tagName: 'fluent-field',
    waitFor: ['fluent-text-input'],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-field');
    });

    expect(hasError).toBe(false);
  });

  test('should set the `disabled` state when the slotted input is disabled', async ({ fastPage }) => {
    const { element } = fastPage;
    const input = element.locator('input');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input slot="input" disabled />
      `,
    });

    await expect(element).toHaveCustomState('disabled');

    await input.evaluate(node => {
      node.removeAttribute('disabled');
    });

    await expect(element).not.toHaveCustomState('disabled');
  });

  test('should set the `required` state when the slotted input is required', async ({ fastPage }) => {
    const { element } = fastPage;
    const input = element.locator('input');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input slot="input" required />
      `,
    });

    await expect(element).toHaveCustomState('required');

    await input.evaluate((node: Field) => {
      node.removeAttribute('required');
    });

    await expect(element).not.toHaveCustomState('required');
  });

  test('should set the `readonly` state when the slotted input is read-only', async ({ fastPage }) => {
    const { element } = fastPage;
    const input = element.locator('input');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input slot="input" readonly />
      `,
    });

    await expect(element).toHaveCustomState('readonly');

    await input.evaluate((node: Field) => {
      node.removeAttribute('readonly');
    });

    await expect(element).not.toHaveCustomState('readonly');
  });

  test('should display the `valueMissing` validation message when the slotted input has the `value-missing` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" required />
        <div id="message" slot="message" flag="value-missing">This field is required.</div>
        `,
    });

    await input.fill('foo');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('value-missing');

    await expect(message).toBeHidden();

    await input.fill('');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('value-missing');

    await expect(message).toBeVisible();
  });

  test('should display the `patternMismatch` validation message when the slotted input has the `pattern-mismatch` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" pattern="[0-9]+" />
        <div id="message" slot="message" flag="pattern-mismatch">This field must contain only numbers.</div>
      `,
    });

    await input.fill('123');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('pattern-mismatch');

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('pattern-mismatch');

    await expect(message).toBeVisible();
  });

  test('should display the `tooShort` validation message when the slotted input has the `too-short` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" minlength="3" />
        <div id="message" slot="message" flag="too-short">This field must contain at least 3 characters.</div>
      `,
    });

    await input.fill('123');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('too-short');

    await expect(message).toBeHidden();

    await input.fill('12');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('too-short');

    await expect(message).toBeVisible();
  });

  test('should display the `tooLong` validation message when the slotted input has the `too-long` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" maxlength="3" />
        <div id="message" slot="message" flag="too-long">This field must contain at most 3 characters.</div>
      `,
    });

    await input.fill('123');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('too-long');

    await expect(message).toBeHidden();

    // Forces the input to have a value that is too long by changing the `maxlength` attribute
    await input.evaluate(node => {
      node.setAttribute('maxlength', '4');
    });

    await input.fill('1234');

    await input.evaluate(node => {
      node.setAttribute('maxlength', '3');
    });

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('too-long');

    await expect(message).toBeVisible();
  });

  test('should display the `rangeUnderflow` validation message when the slotted input has the `range-underflow` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" type="number" min="3" />
        <div id="message" slot="message" flag="range-underflow">This field must contain a number greater than or equal to 3.</div>
      `,
    });

    await input.fill('3');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('range-underflow');

    await expect(message).toBeHidden();

    await input.fill('2');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('range-underflow');

    await expect(message).toBeVisible();
  });

  test('should display the `rangeOverflow` validation message when the slotted input has the `range-overflow` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" type="number" max="3" />
        <div id="message" slot="message" flag="range-overflow">This field must contain a number less than or equal to 3.</div>
      `,
    });

    await input.fill('3');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('range-overflow');

    await expect(message).toBeHidden();

    await input.fill('4');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('range-overflow');

    await expect(message).toBeVisible();
  });

  test('should display the `stepMismatch` validation message when the slotted input has the `step-mismatch` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" type="number" step="2" />
        <div id="message" slot="message" flag="step-mismatch">This field must contain a number that is a multiple of 2.</div>
      `,
    });

    await input.fill('4');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('step-mismatch');

    await expect(message).toBeHidden();

    await input.fill('3');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('step-mismatch');

    await expect(message).toBeVisible();
  });

  test('should display the `typeMismatch` validation message when the slotted input has the `type-mismatch` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" type="email" />
        <div id="message" slot="message" flag="type-mismatch">This field must be a valid email address.</div>
      `,
    });

    await input.fill('a@b.c');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('type-mismatch');

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('type-mismatch');

    await expect(message).toBeVisible();
  });

  test('should display the `customError` validation message when the slotted input has the `custom-error` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" />
        <div id="message" slot="message" flag="custom-error">This field has a custom error.</div>
      `,
    });

    await input.fill('foo');

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('This field has a custom error.');
      node.reportValidity();
    });

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('custom-error');

    await expect(message).toBeVisible();

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('');
      node.reportValidity();
    });

    await input.fill('foo');

    await input.dispatchEvent('change');

    await expect(element).not.toHaveCustomState('custom-error');

    await expect(message).toBeHidden();
  });

  test('should display the `badInput` validation message when the slotted input has the `bad-input` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('#input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-text-input id="input" slot="input" type="text"></fluent-text-input>
        <div id="message" slot="message" flag="bad-input">I have no idea how you managed to do this.</div>
      `,
    });

    await expect(element).not.toHaveCustomState('bad-input');

    await expect(message).toBeHidden();

    await input.evaluate((node: TextInput) => {
      node.setValidity({ badInput: true }, 'badInput');
      node.reportValidity();
    });

    await expect(element).toHaveCustomState('bad-input');

    await expect(message).toBeVisible();
  });

  test('should display the `valid` validation message when the slotted input has the `valid` validity state', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const input = element.locator('input');
    const message = element.locator('#message');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <input id="input" slot="input" />
        <div required id="message" slot="message" flag="valid">This field is valid.</div>
      `,
    });

    await input.fill('foo');

    await input.dispatchEvent('change');

    await expect(element).toHaveCustomState('valid');

    await expect(message).toBeVisible();
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `above`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'label-position': 'above' },
      innerHTML: /* html */ `
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      `,
    });

    await expect(element.locator('input:below(label)')).toHaveCount(1);
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `before`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'label-position': 'before' },
      innerHTML: /* html */ `
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      `,
    });

    await expect(element.locator('input:right-of(label)')).toHaveCount(1);

    await element.evaluate((node: Field) => {
      node.dir = 'rtl';
    });

    await expect(element.locator('input:left-of(label)')).toHaveCount(1);
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `after`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { 'label-position': 'after' },
      innerHTML: /* html */ `
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      `,
    });

    await expect(element.locator('input:left-of(label)')).toHaveCount(1);

    await element.evaluate((node: Field) => {
      node.dir = 'rtl';
    });

    await expect(element.locator('input:right-of(label)')).toHaveCount(1);
  });
});
