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

  test('should display the `valueMissing` validation message when the slotted input has the `valueMissing` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" required />
        <div id="message" slot="message" flag="valueMissing">This field is required.</div>
      </fluent-field>
    `);

    await input.fill('foo');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('valueMissing'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('valueMissing'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `patternMismatch` validation message when the slotted input has the `patternMismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" pattern="[0-9]+" />
        <div id="message" slot="message" flag="patternMismatch">This field must contain only numbers.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('patternMismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('patternMismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `tooShort` validation message when the slotted input has the `tooShort` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" minlength="3" />
        <div id="message" slot="message" flag="tooShort">This field must contain at least 3 characters.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('tooShort'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('12');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('tooShort'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `tooLong` validation message when the slotted input has the `tooLong` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" maxlength="3" />
        <div id="message" slot="message" flag="tooLong">This field must contain at most 3 characters.</div>
      </fluent-field>
    `);

    await input.fill('123');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('tooLong'))).toBe(false);

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

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('tooLong'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `rangeUnderflow` validation message when the slotted input has the `rangeUnderflow` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" min="3" />
        <div id="message" slot="message" flag="rangeUnderflow">This field must contain a number greater than or equal to 3.</div>
      </fluent-field>
    `);

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('rangeUnderflow'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('2');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('rangeUnderflow'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `rangeOverflow` validation message when the slotted input has the `rangeOverflow` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" max="3" />
        <div id="message" slot="message" flag="rangeOverflow">This field must contain a number less than or equal to 3.</div>
      </fluent-field>
    `);

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('rangeOverflow'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('4');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('rangeOverflow'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `stepMismatch` validation message when the slotted input has the `stepMismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="number" step="2" />
        <div id="message" slot="message" flag="stepMismatch">This field must contain a number that is a multiple of 2.</div>
      </fluent-field>
    `);

    await input.fill('4');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('stepMismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('3');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('stepMismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `typeMismatch` validation message when the slotted input has the `typeMismatch` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" type="email" />
        <div id="message" slot="message" flag="typeMismatch">This field must be a valid email address.</div>
      </fluent-field>
    `);

    await input.fill('a@b.c');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('typeMismatch'))).toBe(false);

    await expect(message).toBeHidden();

    await input.fill('abc');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('typeMismatch'))).toBe(true);

    await expect(message).toBeVisible();
  });

  test('should display the `customError` validation message when the slotted input has the `customError` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <input id="input" slot="input" />
        <div id="message" slot="message" flag="customError">This field has a custom error.</div>
      </fluent-field>
    `);

    await input.fill('foo');

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('This field has a custom error.');
      node.reportValidity();
    });

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('customError'))).toBe(true);

    await expect(message).toBeVisible();

    await input.evaluate((node: HTMLInputElement) => {
      node.setCustomValidity('');
      node.reportValidity();
    });

    await input.fill('foo');

    await input.dispatchEvent('change');

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('customError'))).toBe(false);

    await expect(message).toBeHidden();
  });

  test('should display the `badInput` validation message when the slotted input has the `badInput` validity state', async ({
    page,
  }) => {
    const element = page.locator('fluent-field');
    const input = page.locator('#input');
    const message = page.locator('#message');

    await page.setContent(/* html */ `
      <fluent-field>
        <fluent-text-input id="input" slot="input" type="text"></fluent-text-input>
        <div id="message" slot="message" flag="badInput">I have no idea how you managed to do this.</div>
      </fluent-field>
    `);

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('badInput'))).toBe(false);

    await expect(message).toBeHidden();

    await input.evaluate((node: TextInput) => {
      node.setValidity({ badInput: true }, 'badInput');
      node.reportValidity();
    });

    expect(await element.evaluate((node: Field) => node.elementInternals.states.has('badInput'))).toBe(true);

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
