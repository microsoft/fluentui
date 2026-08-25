'use client';

import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridCellState, CalendarDayGridCellSlots } from './CalendarDayGridCell.types';

/**
 * Class names for calendarDayGridCell slots.
 */

export const calendarDayGridCellClassNames: SlotClassNames<CalendarDayGridCellSlots> = {
  root: 'fui-CalendarDayGridCell',
  button: 'fui-CalendarDayGridCell__button',
  marker: 'fui-CalendarDayGridCell__marker',
  dayLabel: 'fui-CalendarDayGridCell__dayLabel',
};

/**
 * Shared with the weekday header cells, which sit in the same grid columns.
 */
export const useCalendarDayGridCellBaseStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    margin: '0',
    padding: '2px',
    position: 'relative',
    '@media (forced-colors: active)': {
      backgroundColor: 'Window',
      color: 'WindowText',
    },

    '&[data-range-hovered]': {
      color: tokens.colorNeutralForeground1Static,
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      '@media (forced-colors: active)': {
        outline: '1px solid Highlight',
        zIndex: 3,
        [`&[data-today] .${calendarDayGridCellClassNames.dayLabel}`]: {
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

    [`& > .${calendarDayGridCellClassNames.marker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },
  },
});

const useSingleSelectedStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground1Static,

    [`& > .${calendarDayGridCellClassNames.marker}`]: {
      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
      },
    },

    [`& > .${calendarDayGridCellClassNames.button}`]: {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      borderRadius: tokens.borderRadiusMedium,
      border: `1px solid ${tokens.colorBrandStroke1}`,
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

    [`& > .${calendarDayGridCellClassNames.marker}`]: {
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
    bottom: '1px',
    height: '4px',
    left: 0,
    margin: 'auto',

    position: 'absolute',
    right: 0,
    width: '4px',

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

/**
 * Apply styling to the CalendarDayGridCell slots based on the state.
 */
export const useCalendarDayGridCellStyles_unstable = (state: CalendarDayGridCellState): CalendarDayGridCellState => {
  'use no memo'; // justified: compiler would optimize useCalendarDayGridCellStyles_unstable — manual opt-out to preserve runtime behavior

  const baseStyles = useCalendarDayGridCellBaseStyles();
  const selectedStyles = useSelectedStyles();
  const singleSelectedStyles = useSingleSelectedStyles();
  const outsideBoundsStyles = useOutsideBoundsStyles();
  const outsideNavigatedMonthStyles = useOutsideNavigatedMonthStyles();
  const buttonStyles = useButtonStyles();
  const todayStyles = useTodayStyles();
  const todayMarkerStyles = useTodayMarkerStyles();
  const markerStyles = useMarkerStyles();
  const cornerBorderAndRadiusStyles = useCornerBorderAndRadiusStyles();

  const { day, lightenDaysOutsideNavigatedMonth } = state;

  /* eslint-disable react-hooks/immutability */
  /*
   * Applied after the slot resolves so a consumer's `dayCell` props extend the cell rather than
   * replacing its class names or misrepresenting its state.
   */
  state.root.className = mergeClasses(
    calendarDayGridCellClassNames.root,
    baseStyles.base,
    baseStyles.focusIndicator,
    cornerBorderAndRadiusStyles.corners,
    day.isSelected && !day.isSingleSelected && selectedStyles.base,
    day.isSingleSelected && singleSelectedStyles.base,
    !day.isInBounds && outsideBoundsStyles.base,
    !day.isInMonth && lightenDaysOutsideNavigatedMonth && outsideNavigatedMonthStyles.lightenDaysOutsideNavigatedMonth,
    state.root.className,
  );

  state.button.className = mergeClasses(
    calendarDayGridCellClassNames.button,
    buttonStyles.base,
    day.isToday && todayStyles.base,
    state.button.className,
  );

  state.dayLabel.className = mergeClasses(
    calendarDayGridCellClassNames.dayLabel,
    day.isToday && todayMarkerStyles.base,
    state.dayLabel.className,
  );

  if (state.marker) {
    state.marker.className = mergeClasses(
      calendarDayGridCellClassNames.marker,
      markerStyles.base,
      state.marker.className,
    );
  }
  /* eslint-enable react-hooks/immutability */

  return state;
};
