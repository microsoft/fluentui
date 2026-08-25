import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: ['consistent-callback-args'],
  });

  it('renders the day grid and the month picker', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('drives roving focus with focusgroup rather than Tabster', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const dayGrid = container.querySelector('table[role="grid"]')!;
    expect(dayGrid.getAttribute('focusgroup')).toBe('grid manual rowflow');

    const monthGrid = container.querySelector('div[role="grid"]')!;
    expect(monthGrid.getAttribute('focusgroup')).toBe('grid manual');
  });

  it('emits no Griffel styles of its own', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    // Griffel atomic classes are the actual CSS payload. The headless layer must carry none.
    container.querySelectorAll('[class]').forEach(el => {
      expect(el.className).not.toMatch(/___/);
    });
  });

  it('emits no styled class names at all', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    // Week-corner rounding is expressed as `data-corner-*` state rather than `fui-*` marker
    // classes, so the headless output carries no styled vocabulary.
    const leaked = new Set<string>();
    container.querySelectorAll('[class]').forEach(el => {
      el.className
        .split(/\s+/)
        .filter(name => name.startsWith('fui-'))
        .forEach(name => leaked.add(name));
    });

    expect([...leaked]).toEqual([]);
  });

  it('exposes week-corner rounding through data attributes', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const corners = container.querySelectorAll(
      'td[data-corner-top-left], td[data-corner-top-right], td[data-corner-bottom-left], td[data-corner-bottom-right]',
    );

    expect(corners.length).toBeGreaterThan(0);
  });

  it('exposes day state through data attributes', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} />);

    expect(container.querySelector('td[data-selected]')).not.toBeNull();
    expect(container.querySelector('td[data-today]')).not.toBeNull();
    expect(container.querySelector('td[data-outside-month]')).not.toBeNull();
  });

  it('renders the pickers through slots, so they can be customized', () => {
    const { container } = render(
      <Calendar value={new Date(2020, 8, 18)} showWeekNumbers isMonthPickerVisible={false} />,
    );

    expect(container.querySelector('th[scope="row"]')).not.toBeNull();
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(1);
  });
});
