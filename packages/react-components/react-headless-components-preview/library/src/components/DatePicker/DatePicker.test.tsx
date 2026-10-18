import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { isConformant } from '../../testing/isConformant';
import { DatePicker } from './DatePicker';
import { Field } from '../Field';

const today = new Date(2030, 0, 15);

describe('DatePicker', () => {
  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Date', today },
  });

  it('renders an empty, read-only combobox without icons or Fluent classes', () => {
    const { container, getByRole, queryByRole } = render(<DatePicker aria-label="Date" today={today} />);
    expect(getByRole('combobox')).toHaveValue('');
    expect(getByRole('combobox')).toHaveAttribute('readonly');
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('dialog')).toBeNull();
    expect(container.querySelector('svg')).toBeNull();
    expect(container.querySelector('[class*="fui-"]')).toBeNull();
    expect(container.firstElementChild).not.toHaveAttribute('data-open');
    expect(container.firstElementChild).not.toHaveAttribute('data-disabled');
    expect(container.firstElementChild).not.toHaveAttribute('data-invalid');
  });

  it('owns its reserved state attributes after consumer props', () => {
    const { container, getByRole, rerender } = render(
      <DatePicker today={today} aria-label="Date" disabled aria-invalid data-open="" />,
    );
    expect(container.firstElementChild).toHaveAttribute('data-disabled', '');
    expect(container.firstElementChild).toHaveAttribute('data-invalid', '');
    expect(container.firstElementChild).not.toHaveAttribute('data-open');
    expect(getByRole('combobox')).toBeDisabled();
    expect(getByRole('button')).toBeDisabled();
    rerender(<DatePicker today={today} aria-label="Date" data-disabled="" data-invalid="" />);
    expect(container.firstElementChild).not.toHaveAttribute('data-disabled');
    expect(container.firstElementChild).not.toHaveAttribute('data-invalid');
  });

  it('forwards the native input ref and slot refs, classes, and styles', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const rootRef = React.createRef<HTMLSpanElement>();
    const { getByRole, container } = render(
      <DatePicker
        today={today}
        ref={inputRef}
        className="custom"
        style={{ opacity: 0.5 }}
        root={{ ref: rootRef }}
        input={{ 'aria-label': 'Input slot' }}
        trigger={{ children: 'Choose', 'aria-label': 'Choose date' }}
      />,
    );
    expect(inputRef.current).toBe(getByRole('combobox'));
    expect(rootRef.current).toBe(container.firstElementChild);
    expect(container.firstElementChild).toHaveClass('custom');
    expect(container.firstElementChild).toHaveStyle({ opacity: '0.5' });
    expect(getByRole('combobox', { name: 'Input slot' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Input slot Choose date' })).toHaveTextContent('Choose');
  });

  it('opens, selects, closes, and exposes the dialog relationship', async () => {
    const onDateChange = jest.fn();
    const onOpenChange = jest.fn();
    const { container, getByRole, queryByRole } = render(
      <DatePicker today={today} aria-label="Date" onDateChange={onDateChange} onOpenChange={onOpenChange} />,
    );
    fireEvent.click(getByRole('combobox'));
    const dialog = getByRole('dialog', { name: 'Calendar' });
    expect(getByRole('combobox')).toHaveAttribute('aria-controls', dialog.id);
    expect(container.firstElementChild).toHaveAttribute('data-open', '');
    expect(container.querySelector('[class*="fui-"]')).toBeNull();
    fireEvent.click(getByRole('button', { name: 'January 16, 2030' }));
    await waitFor(() => expect(queryByRole('dialog')).toBeNull());
    expect(getByRole('combobox')).toHaveValue('Wed Jan 16 2030');
    expect(onDateChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        value: new Date(2030, 0, 16),
        reason: 'calendar',
        selectedDateRange: [new Date(2030, 0, 16)],
      }),
    );
    expect(onOpenChange.mock.calls.map(([, data]) => [data.open, data.reason])).toEqual([
      [true, 'input'],
      [false, 'selection'],
    ]);
  });

  it('preserves controlled value and rejected open/close requests', () => {
    const onOpenChange = jest.fn();
    const onDateChange = jest.fn();
    const { getByRole, rerender } = render(
      <DatePicker
        today={today}
        aria-label="Date"
        open={false}
        value={today}
        onOpenChange={onOpenChange}
        onDateChange={onDateChange}
      />,
    );
    fireEvent.keyDown(getByRole('combobox'), { key: 'ArrowDown' });
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(onOpenChange).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ open: true }));
    rerender(
      <DatePicker
        today={today}
        aria-label="Date"
        open
        value={today}
        onOpenChange={onOpenChange}
        onDateChange={onDateChange}
      />,
    );
    fireEvent.click(getByRole('button', { name: 'January 16, 2030' }));
    expect(getByRole('combobox')).toHaveValue('Tue Jan 15 2030');
    expect(getByRole('dialog')).toHaveAttribute('open');
    expect(onDateChange).toHaveBeenCalledTimes(1);
    fireEvent(getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(getByRole('dialog')).toHaveAttribute('open');
  });

  it('validates edits, required empty values, boundaries, and restricted local dates', () => {
    const onValidationResult = jest.fn();
    const onDateChange = jest.fn();
    const { getByRole } = render(
      <DatePicker
        today={today}
        aria-label="Date"
        allowTextInput
        required
        minDate={new Date(2030, 0, 10)}
        maxDate={new Date(2030, 0, 20)}
        calendar={{ restrictedDates: [today] }}
        onValidationResult={onValidationResult}
        onDateChange={onDateChange}
      />,
    );
    const input = getByRole('combobox');
    for (const [value, error] of [
      ['', 'required-input'],
      ['not a date', 'invalid-input'],
      ['2030-01-09', 'out-of-bounds'],
      ['2030-01-15', 'out-of-bounds'],
      ['2030-01-16', undefined],
    ]) {
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
      expect(onValidationResult).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ error }));
    }
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Wed Jan 16 2030');
  });

  it('preserves consumer cancellation and Calendar selection handlers', () => {
    const onDateChange = jest.fn();
    const { getByRole, queryByRole, rerender } = render(
      <DatePicker today={today} aria-label="Date" input={{ onClick: event => event.preventDefault() }} />,
    );
    fireEvent.click(getByRole('combobox'));
    expect(queryByRole('dialog')).toBeNull();
    rerender(
      <DatePicker
        today={today}
        aria-label="Date"
        defaultOpen
        onDateChange={onDateChange}
        calendar={{ onSelectDate: event => event.preventDefault() }}
      />,
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button', { name: 'January 16, 2030' }));
    expect(onDateChange).not.toHaveBeenCalled();
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('uses Field associations and exposes its validation state', () => {
    const { container, getByRole } = render(
      <Field label="Start date" required validationState="error" validationMessage="Invalid date">
        <DatePicker today={today} />
      </Field>,
    );
    const input = getByRole('combobox', { name: 'Start date' });
    expect(input).toBeRequired();
    const descriptionId = input.getAttribute('aria-describedby')!;
    expect(container.querySelector(`[id="${descriptionId}"]`)).toHaveTextContent('Invalid date');
    expect(container.querySelector('[data-invalid]')).toBeInTheDocument();
  });

  it.each(['Enter', ' '])('honors consumer cancellation of %s Calendar selection', key => {
    const onDateChange = jest.fn();
    const { getByRole } = render(
      <DatePicker
        today={today}
        aria-label="Date"
        defaultOpen
        onDateChange={onDateChange}
        calendar={{ onSelectDate: event => event.preventDefault() }}
      />,
    );
    fireEvent.keyDown(getByRole('button', { name: 'January 16, 2030' }).closest('td')!, { key });
    expect(onDateChange).not.toHaveBeenCalled();
    expect(getByRole('dialog')).toHaveAttribute('open');
  });

  it('honors trigger and popup cancellation and calls Input callbacks once', () => {
    const onClick = jest.fn(event => event.preventDefault());
    const onOpenChange = jest.fn();
    const { getByRole, rerender, queryByRole } = render(
      <DatePicker
        today={today}
        aria-label="Date"
        onClick={onClick}
        onOpenChange={onOpenChange}
        trigger={{ onClick: event => event.preventDefault() }}
      />,
    );
    fireEvent.click(getByRole('combobox'));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button'));
    expect(queryByRole('dialog')).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
    rerender(
      <DatePicker
        key="controlled"
        today={today}
        aria-label="Date"
        open
        onOpenChange={onOpenChange}
        popupSurface={{ onCancel: event => event.preventDefault() }}
      />,
    );
    fireEvent(getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closes a disabled open picker without accepting selection', async () => {
    const onDateChange = jest.fn();
    const { rerender, queryByRole, getByRole } = render(
      <DatePicker today={today} aria-label="Date" defaultOpen onDateChange={onDateChange} />,
    );
    rerender(<DatePicker today={today} aria-label="Date" defaultOpen disabled onDateChange={onDateChange} />);
    await waitFor(() => expect(queryByRole('dialog')).toBeNull());
    expect(getByRole('combobox')).toBeDisabled();
    expect(onDateChange).not.toHaveBeenCalled();
  });

  it('renders an initially open dialog on the server without executing native DOM APIs', () => {
    expect(renderToString(<DatePicker today={today} aria-label="Date" defaultOpen />)).toContain('<dialog');
  });
});
