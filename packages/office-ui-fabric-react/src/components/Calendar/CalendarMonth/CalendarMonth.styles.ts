import { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';
import { normalize, FontSizes, FontWeights } from '../../../Styling';

export const getStyles = (props: ICalendarMonthStyleProps): ICalendarMonthStyles => {
  const { className, theme, hasHeaderClickCallback, highlightCurrentMonth, highlightSelectedMonth } = props;
  const { palette } = theme;

  return {
    root: [
      {
        width: 196
      },
      normalize,
      className],
    headerContainer: {
      display: 'flex',
    },
    currentYearButton: {
      textAlign: 'left',
      backgroundColor: 'inherit',
      flexGrow: 1,
      padding: '0 0 0 5px',
      selectors: {
        '&:hover, &:active': {
          cursor: !hasHeaderClickCallback ? 'default' : 'auto',
          backgroundColor: 'inherit',
        }
      }
    },
    yearNavigationButtonsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    yearNavigationButton: {
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
        },
      }
    },
    monthGridContainer: {},
    monthButton: {
      width: 40,
      height: 40,
      minWidth: 40,
      minHeight: 40,
      lineHeight: 40,
      fontSize: FontSizes.small,
      margin: '0 12px 16px 0',
      color: palette.neutralPrimary,
      backgroundColor: 'inherit',
      borderRadius: 2,
      selectors: {
        '&:nth-child(4n + 4)': {
          marginRight: 0
        },
        '& div': {
          fontWeight: FontWeights.regular,
        },
        '&:active': {
          backgroundColor: palette.themeLight,
        }
      }
    },
    currentMonth: highlightCurrentMonth ? {
      color: palette.white,
      backgroundColor: palette.themePrimary,
      selectors: {
        '& div': {
          fontWeight: FontWeights.semibold
        },
        '&:hover': {
          backgroundColor: palette.themePrimary,
        }
      }
    } : {},
    selectedMonth: highlightSelectedMonth ? {
      color: palette.neutralPrimary,
      backgroundColor: palette.themeLight,
      selectors: {
        '& div': {
          fontWeight: FontWeights.semibold
        },
        '&:hover, &:active': {
          backgroundColor: palette.themeLight,
        }
      }
    } : {},
    disabledStyle: {
      color: palette.neutralTertiaryAlt,
      pointerEvents: 'none',
    },
  };
};
