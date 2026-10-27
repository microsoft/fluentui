import { useCalendarDayGridStyles_unstable } from './useCalendarDayGridStyles.styles.css';
jest.mock('./CalendarDayGrid.module.css', () => ({
  cornerBorderAndRadiusCorners: 'css-cornerBorderAndRadiusCorners',
  dayButton: 'css-dayButton',
  dayCell: 'css-dayCell',
  dayCellFocusIndicator: 'css-dayCellFocusIndicator',
  dayIsToday: 'css-dayIsToday',
  dayMarker: 'css-dayMarker',
  dayOutsideBounds: 'css-dayOutsideBounds',
  dayOutsideNavigatedMonthLightenDaysOutsideNavigatedMonth:
    'css-dayOutsideNavigatedMonthLightenDaysOutsideNavigatedMonth',
  daySelected: 'css-daySelected',
  daySingleSelected: 'css-daySingleSelected',
  dayTodayMarker: 'css-dayTodayMarker',
  firstTransitionWeek: 'css-firstTransitionWeek',
  'fui-CalendarDayGrid__bottomLeftCornerDate': 'css-fui-CalendarDayGrid__bottomLeftCornerDate',
  'fui-CalendarDayGrid__bottomRightCornerDate': 'css-fui-CalendarDayGrid__bottomRightCornerDate',
  'fui-CalendarDayGrid__dayButton': 'css-fui-CalendarDayGrid__dayButton',
  'fui-CalendarDayGrid__dayMarker': 'css-fui-CalendarDayGrid__dayMarker',
  'fui-CalendarDayGrid__dayTodayMarker': 'css-fui-CalendarDayGrid__dayTodayMarker',
  'fui-CalendarDayGrid__hoverStyle': 'css-fui-CalendarDayGrid__hoverStyle',
  'fui-CalendarDayGrid__pressedStyle': 'css-fui-CalendarDayGrid__pressedStyle',
  'fui-CalendarDayGrid__topLeftCornerDate': 'css-fui-CalendarDayGrid__topLeftCornerDate',
  'fui-CalendarDayGrid__topRightCornerDate': 'css-fui-CalendarDayGrid__topRightCornerDate',
  lastTransitionWeek: 'css-lastTransitionWeek',
  table: 'css-table',
  tableShowWeekNumbers: 'css-tableShowWeekNumbers',
  weekDayLabelCell: 'css-weekDayLabelCell',
  weekNumberCell: 'css-weekNumberCell',
  weekRow: 'css-weekRow',
  wrapper: 'css-wrapper',
}));

describe('useCalendarDayGridStyles_unstable (CSS Modules)', () => {
  it('returns the stable slot contracts and preserves caller classes', () => {
    const classes = useCalendarDayGridStyles_unstable({
      className: 'caller-root',
      lightenDaysOutsideNavigatedMonth: true,
      showWeekNumbers: true,
    });
    expect(Object.values(classes).every(value => typeof value === 'string')).toBe(true);
    expect(classes.table).toContain('css-tableShowWeekNumbers');
    expect(classes.dayOutsideNavigatedMonth).toContain('css-dayOutsideNavigatedMonthLightenDaysOutsideNavigatedMonth');
    expect(classes.dayCell).toContain('css-dayCellFocusIndicator');
  });
  it('omits inactive state styles by default', () => {
    const classes = useCalendarDayGridStyles_unstable({});
    expect(classes.table).not.toContain('ShowWeekNumbers');
  });
});
