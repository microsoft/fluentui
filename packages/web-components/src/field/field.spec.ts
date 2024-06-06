import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { TextInput } from '../index.js';
import type { Field } from './field.js';

test.describe('Field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-field--field'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-field'));
  });

  test('should set the `disabled` state when the slotted input is disabled', async ({ page }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field>
        <input slot="input" disabled />
      </fluent-field>
    `);

    await test.step('should set the `disabled` state when the input is disabled', async () => {
      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('disabled'))).toBe(true);
    });

    await test.step('should remove the `disabled` state when the input is enabled', async () => {
      await element.evaluate((node: Field) => {
        node.querySelector('input')?.removeAttribute('disabled');
      });

      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('disabled'))).toBe(false);
    });
  });

  test('should set the `required` state when the slotted input is required', async ({ page }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field>
        <input slot="input" required />
      </fluent-field>
    `);

    await test.step('should set the `required` state when the input is required', async () => {
      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('required'))).toBe(true);
    });

    await test.step('should remove the `required` state when the input is not required', async () => {
      await element.evaluate((node: Field) => {
        node.querySelector('input')?.removeAttribute('required');
      });

      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('required'))).toBe(false);
    });
  });

  test('should set the `readonly` state when the slotted input is read-only', async ({ page }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field>
        <input slot="input" readonly />
      </fluent-field>
    `);

    await test.step('should set the `readonly` state when the input is readonly', async () => {
      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('readonly'))).toBe(true);
    });

    await test.step('should remove the `readonly` state when the input is not readonly', async () => {
      await element.evaluate((node: Field) => {
        node.querySelector('input')?.removeAttribute('readonly');
      });

      expect(await element.evaluate((node: Field) => node.elementInternals.states.has('readonly'))).toBe(false);
    });
  });

  test('should display the `valueMissing` validation message when the slotted input has the `value-missing` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" required />
        <div id="message" slot="message" flag="value-missing">This field is required.</div>
      </fluent-field>
    `);

    await input.fill('foo');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('value-missing'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('value-missing'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `patternMismatch` validation message when the slotted input has the `pattern-mismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" pattern="[0-9]+" />
        <div id="message" slot="message" flag="pattern-mismatch">This field must contain only numbers.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('pattern-mismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('pattern-mismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `tooShort` validation message when the slotted input has the `too-short` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" minlength="3" />
        <div id="message" slot="message" flag="too-short">This field must contain at least 3 characters.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('too-short'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('12');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('too-short'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `tooLong` validation message when the slotted input has the `too-long` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" maxlength="3" />
        <div id="message" slot="message" flag="too-long">This field must contain at most 3 characters.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('too-long'))).toBe(false);

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

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('too-long'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `rangeUnderflow` validation message when the slotted input has the `range-underflow` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" min="3" />
        <div id="message" slot="message" flag="range-underflow">This field must contain a number greater than or equal to 3.</div>
      </fluent-field>
    `);

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('range-underflow'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('2');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('range-underflow'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `rangeOverflow` validation message when the slotted input has the `range-overflow` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" max="3" />
        <div id="message" slot="message" flag="range-overflow">This field must contain a number less than or equal to 3.</div>
      </fluent-field>
    `);

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('range-overflow'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('4');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('range-overflow'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `stepMismatch` validation message when the slotted input has the `step-mismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" step="2" />
        <div id="message" slot="message" flag="step-mismatch">This field must contain a number that is a multiple of 2.</div>
      </fluent-field>
    `);

    await input.fill('4');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('step-mismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('step-mismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `typeMismatch` validation message when the slotted input has the `type-mismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="email" />
        <div id="message" slot="message" flag="type-mismatch">This field must be a valid email address.</div>
      </fluent-field>
    `);

    await input.fill('a@b.c');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('type-mismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('type-mismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `customError` validation message when the slotted input has the `custom-error` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" />
        <div id="message" slot="message" flag="custom-error">This field has a custom error.</div>
      </fluent-field>
    `);

    await input.fill('foo');

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('This field has a custom error.');
      node.reportValidity();
    });

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('custom-error'))).toBe(true);

    await expect(message).toBeVisible();

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('');
      node.reportValidity();
    });

    await input.fill('foo');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('custom-error'))).toBe(false);

    await expect(message).toBeHidden();
  });

  test('should display the `badInput` validation message when the slotted input has the `bad-input` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <fluent-text-input id="input" slot="input" type="text"></fluent-text-input>
        <div id="message" slot="message" flag="bad-input">I have no idea how you managed to do this.</div>
      </fluent-field>
    `);

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('bad-input'))).toBe(false);

    await expect(message).toBeHidden();

    await input.evaluate((node: TextInput) => {
      node.setValidity({ badInput: true }, 'badInput');
      node.reportValidity();
    });

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('bad-input'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `valid` validation message when the slotted input has the `valid` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" />
        <div required id="message" slot="message" flag="valid">This field is valid.</div>
      </fluent-field>
    `);

    await input.fill('foo');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('valid'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `above`', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field label-position="above">
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      </fluent-field>
    `);

    await expect(element.locator('input:below(label)')).toHaveCount(1);
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `before`', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field label-position="before">
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      </fluent-field>
    `);

    await expect(element.locator('input:right-of(label)')).toHaveCount(1);

    await element.evaluate((node: Field) => {
      node.dir = 'rtl';
    });

    await expect(element.locator('input:left-of(label)')).toHaveCount(1);
  });

  test('should arrange the label and input in the correct order when the `labelPosition` property is set to `after`', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');

    await page.setContent(/* html */ `
      <fluent-field label-position="after">
        <label slot="label">Label</label>
        <input slot="input" id="input" />
      </fluent-field>
    `);

    await expect(element.locator('input:left-of(label)')).toHaveCount(1);

    await element.evaluate((node: Field) => {
      node.dir = 'rtl';
    });

    await expect(element.locator('input:right-of(label)')).toHaveCount(1);
  });
});
