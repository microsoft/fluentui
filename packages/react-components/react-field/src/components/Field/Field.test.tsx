import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import type { FieldProps } from './index';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from './index';

const MockComponent: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => <input {...props} />;

type MockFieldProps = FieldProps<typeof MockComponent>;
const mockFieldClassNames = getFieldClassNames('MockField');
const MockField: ForwardRefComponent<MockFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: MockComponent, classNames: mockFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

describe('Field', () => {
  it("sets the label's htmlFor to the supplied id", () => {
    const result = render(<MockField label="Test label" id="test-id" />);
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.htmlFor).toBe('test-id');
  });

  it("sets the label's htmlFor to a generated id, and does not set aria-labelledby", () => {
    const result = render(<MockField label="Test label" />);
    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(input.id).toBeTruthy();
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('sets aria-labelledby instead of htmlFor if configured to do so', () => {
    const MockFieldLabelledBy: ForwardRefComponent<MockFieldProps> = React.forwardRef((props, ref) => {
      const state = useField_unstable(props, ref, {
        component: MockComponent,
        classNames: mockFieldClassNames,
        labelConnection: 'aria-labelledby',
      });
      useFieldStyles_unstable(state);
      return renderField_unstable(state);
    });

    const result = render(<MockFieldLabelledBy label="Test label" />);
    const input = result.getByRole('textbox');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.htmlFor).toBeFalsy();
  });

  it('adds a required asterisk * to the label when requried is set', () => {
    const result = render(<MockField label="Test label" required />);

    expect(result.getByText('*')).toBeTruthy();
  });

  it('sets aria-describedby to the hint', () => {
    const result = render(<MockField hint="Test hint" />);
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');

    expect(hint.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('sets aria-describedby to the validationMessage if not an error', () => {
    const result = render(<MockField validationMessage="Test validation message" validationState="warning" />);
    const input = result.getByRole('textbox');
    const validationMessage = result.getByText('Test validation message');

    expect(validationMessage.id).toBeTruthy();
    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id);
  });

  it('sets aria-describedby to the hint + validationMessage if not an error', () => {
    const result = render(
      <MockField hint="Test hint" validationMessage="Test validation message" validationState="success" />,
    );
    const input = result.getByRole('textbox');
    const hint = result.getByText('Test hint');
    const validationMessage = result.getByText('Test validation message');

    expect(input.getAttribute('aria-describedby')).toBe(validationMessage.id + ' ' + hint.id);
  });

  it('sets aria-errormessage to the validationMessage if an error', () => {
    const result = render(<MockField validationMessage="Test validation message" validationState="error" />);
    const input = result.getByRole('textbox');
    const validationMessage = result.getByText('Test validation message');

    expect(validationMessage.id).toBeTruthy();
    expect(input.getAttribute('aria-errormessage')).toBe(validationMessage.id);
  });

  it('sets aria-invalid if an error', () => {
    const result = render(<MockField validationState="error" />);
    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-invalid')).toBeTruthy();
  });

  it('does not override user aria props', () => {
    const result = render(
      <MockField
        label="test label"
        validationState="error"
        validationMessage="test description"
        hint="test hint"
        aria-labelledby="test-labelledby"
        aria-describedby="test-describedby"
        aria-errormessage="test-errormessage"
        aria-invalid={false}
      />,
    );

    const input = result.getByRole('textbox');

    expect(input.getAttribute('aria-labelledby')).toBe('test-labelledby');
    expect(input.getAttribute('aria-describedby')).toBe('test-describedby');
    expect(input.getAttribute('aria-errormessage')).toBe('test-errormessage');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });
});
