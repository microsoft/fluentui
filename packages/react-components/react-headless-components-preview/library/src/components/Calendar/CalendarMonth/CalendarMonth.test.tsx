import * as React from 'react';
import { fireEvent, render as testingRender, waitFor } from '@testing-library/react';
import {
  CalendarProvider,
  calendarContextDefaultValue,
  type CalendarContextValue,
} from '@fluentui/react-calendar-preview';
import { isConformant } from '../../../testing/isConformant';
import { CalendarMonthGridRow } from '../CalendarMonthGridRow';
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

  it('preserves null grid and row children while rendering defaults when omitted', () => {
    const navigatedDate = new Date(2020, 8, 18);
    const defaultGrid = render(<CalendarMonth navigatedDate={navigatedDate} />);
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<CalendarMonth navigatedDate={navigatedDate} grid={{ children: null }} />);
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);

    const defaultRow = render(
      <CalendarMonth navigatedDate={navigatedDate} grid={{ children: <CalendarMonthGridRow rowIndex={0} /> }} />,
    );
    expect(defaultRow.container.querySelectorAll('[role="gridcell"]')).toHaveLength(4);

    const emptyRow = render(
      <CalendarMonth
        navigatedDate={navigatedDate}
        grid={{ children: <CalendarMonthGridRow rowIndex={0} children={null} /> }}
      />,
    );
    expect(emptyRow.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });
});
