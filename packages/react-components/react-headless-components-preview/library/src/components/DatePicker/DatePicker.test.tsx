import * as React from 'react';
import { createPortal } from 'react-dom';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { isConformant } from '../../testing/isConformant';
import { Field } from '../Field';
import { DatePicker } from './DatePicker';
import { createLocalDate } from './datePickerFormatting';
import type { DatePickerInputProps, DatePickerProps } from './DatePicker.types';

const today = new Date(2026, 7, 12);
const sameDay = (a: Date | null | undefined, b: Date) =>
  !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const getDayCell = (dialog: HTMLElement, name: string) =>
  within(dialog).getByRole('button', { name }).closest('[role="gridcell"]') as HTMLElement;

const renderDatePicker = (props: Partial<DatePickerProps> = {}) => {
  const result = render(<DatePicker aria-label="Due date" today={today} {...(props as DatePickerProps)} />);
  const getDialog = () => result.getByRole('dialog');
  return { ...result, getDialog };
};

describe('DatePicker', () => {
  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Due date', allowTextInput: true, today },
    disabledTests: ['consistent-callback-args'],
  });

  describe('non-editable field', () => {
    it('renders a button trigger that names the field and shows the placeholder', () => {
      const { container, getByRole } = renderDatePicker();
      const trigger = getByRole('button', { name: 'Due date Select a date' });
      const root = container.firstElementChild!;

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).not.toHaveAttribute('aria-controls');
      expect(trigger).not.toHaveAttribute('role', 'combobox');
      expect(root).toHaveAttribute('data-placeholder', '');
      expect(root).not.toHaveAttribute('data-open');
      expect(root).not.toHaveAttribute('data-editable');
    });

    it('includes the formatted value in the trigger name', () => {
      const { getByRole } = renderDatePicker({ defaultValue: new Date(2026, 7, 24) });

      expect(getByRole('button', { name: 'Due date August 24, 2026' })).toBeInTheDocument();
    });

    it('opens on click, names the dialog with the visible month and focuses today', async () => {
      const { container, getByRole, getDialog } = renderDatePicker();
      const trigger = getByRole('button', { name: 'Due date Select a date' });

      fireEvent.click(trigger);

      const dialog = getDialog();
      expect(dialog).toHaveAttribute('aria-label', 'August 2026');
      expect(dialog).not.toHaveAttribute('aria-modal');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls', dialog.id);
      expect(container.firstElementChild).toHaveAttribute('data-open', '');
      await waitFor(() => expect(getDayCell(dialog, 'August 12, 2026')).toHaveFocus());
      expect(getDayCell(dialog, 'August 12, 2026')).toHaveAttribute('aria-current', 'date');
    });

    it('focuses the selected day when opened', async () => {
      const { getByRole, getDialog } = renderDatePicker({ defaultValue: new Date(2025, 2, 3) });

      fireEvent.click(getByRole('button', { name: 'Due date March 3, 2025' }));

      const selected = getDayCell(getDialog(), 'March 3, 2025');
      expect(getDialog()).toHaveAttribute('aria-label', 'March 2025');
      expect(selected).toHaveAttribute('aria-selected', 'true');
      await waitFor(() => expect(selected).toHaveFocus());
    });

    it('focuses the first available day of the month when today is unavailable', async () => {
      const { getByRole, getDialog } = renderDatePicker({
        calendar: { restrictedDates: [new Date(2026, 7, 1), new Date(2026, 7, 2), today] },
      });

      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      await waitFor(() => expect(getDayCell(getDialog(), 'August 3, 2026')).toHaveFocus());
    });

    it('selects a day, closes and returns focus to the field', async () => {
      const onDateChange = jest.fn();
      const onOpenChange = jest.fn();
      const { getByRole, queryByRole, getDialog } = renderDatePicker({ onDateChange, onOpenChange });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      fireEvent.click(within(getDialog()).getByRole('button', { name: 'August 24, 2026' }));

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      const trigger = getByRole('button', { name: 'Due date August 24, 2026' });
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(onDateChange).toHaveBeenCalledTimes(1);
      expect(onDateChange.mock.calls[0][1]).toMatchObject({ reason: 'calendar' });
      expect(sameDay(onDateChange.mock.calls[0][1].value, new Date(2026, 7, 24))).toBe(true);
      expect(onOpenChange.mock.calls.map(call => call[1].reason)).toEqual(['trigger', 'selection']);
    });

    it('returns focus to the trigger when a calendar in a shadow root closes', async () => {
      const host = document.createElement('div');
      const shadowRoot = host.attachShadow({ mode: 'open' });
      document.body.appendChild(host);
      const onOpenChange = jest.fn();
      const { unmount } = render(
        createPortal(
          <DatePicker
            aria-label="Due date"
            today={today}
            value={new Date(2026, 7, 12)}
            open
            onOpenChange={onOpenChange}
          />,
          shadowRoot,
        ),
      );

      try {
        const dialog = shadowRoot.querySelector<HTMLElement>('[role="dialog"]')!;
        const selectedDate = dialog.querySelector<HTMLButtonElement>('button[aria-label="August 24, 2026"]')!;
        const trigger = shadowRoot.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]')!;
        const focusedDate = getDayCell(dialog, 'August 12, 2026');
        await waitFor(() => expect(shadowRoot.activeElement).toBe(focusedDate));

        fireEvent.click(selectedDate);

        expect(shadowRoot.activeElement).toBe(trigger);
        expect(onOpenChange.mock.calls[0][1]).toMatchObject({ open: false, reason: 'selection' });
      } finally {
        unmount();
        host.remove();
      }
    });

    it('selects with Enter on the focused day', async () => {
      const onDateChange = jest.fn();
      const { getByRole, getDialog } = renderDatePicker({ onDateChange });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));
      const cell = getDayCell(getDialog(), 'August 12, 2026');
      await waitFor(() => expect(cell).toHaveFocus());

      fireEvent.keyDown(cell, { key: 'Enter' });

      expect(sameDay(onDateChange.mock.calls[0][1].value, today)).toBe(true);
      expect(getByRole('button', { name: 'Due date August 12, 2026' })).toHaveFocus();
    });

    it('closes with Escape without changing the value and returns focus to the field', async () => {
      const onDateChange = jest.fn();
      const { getByRole, queryByRole, getDialog } = renderDatePicker({ onDateChange });
      const trigger = getByRole('button', { name: 'Due date Select a date' });
      fireEvent.click(trigger);
      const cell = getDayCell(getDialog(), 'August 12, 2026');
      await waitFor(() => expect(cell).toHaveFocus());

      fireEvent.keyDown(cell, { key: 'Escape' });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
      expect(onDateChange).not.toHaveBeenCalled();
    });

    it('opens with Alt + Arrow Down and closes with Escape on the field', () => {
      const { getByRole, queryByRole } = renderDatePicker();
      const trigger = getByRole('button', { name: 'Due date Select a date' });

      fireEvent.keyDown(trigger, { key: 'ArrowDown', altKey: true });
      expect(queryByRole('dialog')).toBeInTheDocument();

      act(() => trigger.focus());
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes when focus leaves the calendar without moving focus back', async () => {
      const onOpenChange = jest.fn();
      const { getByRole, queryByRole } = render(
        <>
          <DatePicker aria-label="Due date" today={today} onOpenChange={onOpenChange} />
          <button>Next</button>
        </>,
      );
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));
      const cell = getDayCell(getByRole('dialog'), 'August 12, 2026');
      await waitFor(() => expect(cell).toHaveFocus());
      const next = getByRole('button', { name: 'Next' });

      act(() => next.focus());

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(next).toHaveFocus();
      expect(onOpenChange.mock.calls[1][1]).toMatchObject({ open: false, reason: 'focusOut' });
    });

    it('light dismisses on a pointer press outside', () => {
      const onOpenChange = jest.fn();
      const { getByRole, queryByRole } = renderDatePicker({ onOpenChange });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      fireEvent.pointerDown(document.body);

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(onOpenChange.mock.calls[1][1]).toMatchObject({ open: false, reason: 'outsideClick' });
    });

    it('cannot open while disabled', () => {
      const { container, getByRole, queryByRole } = renderDatePicker({ disabled: true });
      const trigger = getByRole('button', { name: 'Due date Select a date' });

      fireEvent.click(trigger);
      fireEvent.keyDown(trigger, { key: 'ArrowDown', altKey: true });

      expect(trigger).toBeDisabled();
      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(container.firstElementChild).toHaveAttribute('data-disabled', '');
    });

    it('marks the calendar icon as decorative', () => {
      const { getByTestId } = renderDatePicker({ icon: { 'data-testid': 'icon' } as React.ComponentProps<'span'> });

      expect(getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
      expect(getByTestId('icon').closest('button')).not.toBeNull();
    });

    it('does not let consumer props misrepresent reserved state', () => {
      const { container } = renderDatePicker({
        root: { 'data-open': '', 'data-disabled': '' } as React.ComponentProps<'div'>,
      });

      expect(container.firstElementChild).not.toHaveAttribute('data-open');
      expect(container.firstElementChild).not.toHaveAttribute('data-disabled');
    });
  });

  describe('calendar composition', () => {
    it('hides Go to today by default and shows it on request', () => {
      const { getByRole, getDialog, unmount } = renderDatePicker();
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));
      expect(within(getDialog()).queryByRole('button', { name: 'Go to today' })).not.toBeInTheDocument();
      unmount();

      const second = renderDatePicker({ showGoToToday: true });
      fireEvent.click(second.getByRole('button', { name: 'Due date Select a date' }));
      expect(within(second.getDialog()).getByRole('button', { name: 'Go to today' })).toBeInTheDocument();
    });

    it('names month cells with their year and marks the shown and current month', () => {
      const { getByRole, getDialog } = renderDatePicker({ defaultValue: new Date(2026, 2, 3) });
      fireEvent.click(getByRole('button', { name: 'Due date March 3, 2026' }));
      const grids = within(getDialog()).getAllByRole('grid');

      expect(grids).toHaveLength(2);
      const monthGrid = grids[1];
      expect(within(monthGrid).getAllByRole('gridcell')).toHaveLength(12);
      expect(within(monthGrid).getByRole('gridcell', { name: 'March 2026' })).toHaveAttribute('aria-selected', 'true');
      expect(within(monthGrid).getByRole('gridcell', { name: 'August 2026' })).toHaveAttribute('aria-current', 'date');
      expect(within(monthGrid).getAllByRole('row')[0].querySelectorAll('[role="gridcell"]')).toHaveLength(3);
    });

    it('browses months without committing or closing', () => {
      const onDateChange = jest.fn();
      const { getByRole, getDialog } = renderDatePicker({ onDateChange });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      fireEvent.click(within(getDialog()).getByRole('button', { name: 'Oct' }));

      expect(getDialog()).toHaveAttribute('aria-label', 'October 2026');
      expect(onDateChange).not.toHaveBeenCalled();
    });

    it('opens the year-range grid from the day calendar heading', async () => {
      const { getByRole, getDialog } = renderDatePicker();
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      fireEvent.click(within(getDialog()).getByRole('button', { name: 'August 2026, change year' }));

      const yearGrid = within(getDialog()).getAllByRole('grid')[1];
      await waitFor(() => expect(within(yearGrid).getAllByRole('gridcell')).toHaveLength(12));
      expect(within(yearGrid).getByRole('gridcell', { name: /2026/ })).toHaveAttribute('aria-current', 'date');
      expect(getDialog()).toBeInTheDocument();
    });

    it('moves focus to the year-range grid each time the day calendar heading is activated', async () => {
      const { getByRole, getDialog } = renderDatePicker();
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));
      const heading = within(getDialog()).getByRole('button', { name: 'August 2026, change year' });

      fireEvent.click(heading);
      const yearGrid = within(getDialog()).getAllByRole('grid')[1];
      await waitFor(() => expect(yearGrid).toContainElement(document.activeElement as HTMLElement));

      act(() => heading.focus());
      fireEvent.click(heading);
      expect(yearGrid).toContainElement(document.activeElement as HTMLElement);
    });

    it('opens the year-range grid from the day calendar heading in the overlay layout', async () => {
      const { getByRole, getDialog } = renderDatePicker({ calendar: { layout: 'overlay' } });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));
      expect(within(getDialog()).getAllByRole('grid')).toHaveLength(1);

      fireEvent.click(within(getDialog()).getByRole('button', { name: 'August 2026, change year' }));

      await waitFor(() => expect(within(getDialog()).getByRole('gridcell', { name: /2026/ })).toBeInTheDocument());
      const yearGrid = within(getDialog()).getByRole('grid');
      expect(within(yearGrid).getAllByRole('gridcell')).toHaveLength(12);
      await waitFor(() => expect(yearGrid).toContainElement(document.activeElement as HTMLElement));
    });

    it('names month cells with years below 100', () => {
      const { getByRole, getDialog } = renderDatePicker({ defaultValue: createLocalDate(42, 2, 3) });
      fireEvent.click(getByRole('button', { name: /^Due date March 3, 42/ }));
      const monthGrid = within(getDialog()).getAllByRole('grid')[1];

      expect(within(monthGrid).getByRole('gridcell', { name: 'March 42' })).toHaveAttribute('aria-selected', 'true');
      expect(within(monthGrid).queryByRole('gridcell', { name: /1942/ })).not.toBeInTheDocument();
    });

    it('keeps the calendar open while navigating months with the header buttons', () => {
      const { getByRole, getDialog } = renderDatePicker();
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      fireEvent.click(within(getDialog()).getByRole('button', { name: /^Next month/ }));

      expect(getDialog()).toHaveAttribute('aria-label', 'September 2026');
    });

    it('does not let calendar configuration override selection or boundaries', () => {
      const { getByRole, getDialog } = renderDatePicker({
        minDate: new Date(2026, 7, 10),
        calendar: { value: new Date(2026, 7, 2) } as DatePickerProps['calendar'],
      });
      fireEvent.click(getByRole('button', { name: 'Due date Select a date' }));

      expect(getDayCell(getDialog(), 'August 9, 2026')).toHaveAttribute('aria-disabled', 'true');
      expect(getDayCell(getDialog(), 'August 2, 2026')).not.toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('editable field', () => {
    const renderEditable = (props: Partial<DatePickerInputProps> = {}) => {
      const result = renderDatePicker({ allowTextInput: true, ...props });
      return { ...result, input: result.getByRole('textbox', { name: 'Due date' }) as HTMLInputElement };
    };

    it('renders a text input with popup semantics and the placeholder', () => {
      const { input, container } = renderEditable({ required: true });

      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Select a date');
      expect(input).toHaveAttribute('aria-haspopup', 'dialog');
      expect(input).not.toHaveAttribute('aria-expanded');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(container.firstElementChild).toHaveAttribute('data-editable', '');
    });

    it('keeps focus in the input on click and opens from the icon', () => {
      const { input, getByTestId, queryByRole } = renderEditable({
        icon: { 'data-testid': 'icon' } as React.ComponentProps<'span'>,
      });

      fireEvent.click(input);
      expect(queryByRole('dialog')).not.toBeInTheDocument();

      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('role', 'button');
      // Focusable for assistive technology, but not a tab stop.
      expect(icon).toHaveAttribute('tabindex', '-1');
      fireEvent.click(icon);
      expect(queryByRole('dialog')).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-expanded', 'true');
    });

    it.each(['Enter', ' '])('toggles the calendar from the focused icon with "%s"', key => {
      const onOpenChange = jest.fn();
      const { getByTestId, queryByRole } = renderEditable({
        icon: { 'data-testid': 'icon' } as React.ComponentProps<'span'>,
        onOpenChange,
      });
      const icon = getByTestId('icon');

      icon.focus();
      expect(icon).toHaveFocus();
      expect(fireEvent.keyDown(icon, { key })).toBe(false);
      expect(queryByRole('dialog')).toBeInTheDocument();
      expect(onOpenChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ open: true, reason: 'icon' }),
      );
    });

    it('does not open from the icon keyboard while disabled', () => {
      const { getByTestId, queryByRole } = renderEditable({
        disabled: true,
        icon: { 'data-testid': 'icon' } as React.ComponentProps<'span'>,
      });

      fireEvent.keyDown(getByTestId('icon'), { key: 'Enter' });
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('validates pending text when focus leaves the date picker from the icon', () => {
      const onValidationResult = jest.fn();
      const { input, getByTestId } = renderEditable({
        icon: { 'data-testid': 'icon' } as React.ComponentProps<'span'>,
        onValidationResult,
      });

      fireEvent.change(input, { target: { value: 'not a date' } });
      fireEvent.blur(input, { relatedTarget: getByTestId('icon') });
      expect(onValidationResult).not.toHaveBeenCalled();

      fireEvent.blur(getByTestId('icon'), { relatedTarget: document.body });
      expect(onValidationResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ error: 'invalid-input' }),
      );
    });

    it.each(['2026-08-20', 'Aug 20, 2026', 'August 20 2026', '8/20/2026'])('commits "%s" on Enter', text => {
      const onDateChange = jest.fn();
      const { input } = renderEditable({ onDateChange });

      fireEvent.change(input, { target: { value: text } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onDateChange).toHaveBeenCalledTimes(1);
      expect(onDateChange.mock.calls[0][1].reason).toBe('input');
      expect(sameDay(onDateChange.mock.calls[0][1].value, new Date(2026, 7, 20))).toBe(true);
      expect(input.value).toBe('August 20, 2026');
    });

    it('validates on blur out of the date picker', () => {
      const onDateChange = jest.fn();
      const { input } = renderEditable({ onDateChange });

      act(() => input.focus());
      fireEvent.change(input, { target: { value: '2026-08-20' } });
      fireEvent.blur(input, { relatedTarget: document.body });

      expect(onDateChange).toHaveBeenCalledTimes(1);
    });

    it('restores the previous value and shows a described, polite error for unrecognized text', () => {
      const onValidationResult = jest.fn();
      const { input, container, getByText } = renderEditable({
        defaultValue: new Date(2026, 7, 12),
        onValidationResult,
      });

      fireEvent.change(input, { target: { value: 'not a date' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(input.value).toBe('August 12, 2026');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(container.firstElementChild).toHaveAttribute('data-invalid', '');
      const message = getByText(/Enter a date such as/);
      expect(message).toHaveAttribute('aria-live', 'polite');
      expect(input).toHaveAttribute('aria-describedby', message.id);
      expect(onValidationResult.mock.calls[0][1]).toMatchObject({ error: 'invalid-input' });

      // Repeated blur neither clears nor re-reports the error.
      fireEvent.blur(input);
      fireEvent.blur(input);
      expect(onValidationResult).toHaveBeenCalledTimes(1);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('clears a stale validation error when a controlled value is replaced', () => {
      const { input, rerender, getByText } = renderEditable({ value: new Date(2026, 7, 12) });

      fireEvent.change(input, { target: { value: 'not a date' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(getByText(/Enter a date such as/)).toBeInTheDocument();

      rerender(<DatePicker aria-label="Due date" today={today} allowTextInput value={new Date(2026, 7, 20)} />);

      expect(input).toHaveValue('August 20, 2026');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('aria-describedby');
    });

    it('rejects impossible and out-of-range dates', () => {
      const onDateChange = jest.fn();
      const { input, getByText } = renderEditable({
        onDateChange,
        minDate: new Date(2026, 7, 1),
        maxDate: new Date(2026, 7, 31),
      });

      fireEvent.change(input, { target: { value: '2026-02-30' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(getByText(/Enter a date such as/)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: '2026-09-01' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(getByText('Enter an available date between August 1, 2026 and August 31, 2026.')).toBeInTheDocument();
      expect(input.value).toBe('');
      expect(onDateChange).not.toHaveBeenCalled();
    });

    it('rejects unchanged text when the committed date becomes unavailable', () => {
      const onDateChange = jest.fn();
      const onValidationResult = jest.fn();
      const { input, rerender, getByText } = renderEditable({
        defaultValue: today,
        onDateChange,
        onValidationResult,
      });

      rerender(
        <DatePicker
          aria-label="Due date"
          today={today}
          allowTextInput
          defaultValue={today}
          minDate={new Date(2026, 7, 20)}
          onDateChange={onDateChange}
          onValidationResult={onValidationResult}
        />,
      );
      fireEvent.change(input, { target: { value: 'pending' } });
      fireEvent.change(input, { target: { value: 'August 12, 2026' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(getByText('Enter an available date on or after August 20, 2026.')).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(onDateChange).not.toHaveBeenCalled();
      expect(onValidationResult.mock.calls[0][1]).toMatchObject({ error: 'out-of-bounds' });
    });

    it('clears the error after an accepted date or a calendar selection', () => {
      const { input, getByRole } = renderEditable();

      fireEvent.change(input, { target: { value: 'nope' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(input).toHaveAttribute('aria-invalid', 'true');

      fireEvent.change(input, { target: { value: 'Aug 3, 2026' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveAttribute('aria-describedby');

      fireEvent.change(input, { target: { value: 'nope' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true });
      fireEvent.click(within(getByRole('dialog')).getByRole('button', { name: 'August 4, 2026' }));
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input.value).toBe('August 4, 2026');
    });

    it('clears an optional value when the text is cleared', () => {
      const onDateChange = jest.fn();
      const { input, container } = renderEditable({ defaultValue: today, onDateChange });

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onDateChange.mock.calls[0][1]).toMatchObject({ value: null, reason: 'clear' });
      expect(container.firstElementChild).toHaveAttribute('data-placeholder', '');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it.each([false, 'false'] as const)('treats aria-required=%s as optional', ariaRequired => {
      const { input, queryByText } = renderEditable({ 'aria-required': ariaRequired });

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(input).not.toHaveAttribute('aria-invalid');
      expect(queryByText('Enter a date.')).not.toBeInTheDocument();
    });

    it('combines ARIA descriptions and invalid state from the input slot', () => {
      const { input } = renderEditable({
        'aria-describedby': 'field-help',
        input: { 'aria-describedby': 'input-help', 'aria-invalid': true },
      });

      expect(input).toHaveAttribute('aria-describedby', 'field-help input-help');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not validate pending text when focus moves into the calendar', async () => {
      const onValidationResult = jest.fn();
      const { input, getByRole } = renderEditable({ onValidationResult });

      act(() => input.focus());
      fireEvent.change(input, { target: { value: 'pending' } });
      fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true });
      const cell = getDayCell(getByRole('dialog'), 'August 12, 2026');
      await waitFor(() => expect(cell).toHaveFocus());

      expect(onValidationResult).not.toHaveBeenCalled();
      expect(input.value).toBe('pending');
    });
  });

  it('supports a controlled value and open state', () => {
    const onOpenChange = jest.fn();
    const { getByRole, queryByRole, rerender } = render(
      <DatePicker aria-label="Due date" today={today} value={new Date(2026, 0, 5)} open onOpenChange={onOpenChange} />,
    );

    expect(getByRole('dialog')).toHaveAttribute('aria-label', 'January 2026');
    fireEvent.click(within(getByRole('dialog')).getByRole('button', { name: 'January 6, 2026' }));
    expect(onOpenChange.mock.calls[0][1]).toMatchObject({ open: false, reason: 'selection' });
    // Controlled props win until the consumer updates them.
    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Due date January 5, 2026' })).toBeInTheDocument();

    rerender(<DatePicker aria-label="Due date" today={today} value={new Date(2026, 0, 6)} open={false} />);
    expect(queryByRole('dialog')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Due date January 6, 2026' })).toBeInTheDocument();
  });

  it('does not steal focus from another control mounted during a controlled close', async () => {
    const ControlledDatePicker = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <>
          <DatePicker
            aria-label="Due date"
            today={today}
            open={open}
            onOpenChange={(_event, data) => setOpen(data.open)}
          />
          {!open && <input autoFocus aria-label="Next field" />}
        </>
      );
    };
    const { getByRole } = render(<ControlledDatePicker />);
    const dialog = getByRole('dialog');
    await waitFor(() => expect(getDayCell(dialog, 'August 12, 2026')).toHaveFocus());

    fireEvent.click(within(dialog).getByRole('button', { name: 'August 24, 2026' }));

    await waitFor(() => expect(getByRole('textbox', { name: 'Next field' })).toHaveFocus());
  });

  it('allows the Calendar consumer to cancel closing with Enter', () => {
    const { getByRole } = renderDatePicker({
      open: true,
      calendar: {
        dayPicker: { closeButton: { children: 'Close calendar' } },
        onDismiss: event => event.preventDefault(),
      },
    });
    const closeButton = getByRole('button', { name: 'Close' });

    fireEvent.keyDown(closeButton, { key: 'Enter' });

    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('focuses the calendar when initially open', async () => {
    const { getByRole } = render(
      <DatePicker aria-label="Due date" today={today} defaultValue={new Date(2025, 2, 3)} defaultOpen />,
    );

    await waitFor(() => expect(getDayCell(getByRole('dialog'), 'March 3, 2025')).toHaveFocus());
  });

  it('shows the current value and focuses the calendar when controlled open changes', async () => {
    const { getByRole, queryByRole, rerender } = render(
      <DatePicker aria-label="Due date" today={today} value={new Date(2026, 0, 5)} open />,
    );
    expect(getByRole('dialog')).toHaveAttribute('aria-label', 'January 2026');

    rerender(<DatePicker aria-label="Due date" today={today} value={new Date(2026, 2, 3)} open={false} />);
    expect(queryByRole('dialog')).not.toBeInTheDocument();
    rerender(<DatePicker aria-label="Due date" today={today} value={new Date(2026, 2, 3)} open />);

    expect(getByRole('dialog')).toHaveAttribute('aria-label', 'March 2026');
    await waitFor(() => expect(getDayCell(getByRole('dialog'), 'March 3, 2026')).toHaveFocus());
  });

  describe('field control typing', () => {
    it('forwards the ref and native events to the button trigger or the text input', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      const inputRef = React.createRef<HTMLInputElement>();
      const onClick = jest.fn((event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.form);
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLInputElement>) => event.currentTarget.select());
      const { getByRole } = render(
        <>
          <DatePicker aria-label="Start date" today={today} ref={buttonRef} onClick={onClick} />
          <DatePicker aria-label="Due date" today={today} allowTextInput ref={inputRef} onKeyDown={onKeyDown} />
        </>,
      );

      expect(buttonRef.current).toBe(getByRole('button', { name: 'Start date Select a date' }));
      expect(inputRef.current).toBe(getByRole('textbox', { name: 'Due date' }));
    });

    it('types the ref and native events by allowTextInput', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      const inputRef = React.createRef<HTMLInputElement>();
      const allowTextInput = inputRef.current !== null;
      const elements = [
        // @ts-expect-error the non-editable field control is a button
        <DatePicker key="button" aria-label="Due date" ref={inputRef} />,
        // @ts-expect-error the editable field control is an input
        <DatePicker key="input" aria-label="Due date" allowTextInput ref={buttonRef} />,
        // @ts-expect-error button events have no input methods
        <DatePicker key="event" aria-label="Due date" onKeyDown={event => event.currentTarget.select()} />,
        <DatePicker key="dynamic" aria-label="Due date" allowTextInput={allowTextInput} />,
      ];

      expect(elements).toHaveLength(4);
    });

    it('accepts DatePickerProps in wrapper components', () => {
      const Wrapper = (props: DatePickerProps) => <DatePicker today={today} {...props} />;
      const { getByRole } = render(
        <>
          <Wrapper aria-label="Start date" />
          <Wrapper aria-label="Due date" allowTextInput />
        </>,
      );

      expect(getByRole('button', { name: 'Start date Select a date' })).toBeInTheDocument();
      expect(getByRole('textbox', { name: 'Due date' })).toBeInTheDocument();
    });
  });

  it('uses a surrounding label through aria-labelledby and keeps the value in the name', () => {
    const { getByRole } = render(
      <>
        <span id="label">Start date</span>
        <DatePicker aria-labelledby="label" today={today} defaultValue={today} />
      </>,
    );

    expect(getByRole('button', { name: 'Start date August 12, 2026' })).toBeInTheDocument();
  });

  it('keeps the displayed date in the trigger name inside a Field', () => {
    const { getByRole } = render(
      <Field label="Due date">
        <DatePicker today={today} defaultValue={today} />
      </Field>,
    );

    expect(getByRole('button', { name: 'Due date August 12, 2026' })).toBeInTheDocument();
  });

  it.each([false, true])('does not duplicate a Field hint description (allowTextInput=%s)', allowTextInput => {
    const { getByRole, getByText } = render(
      <Field label="Due date" hint="Pick a delivery date">
        <DatePicker today={today} allowTextInput={allowTextInput} />
      </Field>,
    );
    const control = allowTextInput
      ? getByRole('textbox', { name: 'Due date' })
      : getByRole('button', { name: 'Due date Select a date' });
    const hint = getByText('Pick a delivery date');
    const describedBy = control.getAttribute('aria-describedby')?.split(/\s+/) ?? [];

    expect(describedBy).toEqual([hint.id]);
  });

  it('combines ARIA descriptions and invalid state from the trigger slot', () => {
    const { getByRole } = render(
      <DatePicker
        aria-label="Due date"
        aria-describedby="field-help"
        trigger={{ 'aria-describedby': 'trigger-help', 'aria-invalid': true }}
      />,
    );
    const trigger = getByRole('button', { name: 'Due date Select a date' });

    expect(trigger).toHaveAttribute('aria-describedby', 'field-help trigger-help');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps reporting close requests that a controlled consumer ignores', () => {
    const onOpenChange = jest.fn();
    const { getByRole } = render(<DatePicker aria-label="Due date" today={today} open onOpenChange={onOpenChange} />);
    const cell = getDayCell(getByRole('dialog'), 'August 12, 2026');

    fireEvent.keyDown(cell, { key: 'Escape' });
    fireEvent.keyDown(cell, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('does not let Escape that closes the calendar reach ancestors', () => {
    const onAncestorKeyDown = jest.fn();
    const { getByRole } = render(
      <div onKeyDown={onAncestorKeyDown}>
        <DatePicker aria-label="Due date" today={today} />
      </div>,
    );
    const trigger = getByRole('button', { name: 'Due date Select a date' });
    fireEvent.click(trigger);

    fireEvent.keyDown(getDayCell(getByRole('dialog'), 'August 12, 2026'), { key: 'Escape' });
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Escape' });

    expect(onAncestorKeyDown).not.toHaveBeenCalled();
  });

  it('renders on the server without the calendar', () => {
    const html = renderToString(<DatePicker aria-label="Due date" today={today} />);

    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).not.toContain('role="dialog"');
  });
});
