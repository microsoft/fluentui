'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { DAYS_IN_WEEK, getDayIndex } from '../../utils';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarDayContext_unstable } from '../../contexts/calendarDayContext';
import { CalendarDayGridHeaderCell } from '../CalendarDayGridHeaderCell/CalendarDayGridHeaderCell';
import type {
  CalendarDayGridHeaderRowBaseProps,
  CalendarDayGridHeaderRowProps,
  CalendarDayGridHeaderRowState,
  CalendarWeekDayLabel,
} from './CalendarDayGridHeaderRow.types';

/**
 * Create the base state required to render an unstyled CalendarDayGridHeaderRow.
 */
export const useCalendarDayGridHeaderRowBase_unstable = (
  props: CalendarDayGridHeaderRowBaseProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridHeaderRowState => {
  const firstDayOfWeek = useCalendarContext_unstable(ctx => ctx.firstDayOfWeek);
  const formatDateTime = useCalendarContext_unstable(ctx => ctx.formatDateTime);
  const showWeekNumbers = useCalendarContext_unstable(ctx => ctx.showWeekNumbers);
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);
  const weeksToShow = useCalendarDayContext_unstable(ctx => ctx.weeksToShow);

  const weekdayDates = Array.from({ length: DAYS_IN_WEEK }, (_, index) => new Date(2020, 0, 5 + index));
  const shortDays = weekdayDates.map(date => formatDateTime(date, 'shortWeekday'));
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);

  let firstOfMonthIndex = -1;
  const firstWeekOfMonth = weeks[1];
  for (let i = 0; i < firstWeekOfMonth.length; i++) {
    if (firstWeekOfMonth[i].originalDate.getDate() === 1) {
      firstOfMonthIndex = i;
      break;
    }
  }

  if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
    // if we only show one week, replace the header with short month name
    const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeekIndex) % DAYS_IN_WEEK;
    shortDays[firstOfMonthIndexOffset] = formatDateTime(firstWeekOfMonth[firstOfMonthIndex].originalDate, 'shortMonth');
  }

  const dayLabels: CalendarWeekDayLabel[] = shortDays.map((_, index: number) => {
    const i = (index + firstDayOfWeekIndex) % DAYS_IN_WEEK;

    return {
      content: shortDays[i],
      label: formatDateTime(weekdayDates[i], 'weekday'),
      key: shortDays[i] + ' ' + index,
    };
  });

  return {
    dayLabels,
    components: {
      root: 'tr',
      weekNumberSpacerCell: 'th',
    },
    root: slot.always(getIntrinsicElementProps('tr', { ref, ...props }), { elementType: 'tr' }),
    weekNumberSpacerCell: slot.optional(showWeekNumbers ? props.weekNumberSpacerCell ?? {} : undefined, {
      elementType: 'th',
    }),
  };
};

/**
 * Create the state required to render CalendarDayGridHeaderRow.
 */
export const useCalendarDayGridHeaderRow_unstable = (
  props: CalendarDayGridHeaderRowProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridHeaderRowState => {
  const state = useCalendarDayGridHeaderRowBase_unstable(props, ref);

  return {
    ...state,
    root: slot.always(state.root, {
      defaultProps: {
        children: state.dayLabels.map((dayLabel: CalendarWeekDayLabel) => (
          /*
           * Plain list key, not a `replayKey`: day labels are stable across navigation so the fade
           * plays once on mount. The only remount is in single-week view, when a label is swapped
           * for a short month name.
           */
          <CalendarDayGridHeaderCell key={dayLabel.key} dayLabel={dayLabel} labelMotion={props.labelMotion} />
        )),
      },
      elementType: 'tr',
    }),
  };
};
