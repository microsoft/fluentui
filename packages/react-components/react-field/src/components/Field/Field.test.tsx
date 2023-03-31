import * as React from 'react';

import { render } from '@testing-library/react';
import { useFieldControlProps } from '../../contexts/useFieldControlProps';
import { isConformant } from '../../testing/isConformant';
import { Field } from './index';

const TestInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => (
  <input {...useFieldControlProps(props, { supportsLabelFor: true })} />
);

const TestGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => (
  <div role="group" {...useFieldControlProps(props)} />
);

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

  it('does not set id or aria-labelledby if label.htmlFor is set', () => {
    const result = render(
      <Field label={{ children: 'Test label', htmlFor: 'test-label-for' }}>
        <TestInput />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBeFalsy();
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
    expect(label.htmlFor).toBe('test-label-for');
  });

  it('generates an id for the control and uses it as the label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestInput />
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('falls back to aria-labelledby if the control has an id that does not match the label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestInput id="test-id" /> {/* Does not match label's generated htmlFor */}
      </Field>,
    );

    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('sets aria-labelledby on a control that does not support label.htmlFor', () => {
    const result = render(
      <Field label="Test label">
        <TestGroup /> {/* Groups do not support label.htmlFor */}
      </Field>,
    );
    const group = result.getByRole('group');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(group.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('adds a required asterisk * to the label, and aria-required on the control when required is set', () => {
    const result = render(
      <Field label="Test label" required>
        <TestInput />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(result.getByText('*')).toBeTruthy();
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('sets aria-describedby to the hint', () => {
    const result = render(
      <Field hint="Test hint">
        <TestInput />
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
        <TestInput />
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
        <TestInput />
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
        <TestInput aria-describedby="test-describedby" />
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
        <TestInput />
      </Field>,
    );
    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-invalid')).toBeTruthy();
  });

  it('does not override user aria props, EXCEPT aria-describedby', () => {
    const result = render(
      <Field label="test label" validationMessage="test description" hint="test hint" required>
        <TestInput
          aria-labelledby="test-labelledby"
          aria-errormessage="test-errormessage"
          aria-invalid={false}
          aria-required={false}
        />
      </Field>,
    );

    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-labelledby')).toBe('test-labelledby');
    expect(input.getAttribute('aria-errormessage')).toBe('test-errormessage');
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(input.getAttribute('aria-required')).toBe('false');
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
        <TestInput />
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
