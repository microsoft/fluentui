import { useCalendarStyles_unstable } from './useCalendarStyles.styles.css';
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
  it('returns the stable slot contracts and preserves caller classes', () => {
    const classes = useCalendarStyles_unstable({
      className: 'caller-root',
      isDayPickerVisible: true,
      isMonthPickerVisible: true,
      showWeekNumbers: true,
    });
    expect(Object.values(classes).every(value => typeof value === 'string')).toBe(true);
    expect(classes.root.endsWith('caller-root')).toBe(true);
    expect(classes.root).toContain('css-isDayPickerVisible css-isMonthPickerVisible css-showWeekNumbers');
  });
  it('omits inactive state styles by default', () => {
    const classes = useCalendarStyles_unstable({});
    expect(classes.root).not.toContain('ShowWeekNumbers');
  });
  it.each([
    [false, false, false],
    [false, false, true],
    [false, true, false],
    [false, true, true],
    [true, false, false],
    [true, false, true],
    [true, true, false],
    [true, true, true],
  ])('keeps visibility flags independent (%s, %s, %s)', (isDayPickerVisible, isMonthPickerVisible, showWeekNumbers) => {
    const classes = useCalendarStyles_unstable({ isDayPickerVisible, isMonthPickerVisible, showWeekNumbers });
    expect(classes.root.includes('css-isDayPickerVisible')).toBe(isDayPickerVisible);
    expect(classes.root.includes('css-isMonthPickerVisible')).toBe(isMonthPickerVisible);
    expect(classes.root.includes('css-showWeekNumbers')).toBe(showWeekNumbers);
  });
});
