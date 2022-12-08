import * as React from 'react';
import { render } from '@testing-library/react';
import { Field } from './index';

describe('Field', () => {
  it("sets the label's htmlFor to the supplied id, and does not set aria-labelledby", () => {
    const result = render(
      <Field label="Test label" htmlFor="test-id">
        <input id="htmlFor" />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.htmlFor).toBe('test-id');
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('sets aria-labelledby on the control', () => {
    const result = render(
      <Field label="Test label">
        <input />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.htmlFor).toBeFalsy();
  });

  it('adds a required asterisk * to the label when requried is set', () => {
    const result = render(
      <Field label="Test label" required>
        <input />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(result.getByText('*')).toBeTruthy();
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('sets aria-describedby to the hint', () => {
    const result = render(
      <Field hint="Test hint">
        <input />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');

    expect(hint.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('sets aria-describedby to the validationMessage', () => {
    const result = render(
      <Field validationMessage="Test validation message" validationState="warning">
        <input />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const validationMessage = result.getByText('Test validation message');

    expect(validationMessage.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id);
  });

  it('sets aria-describedby to the validationMessage + hint', () => {
    const result = render(
      <Field hint="Test hint" validationMessage="Test validation message" validationState="error">
        <input />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id + ' ' + hint.id);
  });

  it('sets aria-describedby to the validationMessage + hint + user aria-describedby', () => {
    const result = render(
      <Field hint="Test hint" validationMessage="Test validation message" validationState="error">
        <input aria-describedby="test-describedby" />
      </Field>,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id + ' ' + hint.id + ' test-describedby');
  });

  it('sets aria-invalid if an error', () => {
    const result = render(
      <Field validationState="error">
        <input />
      </Field>,
    );
    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-invalid')).toBeTruthy();
  });

  it('does not override user aria props, EXCEPT aria-describedby', () => {
    const result = render(
      <Field label="test label" validationState="error" validationMessage="test description" hint="test hint">
        <input aria-labelledby="test-labelledby" aria-errormessage="test-errormessage" aria-invalid={false} />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-labelledby')).toBe('test-labelledby');
    expect(input.getAttribute('aria-errormessage')).toBe('test-errormessage');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it('does not override user aria-describedby on the control slot', () => {
    const result = render(
      <Field label="test label" validationState="error" validationMessage="test description" hint="test hint">
        {ariaProps => <input {...ariaProps} aria-describedby="test-describedby" />}
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-describedby')).toBe('test-describedby');
  });
});
