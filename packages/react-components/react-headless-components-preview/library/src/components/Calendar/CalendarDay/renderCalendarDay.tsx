import * as React from 'react';
import { renderCalendarDay_unstable } from '@fluentui/react-calendar-preview';
import type { JSXElement } from '@fluentui/react-utilities';
import { CalendarDayFocusTargetContext } from '../calendarGridTabStop';
import type { CalendarDayContextValues, CalendarDayState } from './CalendarDay.types';

/**
 * Render CalendarDay with the navigated date used by its roving tab stop.
 */
export const renderCalendarDay = (state: CalendarDayState, contextValues: CalendarDayContextValues): JSXElement => (
  <CalendarDayFocusTargetContext.Provider value={state.focusTargetDate?.toDateString()}>
    {renderCalendarDay_unstable(state, contextValues)}
  </CalendarDayFocusTargetContext.Provider>
);
