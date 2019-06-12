import { ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { FontSizes, FontWeights, getFocusStyle, getGlobalClassNames } from '@uifabric/styling';
import { DateRangeType } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';

const GlobalClassNames = {
  hoverStyle: 'ms-CalendarDay-hoverStyle',
  pressedStyle: 'ms-CalendarDay-pressedStyle'
};

export const styles = (props: ICalendarDayGridStyleProps): ICalendarDayGridStyles => {
  const { theme, dateRangeType, showWeekNumbers, lightenDaysOutsideNavigatedMonth } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const disabledStyle = {
    selectors: {
      '&, &:disabled, & button': {
        color: palette.neutralTertiaryAlt,
        pointerEvents: 'none'
      }
    }
  };

  return {
    table: [
      {
        textAlign: 'center',
        borderCollapse: 'collapse',
        borderSpacing: '0',
        tableLayout: 'fixed',
        fontSize: 'inherit',
        marginTop: 4,
        width: 197
      },
      showWeekNumbers && {
        width: 226
      }
    ],
    dayCell: {
      margin: 0,
      padding: 0,
      width: 28,
      height: 28,
      lineHeight: 28,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
      color: palette.neutralPrimary,
      cursor: 'pointer',
      selectors: {
        ['&.' + classNames.hoverStyle]: {
          backgroundColor: palette.neutralLight
        },
        ['&.' + classNames.pressedStyle]: {
          backgroundColor: palette.themeLight,
          fontWeight: FontWeights.semibold
        }
      }
    },
    daySelected: [
      dateRangeType !== DateRangeType.Month && {
        backgroundColor: palette.themeLight + '!important',
        fontWeight: (FontWeights.semibold + '!important') as 'initial',
        selectors: {
          ['&:hover, &.' + classNames.hoverStyle + ', &.' + classNames.pressedStyle]: {
            backgroundColor: palette.themeLight + '!important',
            fontWeight: FontWeights.semibold as 'initial'
          }
        }
      }
    ],
    weekNumberCell: {
      margin: 0,
      padding: 0,
      borderRight: '1px solid',
      borderColor: palette.neutralLight,
      boxSizing: 'border-box',
      width: 28,
      height: 28,
      fontWeight: FontWeights.regular,
      fontSize: FontSizes.small
    },
    dayOutsideBounds: disabledStyle,
    dayOutsideNavigatedMonth: lightenDaysOutsideNavigatedMonth && {
      color: palette.neutralSecondary,
      fontWeight: FontWeights.regular
    },
    dayButton: [
      getFocusStyle(theme, { inset: -2 }),
      {
        width: 24,
        height: 24,
        lineHeight: 24,
        fontSize: FontSizes.small,
        fontWeight: 'inherit',
        borderRadius: 2,
        border: 'none',
        padding: 0,
        color: 'inherit',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        selectors: {
          span: {
            height: 'inherit',
            lineHeight: 'inherit'
          }
        }
      }
    ],
    dayIsToday: {
      backgroundColor: palette.themePrimary + '!important',
      color: palette.white + '!important',
      fontWeight: (FontWeights.semibold + '!important') as 'initial'
    },
    topRightCornerDate: {
      borderTopRightRadius: '2px'
    },
    topLeftCornerDate: {
      borderTopLeftRadius: '2px'
    },
    bottomRightCornerDate: {
      borderBottomRightRadius: '2px'
    },
    bottomLeftCornerDate: {
      borderBottomLeftRadius: '2px'
    }
  };
};
