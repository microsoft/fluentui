import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../common/isConformant';
import { Radio } from './Radio';

describe('Radio', () => {
  const noOp = () => undefined;

  isConformant({
    Component: Radio,
    displayName: 'Radio',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
          },
        },
      ],
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

    expect(onChange).toBeCalledTimes(0);

    userEvent.click(getByDisplayValue('test-value-1'));
    userEvent.click(getByDisplayValue('test-value-2'));
    userEvent.click(getByDisplayValue('test-value-3'));

    expect(onChange).toBeCalledTimes(3);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'test-value-1' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 'test-value-2' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 'test-value-3' });
  });
});
