import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Field } from './index';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test label',
            hint: 'Test hint',
            validationMessage: 'Test validation message',
            validationState: 'error',
          },
        },
      ],
    },
  });

  it("sets the label's htmlFor to the child's id if it has one", () => {
    const result = render(
      <Field label="Test label">
        <input id="test-id" />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBe('test-id');
    expect(label.htmlFor).toBe('test-id');
  });

  it('generates an id for the child if it does not have one,', () => {
    const result = render(
      <Field label="Test label">
        <input />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);
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
  });

  it('adds a required asterisk * to the label, and aria-required on the control when required is set', () => {
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
      <Field hint="Test hint" validationMessage="Test validation message">
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
      <Field hint="Test hint" validationMessage="Test validation message">
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
      <Field label="test label" validationMessage="test description" hint="test hint">
        <input aria-labelledby="test-labelledby" aria-errormessage="test-errormessage" aria-invalid={false} />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-labelledby')).toBe('test-labelledby');
    expect(input.getAttribute('aria-errormessage')).toBe('test-errormessage');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it.each([
    [undefined, 'alert'], // defaults to error
    ['error', 'alert'],
    ['warning', null],
    ['success', null],
    ['none', null],
  ] as const)('if validationState is %s, sets role to %s on the validationMessage', (validationState, role) => {
    const result = render(
      <Field validationState={validationState} validationMessage="test validation message">
        <input />
      </Field>,
    );
    const validationMessage = result.getByText('test validation message');

    expect(validationMessage.getAttribute('role')).toBe(role);
  });

  it('passes expected props to child render function', () => {
    const renderFn = jest.fn();
    const result = render(
      <Field label="Test label" hint="Test hint" validationMessage="Test validation message" required>
        {renderFn}
      </Field>,
    );

    const label = result.getByText('Test label') as HTMLLabelElement;
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(renderFn).toHaveBeenCalledWith({
      id: label.htmlFor,
      'aria-labelledby': label.id,
      'aria-describedby': validationMessage.id + ' ' + hint.id,
      'aria-invalid': true,
      'aria-required': true,
    });
  });
});
