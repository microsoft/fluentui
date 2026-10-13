import * as React from 'react';
import { render } from '@testing-library/react';
import { Field as V9Field } from '@fluentui/react-field';
import { Checkbox as V9Checkbox } from '@fluentui/react-checkbox';
import { Field } from './Field';
import { Checkbox } from '../Checkbox/Checkbox';

// Headless-first option B PoC: the Field context lives in @fluentui/react-core-preview, so a v9 Field and a
// headless control (and the other way round) share one context instance. If they did not, the control would
// read `undefined` and silently lose its id, aria-describedby, aria-invalid and required.
describe('Field context shared between v9 and headless through core', () => {
  const expectWiredToField = (container: HTMLElement) => {
    const label = container.querySelector('label')!;
    const input = container.querySelector('input')!;
    const message = container.querySelector('[role="alert"]')!;

    expect(input.id).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toBe(message.id);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
  };

  it('v9 Field wires a headless Checkbox', () => {
    const { container } = render(
      <V9Field label="Terms" required validationMessage="Accept the terms">
        <Checkbox />
      </V9Field>,
    );

    expectWiredToField(container);
  });

  it('headless Field wires a v9 Checkbox', () => {
    const { container } = render(
      <Field label="Terms" required validationMessage="Accept the terms">
        <V9Checkbox />
      </Field>,
    );

    expectWiredToField(container);
  });
});
