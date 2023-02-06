import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  DURATION_2,
  DURATION_3,
  EASING_FUNCTION_1,
  EASING_FUNCTION_2,
  FADE_IN,
  SLIDE_DOWN_IN20,
  SLIDE_LEFT_IN20,
  SLIDE_RIGHT_IN20,
  SLIDE_UP_IN20,
} from '../../utils/animations';
import { AnimationDirection } from '../Calendar/Calendar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarPickerSlots, CalendarPickerStyles, CalendarPickerStyleProps } from './CalendarPicker.types';

export const calendarPickerClassNames: SlotClassNames<CalendarPickerSlots> & Record<string, string> = {
  root: 'fui-CalendarPicker',
};

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'content-box',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('12px'),
    width: '196px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
  },
});

const useHeaderContainerStyles = makeStyles({
  base: {
    display: 'flex',
  },
});

const useCurrentItemButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('none'),
    color: 'inherit',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0, '4px', 0, '10px'),
    textAlign: 'left',
  },
  animation: {
    animationDuration: DURATION_2,
    animationFillMode: 'both',
    animationName: FADE_IN,
    animationTimingFunction: EASING_FUNCTION_2,
  },
  hasHeaderClickCallback: {
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      cursor: 'pointer',
      ...shorthands.outline('1px', 'solid', tokens.colorTransparentStroke),
    },
    '&:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForeground1Pressed,
      cursor: 'pointer',
      ...shorthands.outline('1px', 'solid', tokens.colorTransparentStroke),
    },
  },
  // getFocusStyle(theme, { inset: -1 }),
});

const useNavigationButtonsContainerStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'flex',
  },
});

const useNavigationButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('none'),
    ...shorthands.borderRadius('2px'),
    color: tokens.colorNeutralForeground1,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    minHeight: '28px',
    minWidth: '28px',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      cursor: 'pointer',
      ...shorthands.outline('1px', 'solid', tokens.colorTransparentStroke),
    },
  },
  //  getFocusStyle(theme, { inset: -1 }),
});

const useGridContainerStyles = makeStyles({
  base: {
    marginTop: '4px',
  },
});

const useButtonRowStyles = makeStyles({
  base: {
    marginBottom: '16px',
    '&:nth-child(n + 3)': {
      marginBottom: 0,
    },
  },
  animation: {
    animationDuration: DURATION_3,
    animationFillMode: 'both',
    animationTimingFunction: EASING_FUNCTION_1,
  },
  horizontalBackward: {
    animationName: [FADE_IN, SLIDE_RIGHT_IN20],
  },
  horizontalForward: {
    animationName: [FADE_IN, SLIDE_LEFT_IN20],
  },
  verticalBackward: {
    animationName: [FADE_IN, SLIDE_DOWN_IN20],
  },
  verticalForward: {
    animationName: [FADE_IN, SLIDE_UP_IN20],
  },
});

const useItemButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('none'),
    ...shorthands.borderRadius('2px'),
    color: tokens.colorNeutralForeground1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '40px',
    lineHeight: '40px',
    minHeight: '40px',
    minWidth: '40px',
    ...shorthands.margin(0, '12px', 0, 0),
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    width: '40px',

    '&:nth-child(4n + 4)': {
      marginRight: 0,
    },
    '&:nth-child(n + 9)': {
      marginBottom: 0,
    },
    '& div': {
      fontWeight: tokens.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      cursor: 'pointer',
      ...shorthands.outline('1px', 'solid', tokens.colorTransparentStroke),

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'WindowText',
        forcedColorAdjust: 'none',
        ...shorthands.outline('1px', 'solid', 'Highlight'),
      },
    },
    '&:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
  },
  // getFocusStyle(theme, { inset: -1 }),
});

const useCurrentStyles = makeStyles({
  highlightCurrent: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,

    '& div': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,

      '@media (forced-colors: active)': {
        backgroundColor: 'WindowText',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
  },
});

const useSelectedStyles = makeStyles({
  highlightSelected: {
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,

    '& div': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,

      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '&:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,

      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
  },
});

const useDisabledStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    },
    '@media (forced-colors: active)': {
      color: 'GrayText',
      forcedColorAdjust: 'none',
    },
  },
});

/**
 * Apply styling to the CalendarPicker slots based on the state
 */
// export const useCalendarPickerStyles_unstable = (state: CalendarPickerState): CalendarPickerState => {
export const useCalendarPickerStyles_unstable = (
  props: CalendarPickerStyleProps,
): Record<keyof CalendarPickerStyles, string> => {
  const rootStyles = useRootStyles();
  const headerContainerStyles = useHeaderContainerStyles();
  const currentItemButtonStyles = useCurrentItemButtonStyles();
  const navigationButtonsContainerStyles = useNavigationButtonsContainerStyles();
  const navigationButtonStyles = useNavigationButtonStyles();
  const gridContainerStyles = useGridContainerStyles();
  const buttonRowStyles = useButtonRowStyles();
  const itemButtonStyles = useItemButtonStyles();
  const currentStyles = useCurrentStyles();
  const selectedStyles = useSelectedStyles();
  const disabledStyles = useDisabledStyles();

  const {
    animateBackwards,
    animationDirection,
    className,
    hasHeaderClickCallback,
    highlightCurrent,
    highlightSelected,
  } = props;

  return {
    root: mergeClasses(calendarPickerClassNames.root, rootStyles.normalize, rootStyles.base, className),
    headerContainer: headerContainerStyles.base,
    currentItemButton: mergeClasses(
      currentItemButtonStyles.base,
      animateBackwards !== undefined && currentItemButtonStyles.animation,
      hasHeaderClickCallback && currentItemButtonStyles.hasHeaderClickCallback,
    ),
    navigationButtonsContainer: navigationButtonsContainerStyles.base,
    navigationButton: navigationButtonStyles.base,
    gridContainer: gridContainerStyles.base,
    buttonRow: mergeClasses(
      buttonRowStyles.base,
      buttonRowStyles.animation,
      animateBackwards !== undefined &&
        (animationDirection === AnimationDirection.Horizontal
          ? animateBackwards
            ? buttonRowStyles.horizontalBackward
            : buttonRowStyles.horizontalForward
          : animateBackwards
          ? buttonRowStyles.verticalBackward
          : buttonRowStyles.verticalForward),
    ),
    itemButton: itemButtonStyles.base,
    current: highlightCurrent ? currentStyles.highlightCurrent : '',
    selected: highlightSelected ? selectedStyles.highlightSelected : '',
    disabled: disabledStyles.base,
  };
};
