import { useCalendarDayStyles_unstable } from './useCalendarDayStyles.styles.css';
jest.mock('./CalendarDay.module.css', () => ({
  disabledStyle: 'css-disabledStyle',
  header: 'css-header',
  headerIconButton: 'css-headerIconButton',
  monthAndYear: 'css-monthAndYear',
  monthAndYearHeaderIsClickable: 'css-monthAndYearHeaderIsClickable',
  monthComponents: 'css-monthComponents',
  normalize: 'css-normalize',
  root: 'css-root',
  rootShowWeekNumbers: 'css-rootShowWeekNumbers',
}));

describe('useCalendarDayStyles_unstable (CSS Modules)', () => {
  it('returns the stable slot contracts and preserves caller classes', () => {
    const classes = useCalendarDayStyles_unstable({
      className: 'caller-root',
      headerIsClickable: true,
      showWeekNumbers: true,
    });
    expect(Object.values(classes).every(value => typeof value === 'string')).toBe(true);
    expect(classes.root.endsWith('caller-root')).toBe(true);
    expect(classes.root).toContain('css-rootShowWeekNumbers');
    expect(classes.monthAndYear).toContain('css-monthAndYearHeaderIsClickable');
  });
  it('omits inactive state styles by default', () => {
    const classes = useCalendarDayStyles_unstable({});
    expect(classes.root).not.toContain('ShowWeekNumbers');
  });
});
