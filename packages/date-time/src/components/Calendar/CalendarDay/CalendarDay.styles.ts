import { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { normalize, FontSizes, FontWeights, getFocusStyle, getGlobalClassNames } from '@uifabric/styling';
import { DateRangeType } from '../../../utilities/dateValues/DateValues';

const GlobalClassNames = {
  hoverStyle: 'ms-CalendarDay-hoverStyle',
  pressedStyle: 'ms-CalendarDay-pressedStyle'
};

export const styles = (props: ICalendarDayStyleProps): ICalendarDayStyles => {
  const { className, theme, headerIsClickable, dateRangeType, showWeekNumbers } = props;
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
    root: [
      normalize,
      {
        width: 196,
        padding: 12,
        boxSizing: 'content-box'
      },
      showWeekNumbers && {
        width: 226
      },
      className
    ],
    header: {
      position: 'relative',
      display: 'inline-flex',
      height: 28,
      lineHeight: 44,
      width: '100%'
    },
    monthAndYear: [
      getFocusStyle(theme, -1, 'relative'),
      {
        alignItems: 'center',
        fontSize: FontSizes.medium,
        color: palette.neutralPrimary,
        display: 'inline-flex',
        flexGrow: 1,
        fontWeight: FontWeights.semibold,
        padding: '0 4px 0 10px',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: 2
      },
      headerIsClickable && {
        selectors: {
          '&:hover': {
            cursor: 'pointer',
            background: palette.neutralLight,
            color: palette.black
          }
        }
      }
    ],
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
    monthComponents: {
      display: 'inline-flex',
      alignSelf: 'flex-end'
    },
    headerIconButton: [
      getFocusStyle(theme, -1, 'relative'),
      {
        width: 28,
        height: 28,
        display: 'block',
        textAlign: 'center',
        lineHeight: 28,
        fontSize: FontSizes.small,
        color: palette.neutralPrimary,
        borderRadius: 2,
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        selectors: {
          '&:hover': {
            color: palette.neutralDark,
            backgroundColor: palette.neutralLight,
            cursor: 'pointer',
            outline: '1px solid transparent'
          }
        }
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
      boxSizing: 'border-box',
      justifyContent: 'center',
      alignItems: 'center',
      selectors: {
        ['&.' + classNames.hoverStyle]: {
          backgroundColor: palette.neutralLight
        },
        ['&.' + classNames.pressedStyle]: {
          backgroundColor: palette.themeLight
        }
      }
    },
    daySelected: [
      dateRangeType !== DateRangeType.Month && {
        backgroundColor: palette.themeLight,
        selectors: {
          ['&:hover, &.' + classNames.hoverStyle + ', &.' + classNames.pressedStyle]: {
            backgroundColor: palette.themeLight
          }
        }
      }
    ],
    weekNumberCell: {
      borderRight: '1px solid',
      borderColor: palette.neutralLight,
      boxSizing: 'border-box',
      width: 28,
      height: 28,
      lineHeight: 28,
      margin: 0,
      fontWeight: FontWeights.regular,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    disabledStyle: disabledStyle,
    dayOutsideBounds: disabledStyle,
    dayOutsideNavigatedMonth: {
      color: palette.neutralSecondary,
      fontWeight: FontWeights.regular
    },
    dayButton: [
      getFocusStyle(theme, -2, 'relative'),
      {
        width: 24,
        height: 24,
        lineHeight: 24,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        padding: 0,
        backgroundColor: 'transparent',
        selectors: {
          span: {
            height: 'inherit',
            lineHeight: 'inherit'
          }
        }
      }
    ],
    dayIsToday: {
      backgroundColor: palette.themePrimary,
      color: palette.white,
      fontWeight: FontWeights.semibold
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
