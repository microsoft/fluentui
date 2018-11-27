import { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import { normalize, FontSizes, getFocusStyle } from '@uifabric/styling';

export const styles = (props: ICalendarStyleProps): ICalendarStyles => {
  const { className, theme, isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = props;
  const { palette } = theme;

  let totalWidth = isDayPickerVisible && isMonthPickerVisible ? 440 : 220;
  if (showWeekNumbers) {
    totalWidth += 30;
  }

  return {
    root: [
      normalize,
      {
        display: 'flex',
        width: totalWidth
      },
      !isMonthPickerVisible && {
        flexDirection: 'column'
      },
      className
    ],
    divider: {
      top: 0,
      borderRight: '1px solid',
      borderColor: palette.neutralLight
    },
    monthPickerWrapper: [
      {
        display: 'flex',
        flexDirection: 'column'
      }
    ],
    goTodayButton: [
      getFocusStyle(theme, -1, 'relative'),
      {
        bottom: 0,
        color: palette.neutralPrimary,
        height: 30,
        lineHeight: 30,
        backgroundColor: 'transparent',
        border: 'none',
        boxSizing: 'content-box',
        padding: '0 4px',
        alignSelf: 'flex-end',
        marginRight: 16,
        fontSize: FontSizes.small,
        selectors: {
          '& div': {
            fontSize: FontSizes.small
          },
          '&:hover': {
            color: palette.themePrimary,
            backgroundColor: 'transparent',
            cursor: 'pointer'
          },
          '&:active': {
            color: palette.themeDark
          }
        }
      }
    ]
  };
};
