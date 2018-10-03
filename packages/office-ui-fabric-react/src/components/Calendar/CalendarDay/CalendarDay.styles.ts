import { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IStyle, normalize, FontSizes } from '../../../Styling';

export const styles = (props: ICalendarDayStyleProps): ICalendarDayStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  const CalendarDayEvent: IStyle = {
    color: palette.neutralSecondary,
    fontSize: FontSizes.icon,
    lineHeight: '18px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '9px'
  };

  return {
    root: [normalize, className],
  };
};
