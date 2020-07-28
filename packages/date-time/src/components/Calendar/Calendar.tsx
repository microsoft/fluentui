import { styled } from '@uifabric/utilities';
import { CalendarBase } from './Calendar.base';
import { styles } from './Calendar.styles';

/**
 * Calendar description
 */
export const Calendar = styled(CalendarBase, styles, undefined, {
  scope: 'Calendar',
});
