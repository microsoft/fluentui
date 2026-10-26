'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { calendarGridWidth, calendarGridWidthWithWeekNumbers } from '../../utils/calendarDimensions';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDaySlots, CalendarDayState } from './CalendarDay.types';

export const calendarDayClassNames: SlotClassNames<CalendarDaySlots> = {
  root: 'fui-CalendarDay',
  header: 'fui-CalendarDay__header',
  heading: 'fui-CalendarDay__monthAndYear',
  navigation: 'fui-CalendarDay__monthComponents',
  previousMonthButton: 'fui-CalendarDay__previousMonthButton',
  nextMonthButton: 'fui-CalendarDay__nextMonthButton',
  closeButton: 'fui-CalendarDay__closeButton',
  grid: 'fui-CalendarDay__grid',
  body: 'fui-CalendarDay__body',
};

/**
 * Class names of the rows and cells rendered inside the day grid.
 */
export const calendarDayGridClassNames = {
  weekdayRow: 'fui-CalendarDayGridHeaderRow',
  weekNumberSpacerCell: 'fui-CalendarDayGridHeaderRow__weekNumberSpacerCell',
  weekdayCell: 'fui-CalendarDayGridHeaderCell',
  weekRow: 'fui-CalendarDayGridRow',
  weekNumberCell: 'fui-CalendarDayGridRow__weekNumberCell',
  dayCell: 'fui-CalendarDayGridCell',
  dayButton: 'fui-CalendarDayGridCell__button',
  dayLabel: 'fui-CalendarDayGridCell__dayLabel',
  marker: 'fui-CalendarDayGridCell__marker',
} as const;

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'content-box',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    width: calendarGridWidth,
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
  },
  showWeekNumbers: {
    width: calendarGridWidthWithWeekNumbers,
  },
});

const useHeaderStyles = makeStyles({
  base: {
    display: 'inline-flex',
    height: '28px',
    lineHeight: '44px',
    position: 'relative',
    width: '100%',
  },
});

const useGridStyles = makeStyles({
  base: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontSize: 'inherit',
    marginTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalMNudge,
    position: 'relative',
    tableLayout: 'fixed',
    textAlign: 'center',
    width: calendarGridWidth,
  },
  showWeekNumbers: {
    width: calendarGridWidthWithWeekNumbers,
  },
});

const useMonthAndYearStyles = makeStyles({
  base: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'inline-block',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: '28px',
    overflow: 'hidden',
    padding: `0 ${tokens.spacingHorizontalXS} 0 ${tokens.spacingHorizontalMNudge}`,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerIsClickable: {
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
      cursor: 'pointer',
      outline: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    },
  },
});

const useMonthComponentsStyles = makeStyles({
  base: {
    alignSelf: 'flex-end',
    display: 'inline-flex',
  },
});

const useHeaderIconButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground3,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    overflow: 'visible',
    padding: '0',
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
    },
  },
});

const useDisabledStyleStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',

      // add this explicitly for aria-disabled buttons that don't get default forced-colors disabled styles
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
  },
});

const useWeekRowStyles = makeStyles({
  base: {
    position: 'relative',
    ':focus-within': {
      zIndex: 1,
    },
  },
});

const useWeekNumberCellStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    height: '28px',
    margin: '0',
    padding: '0',
    width: '28px',
  },
});

const useTransitionStyles = makeStyles({
  /*
   * Overlaid out of flow and transparent at rest; `pointerEvents: 'none'` stops the invisible
   * overlay from intercepting clicks. The slide-out motion fades opacity 1 → 0, ending here.
   */
  first: {
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
  },
  last: {
    marginTop: '-28px',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
  },
});

/**
 * Shared with the weekday header cells, which sit in the same grid columns.
 */
const useCellBaseStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    margin: '0',
    padding: tokens.spacingHorizontalXXS,
    position: 'relative',
    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
    },

    '&[data-range-hovered]': {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      '@media (forced-colors: active)': {
        outline: `${tokens.strokeWidthThin} solid Highlight`,
        zIndex: 3,
        [`&[data-today] .${calendarDayGridClassNames.dayLabel}`]: {
          backgroundColor: 'Highlight',
        },
      },
    },

    '&[data-range-pressed]': {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        borderTopColor: 'Highlight',
        borderRightColor: 'Highlight',
        borderBottomColor: 'Highlight',
        borderLeftColor: 'Highlight',
        color: 'Highlight',
      },
    },
  },
  focusIndicator: createFocusOutlineStyle({
    style: {
      outlineWidth: tokens.strokeWidthThick,
    },
  }),
});

const useSelectedStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    color: tokens.colorNeutralForeground1Static,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      borderTopColor: 'Highlight',
      borderRightColor: 'Highlight',
      borderBottomColor: 'Highlight',
      borderLeftColor: 'Highlight',
      color: 'HighlightText',
      forcedColorAdjust: 'none',
    },

    '&:hover, &[data-range-hovered], &[data-range-pressed]': {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'HighlightText',
      },
    },

    [`& > .${calendarDayGridClassNames.marker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },
  },
});

const useSingleSelectedStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1Static,

    [`& > .${calendarDayGridClassNames.marker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },

    [`& > .${calendarDayGridClassNames.dayButton}`]: {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      borderRadius: tokens.borderRadiusMedium,
      border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke1}`,
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        borderTopColor: 'Highlight',
        borderRightColor: 'Highlight',
        borderBottomColor: 'Highlight',
        borderLeftColor: 'Highlight',
        color: 'HighlightText',
        forcedColorAdjust: 'none',
      },
    },
  },
});

const useOutsideBoundsStyles = makeStyles({
  base: {
    '&, &:disabled, & button, &[data-range-hovered], &[data-range-pressed]': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useOutsideNavigatedMonthStyles = makeStyles({
  lightenDaysOutsideNavigatedMonth: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightRegular,

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: 'inherit',
    height: '24px',
    lineHeight: '24px',
    overflow: 'visible',
    padding: '0',
    width: '24px',

    '&span': {
      height: 'inherit',
      lineHeight: 'inherit',
    },
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      borderRadius: tokens.borderRadiusMedium,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
    },
  },
});

const useTodayStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,

    [`& > .${calendarDayGridClassNames.marker}`]: {
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },
  },
});

const useTodayMarkerStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '100%',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      borderTopColor: 'WindowText',
      borderRightColor: 'WindowText',
      borderBottomColor: 'WindowText',
      borderLeftColor: 'WindowText',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
  },
});

const useMarkerStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandForeground2,
    borderRadius: '100%',
    bottom: tokens.strokeWidthThin,
    height: tokens.spacingVerticalXS,
    left: 0,
    margin: 'auto',

    position: 'absolute',
    right: 0,
    width: tokens.spacingHorizontalXS,

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      forcedColorAdjust: 'none',
    },
  },
});

const useCornerBorderAndRadiusStyles = makeStyles({
  corners: {
    [`&[data-corner-top-right]`]: {
      borderTopRightRadius: tokens.borderRadiusMedium,
    },
    [`&[data-corner-top-left]`]: {
      borderTopLeftRadius: tokens.borderRadiusMedium,
    },
    [`&[data-corner-bottom-right]`]: {
      borderBottomRightRadius: tokens.borderRadiusMedium,
    },
    [`&[data-corner-bottom-left]`]: {
      borderBottomLeftRadius: tokens.borderRadiusMedium,
    },
  },
});

const useWeekdayCellStyles = makeStyles({
  base: {
    userSelect: 'none',
  },
});

/**
 * Apply styling to the CalendarDay slots based on the state.
 */
export const useCalendarDayStyles_unstable = (state: CalendarDayState): CalendarDayState => {
  const rootStyles = useRootStyles();
  const headerStyles = useHeaderStyles();
  const gridStyles = useGridStyles();
  const monthAndYearStyles = useMonthAndYearStyles();
  const monthComponentsStyles = useMonthComponentsStyles();
  const headerIconButtonStyles = useHeaderIconButtonStyles();
  const disabledStyleStyles = useDisabledStyleStyles();
  const weekRowStyles = useWeekRowStyles();
  const weekNumberCellStyles = useWeekNumberCellStyles();
  const transitionStyles = useTransitionStyles();
  const cellBaseStyles = useCellBaseStyles();
  const weekdayCellStyles = useWeekdayCellStyles();
  const selectedStyles = useSelectedStyles();
  const singleSelectedStyles = useSingleSelectedStyles();
  const outsideBoundsStyles = useOutsideBoundsStyles();
  const outsideNavigatedMonthStyles = useOutsideNavigatedMonthStyles();
  const buttonStyles = useButtonStyles();
  const todayStyles = useTodayStyles();
  const todayMarkerStyles = useTodayMarkerStyles();
  const markerStyles = useMarkerStyles();
  const cornerStyles = useCornerBorderAndRadiusStyles();

  const { headerIsClickable, lightenDaysOutsideNavigatedMonth, nextMonthInBounds, prevMonthInBounds, showWeekNumbers } =
    state;

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarDayClassNames.root,
    rootStyles.normalize,
    rootStyles.base,
    showWeekNumbers && rootStyles.showWeekNumbers,
    state.root.className,
  );

  state.header.className = mergeClasses(calendarDayClassNames.header, headerStyles.base, state.header.className);

  state.grid.className = mergeClasses(
    calendarDayClassNames.grid,
    gridStyles.base,
    showWeekNumbers && gridStyles.showWeekNumbers,
    state.grid.className,
  );

  state.heading.className = mergeClasses(
    calendarDayClassNames.heading,
    monthAndYearStyles.base,
    headerIsClickable && monthAndYearStyles.headerIsClickable,
    state.heading.className,
  );

  state.navigation.className = mergeClasses(
    calendarDayClassNames.navigation,
    monthComponentsStyles.base,
    state.navigation.className,
  );

  state.previousMonthButton.className = mergeClasses(
    calendarDayClassNames.previousMonthButton,
    headerIconButtonStyles.base,
    !prevMonthInBounds && disabledStyleStyles.base,
    state.previousMonthButton.className,
  );

  state.nextMonthButton.className = mergeClasses(
    calendarDayClassNames.nextMonthButton,
    headerIconButtonStyles.base,
    !nextMonthInBounds && disabledStyleStyles.base,
    state.nextMonthButton.className,
  );

  if (state.closeButton) {
    state.closeButton.className = mergeClasses(
      calendarDayClassNames.closeButton,
      headerIconButtonStyles.base,
      state.closeButton.className,
    );
  }

  const { weekdayRow } = state;
  weekdayRow.props.className = calendarDayGridClassNames.weekdayRow;
  if (weekdayRow.weekNumberSpacer) {
    // The spacer cell sits in the same grid column as the week number cells, so it shares day cell metrics.
    weekdayRow.weekNumberSpacer.className = mergeClasses(
      calendarDayGridClassNames.weekNumberSpacerCell,
      cellBaseStyles.base,
    );
  }
  for (const cell of weekdayRow.cells) {
    cell.props.className = mergeClasses(
      calendarDayGridClassNames.weekdayCell,
      cellBaseStyles.base,
      weekdayCellStyles.base,
    );
  }

  for (const week of state.weeks) {
    week.props.className = mergeClasses(
      calendarDayGridClassNames.weekRow,
      weekRowStyles.base,
      week.transition && transitionStyles[week.transition],
    );
    if (week.weekNumber) {
      week.weekNumber.className = mergeClasses(calendarDayGridClassNames.weekNumberCell, weekNumberCellStyles.base);
    }
    for (const day of week.days) {
      // Consumer cell props from getDayCellProps extend the cell rather than replacing its class names.
      day.props.className = mergeClasses(
        calendarDayGridClassNames.dayCell,
        cellBaseStyles.base,
        cellBaseStyles.focusIndicator,
        cornerStyles.corners,
        day.isSelected && !day.isSingleSelected && selectedStyles.base,
        day.isSingleSelected && singleSelectedStyles.base,
        !day.isInBounds && outsideBoundsStyles.base,
        !day.isSelected &&
          !day.isInMonth &&
          lightenDaysOutsideNavigatedMonth &&
          outsideNavigatedMonthStyles.lightenDaysOutsideNavigatedMonth,
        day.props.className,
      );
      day.button.className = mergeClasses(
        calendarDayGridClassNames.dayButton,
        buttonStyles.base,
        day.isToday && todayStyles.base,
      );
      day.label.className = mergeClasses(calendarDayGridClassNames.dayLabel, day.isToday && todayMarkerStyles.base);
      if (day.marker) {
        day.marker.className = mergeClasses(calendarDayGridClassNames.marker, markerStyles.base);
      }
    }
  }
  /* eslint-enable react-hooks/immutability */
  return state;
};
