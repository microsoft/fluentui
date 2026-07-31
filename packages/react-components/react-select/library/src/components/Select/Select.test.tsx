import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Select } from './Select';
import { isConformant } from '../../testing/isConformant';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts `selectClassNames` still holds
    // `fui-Select` / `fui-Select__<slot>` strings AND that they are rendered. Both are false
    // by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed the export to
    // `{ root }` and re-pointed it at the group marker. `component-has-group-marker` (now a default test) is
    // its replacement and asserts the contract that actually holds now — including the D15.1
    // `classList[0]` invariant the static used to satisfy incidentally (D16.2/D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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
