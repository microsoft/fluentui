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

  it('provides a single roving tab stop without focusgroup', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('table')!.getAttribute('focusgroup')).toBeNull();
    expect(container.querySelectorAll('td[role="gridcell"][tabindex="0"]')).toHaveLength(1);
  });

  it('preserves a single remembered tab stop when the navigated date changes', () => {
    const { container, rerender } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);
    const remembered = container.querySelector<HTMLElement>('td:has(button[aria-label="September 19, 2020"])')!;
    remembered.focus();

    rerender(<CalendarDay navigatedDate={new Date(2020, 8, 20)} />);

    expect(remembered).toHaveFocus();
    expect(container.querySelectorAll('td[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(remembered.tabIndex).toBe(0);
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

  it('preserves null body children while rendering defaults when omitted', () => {
    const navigatedDate = new Date(2020, 8, 18);
    const defaultBody = render(<CalendarDay navigatedDate={navigatedDate} />);
    expect(defaultBody.container.querySelector('tbody')!.children.length).toBeGreaterThan(0);

    const emptyBody = render(<CalendarDay navigatedDate={navigatedDate} body={{ children: null }} />);
    expect(emptyBody.container.querySelector('tbody')!.children).toHaveLength(0);
  });
});
