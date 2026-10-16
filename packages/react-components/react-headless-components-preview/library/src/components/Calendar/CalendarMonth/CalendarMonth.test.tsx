import * as React from 'react';
import { fireEvent, render as testingRender, waitFor } from '@testing-library/react';
import {
  CalendarProvider,
  calendarContextDefaultValue,
  type CalendarContextValue,
} from '@fluentui/react-calendar-preview';
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

  it('opts into native roving focus with focusgroup', () => {
    const { container } = render(<CalendarMonth navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('[role="grid"]')!.getAttribute('focusgroup')).toBe('toolbar inline');
  });

  it('swaps in the headless year picker from its header', () => {
    const selectedDate = new Date(2020, 8, 18);
    const { container } = render(<CalendarMonth navigatedDate={selectedDate} />, { value: selectedDate });

    fireEvent.click(container.querySelector('button')!);

    expect(container.textContent).toContain('2020 - 2031');
    // The year picker inherits the headless focusgroup, not Tabster.
    expect(container.querySelector('[role="grid"]')!.getAttribute('focusgroup')).toBe('toolbar inline');
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
});
