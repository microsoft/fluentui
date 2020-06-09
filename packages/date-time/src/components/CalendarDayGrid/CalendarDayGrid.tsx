import * as React from 'react';
import { ICalendarDayGridProps, ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { CalendarDayGridBase } from './CalendarDayGrid.base';
import { styles } from './CalendarDayGrid.styles';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

/**
 * CalendarDayGrid description
 */
export const CalendarDayGrid: React.FunctionComponent<ICalendarDayGridProps> = styled<
  ICalendarDayGridProps,
  ICalendarDayGridStyleProps,
  ICalendarDayGridStyles
>(CalendarDayGridBase, styles, undefined, { scope: 'CalendarDayGrid' });
