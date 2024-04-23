import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { Select } from './Select';
import { isConformant } from '../../testing/isConformant';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  // Note for Select tests: avoid using getByRole;
  // The accessibility role mapping for <select> differs between Windows and macOS

  it('renders the default state', () => {
    const result = render(<Select />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders a custom icon slot', () => {
    const result = render(<Select icon="x" />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders option children', () => {
    const result = render(
      <Select>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Select>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('handles the defaultValue attribute', () => {
    const { getByTestId } = render(
      <Select defaultValue="B">
        <option>A</option>
        <option data-testid="option-b">B</option>
        <option>C</option>
      </Select>,
    );

    expect((getByTestId('option-b') as HTMLOptionElement).selected).toBeTruthy();
  });

  it('handles the disabled attribute', () => {
    const { getByTestId } = render(<Select data-testid="select" disabled />);
    expect((getByTestId('select') as HTMLSelectElement).disabled).toBeTruthy();
  });

  it('forwards ref to the select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    const { getByTestId } = render(<Select ref={ref} data-testid="select" />);
    expect(getByTestId('select')).toEqual(ref.current);
  });

  it('forwards id and aria-* to the select element', () => {
    const { getByTestId } = render(<Select id="select" aria-label="test" data-testid="select" />);
    const select = getByTestId('select');

    expect(select.id).toEqual('select');
    expect(select.getAttribute('aria-label')).toEqual('test');
  });

  it('calls onChange with new value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Select onChange={onChange} data-testid="select">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Select>,
    );
    fireEvent.change(getByTestId('select'), { target: { value: 'B' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'B' });
  });

  it('does not call onChange with value changes', () => {
    const onChange = jest.fn();
    const component = render(
      <Select value="B" onChange={onChange} data-testid="select">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Select>,
    );
    component.rerender(
      <Select value="C" onChange={onChange} data-testid="select">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Select>,
    );
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Select data-testid="select">
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </Select>
      </Field>,
    );

    const select = result.getByTestId('select') as HTMLSelectElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(select.id).toEqual(label.htmlFor);
    expect(select.getAttribute('aria-describedby')).toEqual(message.id);
    expect(select.getAttribute('aria-invalid')).toEqual('true');
    expect(select.required).toBe(true);
  });
});
