import { useCalendarYearStyles_unstable } from './useCalendarYearStyles.styles.css';
import type { CalendarYearState } from './CalendarYear.types';
jest.mock('../../hooks/CalendarItem.module.css', () => ({
  buttonRow: 'css-buttonRow',
  disabled: 'css-disabled',
  highlightCurrent: 'css-highlightCurrent',
  highlightSelected: 'css-highlightSelected',
  itemButton: 'css-itemButton',
}));
jest.mock('../../hooks/CalendarPicker.module.css', () => ({
  grid: 'css-grid',
  hasHeaderClickCallback: 'css-hasHeaderClickCallback',
  header: 'css-header',
  heading: 'css-heading',
  navigation: 'css-navigation',
  navigationButton: 'css-navigationButton',
  normalize: 'css-normalize',
  root: 'css-root',
}));
jest.mock('../../contexts/calendarContext', () => ({
  ['useCalendarContext_unstable']: jest.fn(
    (selector: (value: { highlightCurrent: boolean; highlightSelected: boolean }) => unknown) =>
      selector({ highlightCurrent: true, highlightSelected: true }),
  ),
}));

describe('useCalendarYearStyles_unstable (CSS Modules)', () => {
  it('maps slots and state while preserving caller classes', () => {
    const state = {
      root: { className: 'caller-root' },
      header: {},
      heading: {},
      navigation: {},
      grid: {},
      previousRangeButton: {},
      nextRangeButton: {},
      hasHeaderClickCallback: true,
      yearRows: [{ props: {}, cells: [{ props: {}, isCurrent: true, isSelected: true, isDisabled: true }] }],
    } as unknown as CalendarYearState;
    expect(useCalendarYearStyles_unstable(state)).toBe(state);
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.yearRows[0].props.className).toContain('css-buttonRow');
    expect(state.yearRows[0].cells[0].props.className).toContain(
      'css-itemButton css-highlightCurrent css-highlightSelected css-disabled',
    );
  });
});
