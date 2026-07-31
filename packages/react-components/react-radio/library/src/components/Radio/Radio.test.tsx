import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Radio } from './Radio';

describe('Radio', () => {
  const noOp = () => undefined;

  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts that `radioClassNames` holds
    // `fui-Radio` / `fui-Radio__<slot>` and that those classes are rendered. Radio publishes
    // neither any more: the BEM statics are removed and `radioClassNames` is narrowed to
    // `{ root: 'group/fui-radio' }` (DECISIONS.md D16.1/D16.5). The test is disabled per
    // package as each one is swept; it leaves `defaultTests` altogether once every converted
    // package has been (D16.6). `component-has-group-marker` (now a default test) is its replacement — it
    // asserts the marker is stamped AND that it is never `classList[0]` (D16.2).
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

  it('renders a default state', () => {
    const { getByRole } = render(<Radio />);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('renders a label', () => {
    const { getByRole, getByLabelText } = render(<Radio label="Test Label" />);
    expect(getByRole('radio')).toBe(getByLabelText('Test Label'));
  });
  it('renders a required radio', () => {
    const { getByRole, getByLabelText } = render(<Radio label="Required Label" required />);
    expect(getByRole('radio')).toBe(getByLabelText('Required Label'));
    expect((getByRole('radio') as HTMLInputElement).required).toBe(true);
  });

  it('forwards ID to input element', () => {
    const { getByRole } = render(<Radio id="test-id" />);
    expect(getByRole('radio').id).toEqual('test-id');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<Radio ref={ref} />);
    expect(getByRole('radio')).toEqual(ref.current);
  });

  it('handles disabled', () => {
    const { getByRole } = render(<Radio disabled />);
    expect((getByRole('radio') as HTMLInputElement).disabled).toBeTruthy();
  });

  it('defaults to unchecked', () => {
    const { getByRole } = render(<Radio />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(false);
  });

  it('respects defaultChecked', () => {
    const { getByRole } = render(<Radio defaultChecked />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('ignores defaultChecked updates', () => {
    const { rerender, getByRole } = render(<Radio defaultChecked />);
    rerender(<Radio defaultChecked={false} />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('respects checked', () => {
    const { getByRole } = render(<Radio checked onChange={noOp} />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(true);
  });

  it('respects checked updates', () => {
    const { rerender, getByRole } = render(<Radio checked onChange={noOp} />);
    rerender(<Radio checked={false} onChange={noOp} />);
    expect((getByRole('radio') as HTMLInputElement).checked).toBe(false);
  });

  it('calls onChange with the correct value', () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <>
        <Radio name="test-name" value="test-value-1" onChange={onChange} />
        <Radio name="test-name" value="test-value-2" onChange={onChange} />
        <Radio name="test-name" value="test-value-3" onChange={onChange} />
      </>,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    userEvent.click(getByDisplayValue('test-value-1'));
    userEvent.click(getByDisplayValue('test-value-2'));
    userEvent.click(getByDisplayValue('test-value-3'));

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'test-value-1' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 'test-value-2' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 'test-value-3' });
  });
});
