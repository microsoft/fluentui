import * as React from 'react';
import { fireEvent, render as testingRender } from '@testing-library/react';
import { CalendarProvider, calendarContextDefaultValue, type CalendarContextValue } from '../../../calendar';
import { isConformant } from '../../../testing/isConformant';
import { CalendarYear } from './CalendarYear';

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, ...contextValue }}>{children}</CalendarProvider>
    ),
  });

describe('CalendarYear', () => {
  isConformant({
    Component: CalendarYear,
    displayName: 'CalendarYear',
    // The ref is an imperative focus handle, not a DOM node.
    disabledTests: [
      'has-top-level-file-extra',
      'consistent-callback-args',
      'component-handles-ref',
      'component-has-root-ref',
    ],
  });

  it('declares manual grid rows and the navigated year as the entry point', () => {
    const { container } = render(<CalendarYear />, { value: new Date(2020, 0, 1) });
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid).toHaveAttribute('focusgroup', 'grid manual');
    expect(grid.querySelectorAll('[focusgrouprow]')).toHaveLength(3);
    expect(grid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(12);
    expect(grid.querySelector('[focusgroupstart]')).toHaveTextContent('2020');
    fireEvent.focus(grid.querySelectorAll<HTMLElement>('[role="gridcell"]')[1]);
    expect(grid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(12);
  });

  it('updates the start marker without stealing focus when the navigated year changes', () => {
    const { container, getByRole, rerender } = render(<CalendarYear navigatedYear={2020} />);
    getByRole('gridcell', { name: '2022' }).focus();

    rerender(<CalendarYear navigatedYear={2021} />);

    expect(getByRole('gridcell', { name: '2022' })).toHaveFocus();
    expect(container.querySelectorAll('[focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2021' })).toHaveAttribute('focusgroupstart');
    expect(getByRole('gridcell', { name: '2022' }).tabIndex).toBe(0);
  });

  it('marks an available initial year when the navigated year becomes disabled', () => {
    const picker = (minDate?: Date) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, minDate }}>
        <CalendarYear navigatedYear={2020} />
      </CalendarProvider>
    );
    const { container, getByRole, rerender } = testingRender(picker());
    getByRole('gridcell', { name: '2022' }).focus();

    rerender(picker(new Date(2023, 0, 1)));

    expect(getByRole('gridcell', { name: '2022' })).toBeDisabled();
    expect(container.querySelectorAll('[focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2023' })).toHaveAttribute('focusgroupstart');
    expect(getByRole('gridcell', { name: '2023' }).tabIndex).toBe(0);
  });

  it('renders a range of twelve years', () => {
    const { container } = render(<CalendarYear />, { value: new Date(2020, 0, 1) });

    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);
  });

  it('exposes year state as data attributes', () => {
    const thisYear = new Date().getFullYear();
    const { container } = render(<CalendarYear />, {
      highlightCurrent: true,
      highlightSelected: true,
      maxDate: new Date(thisYear, 11, 31),
      value: new Date(thisYear, 0, 1),
    });

    expect(container.querySelector('[data-current]')).not.toBeNull();
    expect(container.querySelector('[data-selected]')).not.toBeNull();
    expect(container.querySelector('[data-outside-bounds]')).not.toBeNull();
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const defaultGrid = render(<CalendarYear />, { value: new Date(2020, 0, 1) });
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<CalendarYear grid={{ children: null }} />, { value: new Date(2020, 0, 1) });
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });
});
