import { normalize, FontSizes, getFocusStyle, HighContrastSelector } from '@fluentui/style-utilities';
import type { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';

export const styles = (props: ICalendarStyleProps): ICalendarStyles => {
  const { className, theme, isDayPickerVisible, isMonthPickerVisible, showWeekNumbers } = props;
  const { palette } = theme;

  let totalWidth = isDayPickerVisible && isMonthPickerVisible ? 440 : 220;
  if (showWeekNumbers && isDayPickerVisible) {
    totalWidth += 30;
  }

  return {
    root: [
      normalize,
      {
        display: 'flex',
        width: totalWidth,
      },
      !isMonthPickerVisible && {
        flexDirection: 'column',
      },
      className,
    ],
    divider: {
      top: 0,
      borderRight: '1px solid',
      borderColor: palette.neutralLight,
    },
    monthPickerWrapper: [
      {
        display: 'flex',
        flexDirection: 'column',
      },
    ],
    goTodayButton: [
      getFocusStyle(theme, { inset: -1 }),
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
        marginTop: 3,
        fontSize: FontSizes.small,
        fontFamily: 'inherit',
        overflow: 'visible', // explicitly specify for IE11
        selectors: {
          '& div': {
            fontSize: FontSizes.small,
          },
          '&:hover': {
            color: palette.themePrimary,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            selectors: {
              [HighContrastSelector]: {
                outline: '1px solid Buttontext',
                borderRadius: '2px',
              },
            },
          },
          '&:active': {
            color: palette.themeDark,
          },
          '&:disabled': {
            color: palette.neutralTertiaryAlt,
            pointerEvents: 'none',
          },
        },
      },
    ],
    liveRegion: {
      border: 0,
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      width: '1px',
      position: 'absolute',
    },
  };
};
