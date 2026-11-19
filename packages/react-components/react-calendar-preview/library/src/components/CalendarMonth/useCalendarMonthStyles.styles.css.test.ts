import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles.styles.css';
import type { CalendarMonthState } from './CalendarMonth.types';
jest.mock('./CalendarMonth.module.css', () => ({ embeddedYearPicker: 'css-embeddedYearPicker' }));
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

describe('useCalendarMonthStyles_unstable (CSS Modules)', () => {
  it('maps slots and state while preserving caller classes', () => {
    const state = {
      root: { className: 'caller-root' },
      header: {},
      heading: {},
      navigation: {},
      grid: {},
      previousYearButton: {},
      nextYearButton: {},
      yearPicker: {},
      headerIsClickable: true,
      monthRows: [{ props: {}, cells: [{ props: {}, isCurrent: true, isSelected: true, isDisabled: true }] }],
    } as unknown as CalendarMonthState;
    expect(useCalendarMonthStyles_unstable(state)).toBe(state);
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.monthRows[0].props.className).toContain('css-buttonRow');
    expect(state.monthRows[0].cells[0].props.className).toContain(
      'css-itemButton css-highlightCurrent css-highlightSelected css-disabled',
    );
  });
});
