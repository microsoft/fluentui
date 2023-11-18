import {
  normalize,
  FontSizes,
  FontWeights,
  getFocusStyle,
  AnimationStyles,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
} from '@fluentui/style-utilities';
import { AnimationDirection } from '../Calendar.types';
import type { ICalendarPickerStyleProps, ICalendarPickerStyles } from './CalendarPicker.types';
import type { IRawStyle } from '@fluentui/style-utilities';

export const getStyles = (props: ICalendarPickerStyleProps): ICalendarPickerStyles => {
  const {
    className,
    theme,
    hasHeaderClickCallback,
    highlightCurrent,
    highlightSelected,
    animateBackwards,
    animationDirection,
  } = props;
  const { palette } = theme;

  let animationStyle: IRawStyle = {};
  if (animateBackwards !== undefined) {
    if (animationDirection === AnimationDirection.Horizontal) {
      animationStyle = animateBackwards ? AnimationStyles.slideRightIn20 : AnimationStyles.slideLeftIn20;
    } else {
      animationStyle = animateBackwards ? AnimationStyles.slideDownIn20 : AnimationStyles.slideUpIn20;
    }
  }

  const headerAnimationStyle: IRawStyle = animateBackwards !== undefined ? AnimationStyles.fadeIn200 : {};

  return {
    root: [
      normalize,
      {
        width: 196,
        padding: 12,
        boxSizing: 'content-box',
        overflow: 'hidden',
      },
      className,
    ],
    headerContainer: {
      display: 'flex',
    },
    currentItemButton: [
      getFocusStyle(theme, { inset: -1 }),
      {
        ...headerAnimationStyle,
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.semibold,
        fontFamily: 'inherit',
        textAlign: 'left',
        color: 'inherit',
        backgroundColor: 'transparent',
        flexGrow: 1,
        padding: '0 4px 0 10px',
        border: 'none',
        overflow: 'visible', // explicitly specify for IE11
      },
      hasHeaderClickCallback && {
        selectors: {
          '&:hover, &:active': {
            cursor: !hasHeaderClickCallback ? 'default' : 'pointer',
            color: palette.neutralDark,
            outline: '1px solid transparent',
            backgroundColor: palette.neutralLight,
          },
        },
      },
    ],
    navigationButtonsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    navigationButton: [
      getFocusStyle(theme, { inset: -1 }),
      {
        fontFamily: 'inherit',
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
        overflow: 'visible', // explicitly specify for IE11
        selectors: {
          '&:hover': {
            color: palette.neutralDark,
            cursor: 'pointer',
            outline: '1px solid transparent',
            backgroundColor: palette.neutralLight,
          },
        },
      },
    ],
    gridContainer: {
      marginTop: 4,
    },
    buttonRow: {
      ...animationStyle,
      marginBottom: 16,
      selectors: {
        '&:nth-child(n + 3)': {
          marginBottom: 0,
        },
      },
    },
    itemButton: [
      getFocusStyle(theme, { inset: -1 }),
      {
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
        lineHeight: 40,
        fontSize: FontSizes.small,
        fontFamily: 'inherit',
        padding: 0,
        margin: '0 12px 0 0',
        color: palette.neutralPrimary,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 2,
        overflow: 'visible', // explicitly specify for IE11
        selectors: {
          '&:nth-child(4n + 4)': {
            marginRight: 0,
          },
          '&:nth-child(n + 9)': {
            marginBottom: 0,
          },
          '& div': {
            fontWeight: FontWeights.regular,
          },
          '&:hover': {
            color: palette.neutralDark,
            backgroundColor: palette.neutralLight,
            cursor: 'pointer',
            outline: '1px solid transparent',
            selectors: {
              [HighContrastSelector]: {
                background: 'Window',
                color: 'WindowText',
                outline: '1px solid Highlight',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
          '&:active': {
            backgroundColor: palette.themeLight,
            selectors: {
              [HighContrastSelector]: {
                background: 'Window',
                color: 'Highlight',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
        },
      },
    ],
    current: highlightCurrent
      ? {
          color: palette.white,
          backgroundColor: palette.themePrimary,
          selectors: {
            '& div': {
              fontWeight: FontWeights.semibold,
            },
            '&:hover': {
              backgroundColor: palette.themePrimary,
              selectors: {
                [HighContrastSelector]: {
                  backgroundColor: 'WindowText',
                  color: 'Window',
                  ...getHighContrastNoAdjustStyle(),
                },
              },
            },
            [HighContrastSelector]: {
              backgroundColor: 'WindowText',
              color: 'Window',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        }
      : {},
    selected: highlightSelected
      ? {
          color: palette.neutralPrimary,
          backgroundColor: palette.themeLight,
          fontWeight: FontWeights.semibold,
          selectors: {
            '& div': {
              fontWeight: FontWeights.semibold,
            },
            '&:hover, &:active': {
              backgroundColor: palette.themeLight,
              selectors: {
                [HighContrastSelector]: {
                  color: 'Window',
                  background: 'Highlight',
                  ...getHighContrastNoAdjustStyle(),
                },
              },
            },
            [HighContrastSelector]: {
              background: 'Highlight',
              color: 'Window',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        }
      : {},
    disabled: {
      selectors: {
        '&, &:disabled, & button': {
          color: palette.neutralTertiaryAlt,
          pointerEvents: 'none',
        },
        [HighContrastSelector]: {
          color: 'GrayText',
          forcedColorAdjust: 'none',
        },
      },
    },
  };
};
