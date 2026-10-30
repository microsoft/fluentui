import { useCalendarDayStyles_unstable } from './useCalendarDayStyles.styles.css';
import type { CalendarDayState } from './CalendarDay.types';
jest.mock('./CalendarDay.module.css', () => ({
  button: 'css-button',
  cellBase: 'css-cellBase',
  cellBaseFocusIndicator: 'css-cellBaseFocusIndicator',
  cornerBorderAndRadiusCorners: 'css-cornerBorderAndRadiusCorners',
  disabledStyle: 'css-disabledStyle',
  'fui-CalendarDayGridCell__button': 'css-fui-CalendarDayGridCell__button',
  'fui-CalendarDayGridCell__dayLabel': 'css-fui-CalendarDayGridCell__dayLabel',
  'fui-CalendarDayGridCell__marker': 'css-fui-CalendarDayGridCell__marker',
  grid: 'css-grid',
  header: 'css-header',
  headerIconButton: 'css-headerIconButton',
  marker: 'css-marker',
  monthAndYear: 'css-monthAndYear',
  monthAndYearHeaderIsClickable: 'css-monthAndYearHeaderIsClickable',
  monthComponents: 'css-monthComponents',
  normalize: 'css-normalize',
  outsideBounds: 'css-outsideBounds',
  outsideNavigatedMonthLightenDaysOutsideNavigatedMonth: 'css-outsideNavigatedMonthLightenDaysOutsideNavigatedMonth',
  root: 'css-root',
  selected: 'css-selected',
  showWeekNumbers: 'css-showWeekNumbers',
  singleSelected: 'css-singleSelected',
  today: 'css-today',
  todayMarker: 'css-todayMarker',
  'transition-first': 'css-transition-first',
  'transition-last': 'css-transition-last',
  weekNumberCell: 'css-weekNumberCell',
  weekRow: 'css-weekRow',
  weekdayCell: 'css-weekdayCell',
}));

describe('useCalendarDayStyles_unstable (CSS Modules)', () => {
  it('maps slots and state while preserving caller classes', () => {
    const state = {
      root: { className: 'caller-root' },
      header: {},
      grid: {},
      heading: {},
      navigation: {},
      previousMonthButton: {},
      nextMonthButton: {},
      headerIsClickable: true,
      showWeekNumbers: true,
      lightenDaysOutsideNavigatedMonth: true,
      weekdayRow: { props: {}, weekNumberSpacer: {}, cells: [{ props: {} }] },
      weeks: [
        {
          props: {},
          transition: 'first',
          weekNumber: {},
          days: [
            {
              props: { className: 'caller-day' },
              button: {},
              label: {},
              marker: {},
              isSelected: true,
              isSingleSelected: true,
              isToday: true,
            },
          ],
        },
      ],
    } as unknown as CalendarDayState;
    expect(useCalendarDayStyles_unstable(state)).toBe(state);
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-showWeekNumbers');
    expect(state.grid.className).not.toContain('css-showWeekNumbers');
    expect(state.weeks[0].props.className).toContain('css-transition-first');
    expect(state.weeks[0].days[0].props.className).toContain('css-singleSelected');
    expect(state.weeks[0].days[0].props.className).toContain('caller-day');
    expect(state.weeks[0].days[0].button.className).toContain('css-today');
    expect(state.weeks[0].days[0].label.className).toContain('css-todayMarker');
  });
});
