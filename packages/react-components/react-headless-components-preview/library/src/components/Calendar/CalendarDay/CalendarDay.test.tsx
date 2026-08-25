import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { CalendarDay } from './CalendarDay';

describe('CalendarDay', () => {
  isConformant({
    Component: CalendarDay,
    displayName: 'CalendarDay',
    // The ref is an imperative focus handle, not a DOM node.
    disabledTests: [
      'has-top-level-file-extra',
      'consistent-callback-args',
      'component-handles-ref',
      'component-has-root-ref',
    ],
  });

  it('renders its day grid through the grid slot', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} grid={{ id: 'custom-grid' }} />);

    const grid = container.querySelector('table[role="grid"]')!;
    expect(grid.id).toBe('custom-grid');
  });

  it('renders no navigation icons, since icons are a styled concern', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('svg')).toBeNull();
  });

  it('opts into native roving focus with focusgroup', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('table')!.getAttribute('focusgroup')).toBe('grid manual rowflow');
  });

  it('renders its rows without motion wrappers', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    Array.from(container.querySelector('tbody')!.children).forEach(child => {
      expect(child.tagName).toBe('TR');
    });
  });

  // Those rows are hidden filler that only the styled slide animation needs. Rendering them here
  // would show two bogus weeks, since the headless layer has no CSS to hide them.
  it('omits the animation transition rows', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelectorAll('tr[aria-hidden="true"]')).toHaveLength(0);
    // Weekday header row plus the weeks of the month, and nothing else.
    expect(container.querySelectorAll('tbody > tr')).toHaveLength(6);
  });
});
