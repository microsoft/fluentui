import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
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

  it('preserves keyboard focus tracking with a consumer object root ref', async () => {
    const rootRef = React.createRef<HTMLSpanElement>();
    const { getByRole, unmount } = render(
      <>
        <Radio root={{ ref: rootRef }} />
        <button>After</button>
      </>,
    );
    expect(rootRef.current).toBe(getByRole('radio').parentElement);
    userEvent.tab();
    expect(getByRole('radio').matches(':focus')).toBe(true);
    await waitFor(() => expect(rootRef.current?.hasAttribute('data-fui-focus-within')).toBe(true));
    userEvent.tab();
    expect(getByRole('button').matches(':focus')).toBe(true);
    expect(rootRef.current?.hasAttribute('data-fui-focus-within')).toBe(false);
    unmount();
    expect(rootRef.current).toBeNull();
  });

  it('preserves keyboard focus tracking with a consumer callback root ref', async () => {
    const rootRef = jest.fn<void, [HTMLSpanElement | null]>();
    const { getByRole, unmount } = render(<Radio root={{ ref: rootRef }} />);
    const root = getByRole('radio').parentElement;
    expect(rootRef).toHaveBeenLastCalledWith(root);
    userEvent.tab();
    await waitFor(() => expect(root?.hasAttribute('data-fui-focus-within')).toBe(true));
    unmount();
    expect(rootRef).toHaveBeenLastCalledWith(null);
  });

  it('updates consumer root refs without losing keyboard focus tracking', async () => {
    const firstRef = React.createRef<HTMLSpanElement>();
    const secondRef = React.createRef<HTMLSpanElement>();
    const { getByRole, rerender, unmount } = render(<Radio root={{ ref: firstRef }} />);
    const root = getByRole('radio').parentElement;
    userEvent.tab();
    await waitFor(() => expect(root?.hasAttribute('data-fui-focus-within')).toBe(true));
    rerender(<Radio root={{ ref: secondRef }} />);
    expect(firstRef.current).toBeNull();
    expect(secondRef.current).toBe(root);
    expect(getByRole('radio').matches(':focus')).toBe(true);
    expect(root?.hasAttribute('data-fui-focus-within')).toBe(true);
    unmount();
    expect(secondRef.current).toBeNull();
  });

  it('keeps internal keyboard focus tracking when the consumer root ref is null', async () => {
    const { getByRole } = render(<Radio root={{ ref: null }} />);
    userEvent.tab();
    await waitFor(() => expect(getByRole('radio').parentElement?.hasAttribute('data-fui-focus-within')).toBe(true));
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
