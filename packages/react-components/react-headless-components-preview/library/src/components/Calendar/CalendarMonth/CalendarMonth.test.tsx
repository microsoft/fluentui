import * as React from 'react';
import { fireEvent, render as testingRender, waitFor } from '@testing-library/react';
import { CalendarProvider, calendarContextDefaultValue, type CalendarContextValue } from '../../../calendar';
import { isConformant } from '../../../testing/isConformant';
import { CalendarMonth } from './CalendarMonth';
import type { CalendarYearHandle } from '../CalendarYear';

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, ...contextValue }}>{children}</CalendarProvider>
    ),
  });

describe('CalendarMonth', () => {
  isConformant({
    Component: CalendarMonth,
    displayName: 'CalendarMonth',
    // The ref is an imperative focus handle, not a DOM node.
    disabledTests: [
      'has-top-level-file-extra',
      'consistent-callback-args',
      'component-handles-ref',
      'component-has-root-ref',
    ],
  });

  it('keeps one roving tab stop and updates it when focus moves', () => {
    const { container } = render(<CalendarMonth navigatedDate={new Date(2020, 8, 18)} />);
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid.getAttribute('focusgroup')).toBeNull();
    expect(grid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    fireEvent.focus(grid.querySelectorAll<HTMLElement>('[role="gridcell"]')[1]);
    expect(grid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(grid.querySelectorAll('[role="gridcell"][tabindex="-1"]')).toHaveLength(11);
  });

  it('preserves a single remembered tab stop when the navigated month changes', () => {
    const { container, getByRole, rerender } = render(<CalendarMonth navigatedDate={new Date(2020, 8, 18)} />);
    getByRole('gridcell', { name: 'October' }).focus();

    rerender(<CalendarMonth navigatedDate={new Date(2020, 10, 18)} />);

    expect(getByRole('gridcell', { name: 'October' })).toHaveFocus();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'October' }).tabIndex).toBe(0);
  });

  it('falls back to an available month when the remembered month becomes disabled', () => {
    const picker = (minDate?: Date) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, minDate }}>
        <CalendarMonth navigatedDate={new Date(2020, 8, 18)} />
      </CalendarProvider>
    );
    const { container, getByRole, rerender } = testingRender(picker());
    getByRole('gridcell', { name: 'October' }).focus();

    rerender(picker(new Date(2020, 10, 1)));

    expect(getByRole('gridcell', { name: 'October' })).toBeDisabled();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'November' }).tabIndex).toBe(0);
  });

  it('swaps in the headless year picker from its header', () => {
    const selectedDate = new Date(2020, 8, 18);
    const { container } = render(<CalendarMonth navigatedDate={selectedDate} />, { value: selectedDate });

    fireEvent.click(container.querySelector('button')!);

    expect(container.textContent).toContain('2020 - 2031');
    expect(container.querySelector('[role="grid"]')!.getAttribute('focusgroup')).toBeNull();
  });

  it('exposes month state as data attributes', () => {
    const today = new Date(2020, 8, 18);
    const { container } = render(<CalendarMonth navigatedDate={today} />, {
      highlightCurrent: true,
      highlightSelected: true,
      today,
      value: today,
    });

    expect(container.querySelector('[data-current]')).not.toBeNull();
    expect(container.querySelector('[data-selected]')).not.toBeNull();
  });

  it('preserves year focus restoration with a consumer picker ref', async () => {
    const yearRef = React.createRef<CalendarYearHandle>();
    const selectedDate = new Date(2020, 8, 18);
    const { getByRole } = render(<CalendarMonth navigatedDate={selectedDate} yearPicker={{ ref: yearRef }} />, {
      value: selectedDate,
    });

    fireEvent.click(getByRole('button', { name: '2020, change year' }));

    expect(yearRef.current?.focus).toBeInstanceOf(Function);
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const navigatedDate = new Date(2020, 8, 18);
    const defaultGrid = render(<CalendarMonth navigatedDate={navigatedDate} />);
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<CalendarMonth navigatedDate={navigatedDate} grid={{ children: null }} />);
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });
});
