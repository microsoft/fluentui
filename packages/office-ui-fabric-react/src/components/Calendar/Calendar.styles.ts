import { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import { normalize, FontSizes } from '../../Styling';

export const styles = (props: ICalendarStyleProps): ICalendarStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  return {
    root: [normalize, className],
    divider: {
      top: 0,
      marginTop: -12,
      marginBottom: -12,
      borderRight: '1px solid',
      borderColor: palette.neutralLight
    },
    goTodayButton: {
      bottom: 0,
      color: palette.neutralPrimary,
      height: 30,
      lineHeight: 30,
      backgroundColor: 'transparent',
      position: 'absolute',
      boxSizing: 'content-box',
      padding: 0,
      selectors: {
        '& div': {
          fontSize: FontSizes.small
        },
        '&:hover': {
          color: palette.themePrimary,
          backgroundColor: 'transparent',
        },
        '&:active': {
          color: palette.themeDark,
        }
      }
    }
  };
};
