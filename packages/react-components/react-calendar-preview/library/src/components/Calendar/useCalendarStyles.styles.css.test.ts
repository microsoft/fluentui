import { useCalendarStyles_unstable } from './useCalendarStyles.styles.css';
import type { CalendarState } from './Calendar.types';
jest.mock('./Calendar.module.css', () => ({
  divider: 'css-divider',
  goTodayButton: 'css-goTodayButton',
  isDayPickerVisible: 'css-isDayPickerVisible',
  isMonthPickerVisible: 'css-isMonthPickerVisible',
  liveRegion: 'css-liveRegion',
  monthPickerWrapper: 'css-monthPickerWrapper',
  normalize: 'css-normalize',
  root: 'css-root',
  showWeekNumbers: 'css-showWeekNumbers',
}));

describe('useCalendarStyles_unstable (CSS Modules)', () => {
  it('maps slots and state while preserving caller classes', () => {
    const state = {
      root: { className: 'caller-root' },
      liveRegion: { className: 'caller-live' },
      divider: { className: 'caller-divider' },
      monthPickerWrapper: {},
      goToTodayButton: {},
      dayPicker: {},
      monthPicker: {},
      isDayPickerVisible: true,
      isMonthPickerVisible: true,
      showWeekNumbers: true,
    } as unknown as CalendarState;
    expect(useCalendarStyles_unstable(state)).toBe(state);
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-isDayPickerVisible css-isMonthPickerVisible css-showWeekNumbers');
    expect(state.liveRegion.className).toContain('css-liveRegion caller-live');
  });
  it('accepts absent optional slots without inventing state flags', () => {
    const state = { root: { className: 'caller' }, liveRegion: {} } as CalendarState;
    useCalendarStyles_unstable(state);
    expect(state.root.className).toBe('fui-Calendar css-root css-normalize caller');
    expect(state.liveRegion.className).toBe('fui-Calendar__liveRegion css-liveRegion');
  });
});
