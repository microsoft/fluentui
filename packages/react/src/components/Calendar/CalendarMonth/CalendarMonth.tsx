import { CalendarMonthBase } from './CalendarMonth.base';
import { getStyles } from './CalendarMonth.styles';
import { styled } from '../../../Utilities';

export const CalendarMonth = styled(CalendarMonthBase, getStyles, undefined, { scope: 'CalendarMonth' });
