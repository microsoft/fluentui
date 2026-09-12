import * as React from 'react';
import { render as testingRender } from '@testing-library/react';
import {
  CalendarProvider,
  calendarContextDefaultValue,
  type CalendarContextValue,
} from '@fluentui/react-calendar-preview';
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

  it('opts into native roving focus with focusgroup', () => {
    const { container } = render(<CalendarYear />, { value: new Date(2020, 0, 1) });

    expect(container.querySelector('[role="grid"]')!.getAttribute('focusgroup')).toBe('grid manual');
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
});
