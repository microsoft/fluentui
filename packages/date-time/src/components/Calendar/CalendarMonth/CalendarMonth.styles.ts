import { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';
import { normalize, FontSizes, FontWeights, getFocusStyle } from '@uifabric/styling';

export const getStyles = (props: ICalendarMonthStyleProps): ICalendarMonthStyles => {
  const { className, theme, hasHeaderClickCallback, highlightCurrentMonth, highlightSelectedMonth } = props;
  const { palette } = theme;

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
      className
    ],
    headerContainer: {
      display: 'flex'
    },
    currentYearButton: [
      getFocusStyle(theme, -1, 'relative'),
      {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.semibold,
        textAlign: 'left',
        backgroundColor: 'transparent',
        flexGrow: 1,
        padding: '0 4px 0 10px',
        border: 'none'
      },
      hasHeaderClickCallback && {
        selectors: {
          '&:hover, &:active': {
            cursor: !hasHeaderClickCallback ? 'default' : 'pointer',
            color: palette.neutralDark,
            outline: '1px solid transparent',
            backgroundColor: palette.neutralLight
          }
        }
      }
    ],
    yearNavigationButtonsContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    yearNavigationButton: [
      getFocusStyle(theme, -1, 'relative'),
      {
        width: 28,
        minWidth: 28,
        height: 28,
        minHeight: 28,
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
            cursor: 'pointer',
            outline: '1px solid transparent',
            backgroundColor: palette.neutralLight
          }
        }
      }
    ],
    monthGridContainer: {
      marginTop: 4
    },
    monthButton: [
      getFocusStyle(theme, -1, 'relative'),
      {
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
        lineHeight: 40,
        fontSize: FontSizes.small,
        margin: '0 12px 16px 0',
        color: palette.neutralPrimary,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 2,
        selectors: {
          '&:nth-child(4n + 4)': {
            marginRight: 0
          },
          '&:nth-child(n + 9)': {
            marginBottom: 0
          },
          '& div': {
            fontWeight: FontWeights.regular
          },
          '&:hover': {
            color: palette.neutralDark,
            backgroundColor: palette.neutralLight,
            cursor: 'pointer',
            outline: '1px solid transparent'
          },
          '&:active': {
            backgroundColor: palette.themeLight
          }
        }
      }
    ],
    currentMonth: highlightCurrentMonth
      ? {
          color: palette.white,
          backgroundColor: palette.themePrimary,
          selectors: {
            '& div': {
              fontWeight: FontWeights.semibold
            },
            '&:hover': {
              backgroundColor: palette.themePrimary
            }
          }
        }
      : {},
    selectedMonth: highlightSelectedMonth
      ? {
          color: palette.neutralPrimary,
          backgroundColor: palette.themeLight,
          fontWeight: FontWeights.semibold,
          selectors: {
            '& div': {
              fontWeight: FontWeights.semibold
            },
            '&:hover, &:active': {
              backgroundColor: palette.themeLight
            }
          }
        }
      : {},
    disabledStyle: disabledStyle
  };
};
