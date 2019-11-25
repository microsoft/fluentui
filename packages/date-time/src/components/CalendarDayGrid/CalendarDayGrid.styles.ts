import { ICalendarDayGridStyleProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { FontSizes, FontWeights, getFocusStyle, getGlobalClassNames, AnimationStyles, IRawStyle, keyframes } from '@uifabric/styling';
import { DateRangeType } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { AnimationDirection } from '../Calendar/Calendar.types';

const GlobalClassNames = {
  hoverStyle: 'ms-CalendarDay-hoverStyle',
  pressedStyle: 'ms-CalendarDay-pressedStyle'
};

const transitionRowDisappearance = keyframes({
  '100%': {
    width: 0,
    height: 0,
    overflow: 'hidden'
  },
  '99.9%': {
    width: '100%',
    height: 28,
    overflow: 'visible'
  },
  '0%': {
    width: '100%',
    height: 28,
    overflow: 'visible'
  }
});

export const styles = (props: ICalendarDayGridStyleProps): ICalendarDayGridStyles => {
  const { theme, dateRangeType, showWeekNumbers, lightenDaysOutsideNavigatedMonth, animateBackwards, animationDirection } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  let rowAnimationStyle: IRawStyle = {};
  if (animateBackwards !== undefined) {
    if (animationDirection === AnimationDirection.Horizontal) {
      rowAnimationStyle = animateBackwards ? AnimationStyles.slideRightIn20 : AnimationStyles.slideLeftIn20;
    } else {
      rowAnimationStyle = animateBackwards ? AnimationStyles.slideDownIn20 : AnimationStyles.slideUpIn20;
    }
  }

  let firstTransitionRowAnimationStyle: IRawStyle = {};
  let lastTransitionRowAnimationStyle: IRawStyle = {};
  if (animateBackwards !== undefined) {
    if (animationDirection !== AnimationDirection.Horizontal) {
      firstTransitionRowAnimationStyle = animateBackwards ? { animationName: '' } : AnimationStyles.slideUpOut20;
      lastTransitionRowAnimationStyle = animateBackwards ? AnimationStyles.slideDownOut20 : { animationName: '' };
    }
  }

  const disabledStyle = {
    selectors: {
      '&, &:disabled, & button': {
        color: palette.neutralTertiaryAlt,
        pointerEvents: 'none'
      }
    }
  };

  return {
    wrapper: {
      paddingBottom: 10
    },
    table: [
      {
        textAlign: 'center',
        borderCollapse: 'collapse',
        borderSpacing: '0',
        tableLayout: 'fixed',
        fontSize: 'inherit',
        marginTop: 4,
        width: 196,
        position: 'relative',
        paddingBottom: 10
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
          backgroundColor: palette.neutralLighter
        },
        ['&.' + classNames.pressedStyle]: {
          backgroundColor: palette.neutralLight
        }
      }
    },
    daySelected: [
      dateRangeType !== DateRangeType.Month && {
        backgroundColor: palette.neutralLight + '!important',
        selectors: {
          ['&:hover, &.' + classNames.hoverStyle + ', &.' + classNames.pressedStyle]: {
            backgroundColor: palette.neutralLight + '!important'
          }
        }
      }
    ],
    weekRow: rowAnimationStyle,
    weekDayLabelCell: AnimationStyles.fadeIn200,
    weekNumberCell: {
      margin: 0,
      padding: 0,
      borderRight: '1px solid',
      borderColor: palette.neutralLight,
      backgroundColor: palette.neutralLighterAlt,
      color: palette.neutralSecondary,
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
        overflow: 'visible', // explicitly specify for IE11
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
      borderRadius: '100%',
      color: palette.white + '!important',
      fontWeight: (FontWeights.semibold + '!important') as 'initial'
    },
    firstTransitionWeek: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
      overflow: 'hidden',
      ...firstTransitionRowAnimationStyle,
      animationName: firstTransitionRowAnimationStyle.animationName + ',' + transitionRowDisappearance
    },
    lastTransitionWeek: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
      overflow: 'hidden',
      marginTop: -28,
      ...lastTransitionRowAnimationStyle,
      animationName: lastTransitionRowAnimationStyle.animationName + ',' + transitionRowDisappearance
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
