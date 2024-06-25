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
import type { CalendarPickerStyles, CalendarPickerStyleProps } from './CalendarPicker.types';

/**
 * @internal
 */
export const calendarPickerClassNames: SlotClassNames<CalendarPickerStyles> = {
  root: 'fui-CalendarPicker',
  headerContainer: 'fui-CalendarPicker__headerContainer',
  currentItemButton: 'fui-CalendarPicker__currentItemButton',
  navigationButtonsContainer: 'fui-CalendarPicker__navigationButtonsContainer',
  navigationButton: 'fui-CalendarPicker__navigationButton',
  gridContainer: 'fui-CalendarPicker__gridContainer',
  buttonRow: 'fui-CalendarPicker__buttonRow',
  itemButton: 'fui-CalendarPicker__itemButton',
  current: 'fui-CalendarPicker__current',
  selected: 'fui-CalendarPicker__selected',
  disabled: 'fui-CalendarPicker__disabled',
};

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'content-box',
    overflow: 'hidden',
    padding: '12px',
    width: '196px',
  },
  normalize: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
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
    ...shorthands.borderStyle('none'),
    borderRadius: tokens.borderRadiusMedium,
    color: 'inherit',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    overflow: 'visible',
    padding: '0 4px 0 10px',
    textAlign: 'left',
  },
  animation: {
    animationDuration: DURATION_2,
    animationFillMode: 'both',
    animationName: FADE_IN,
    animationTimingFunction: EASING_FUNCTION_2,
  },
  hasHeaderClickCallback: {
    // If this is updated, make sure to update headerIsClickable in useCalendarDayStyles as well
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },
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
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '28px',
    lineHeight: '28px',
    minHeight: '28px',
    minWidth: '28px',
    overflow: 'visible',
    padding: '0',
    position: 'relative',
    textAlign: 'center',
    width: '28px',

    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandForegroundOnLightHover,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },

    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
      color: tokens.colorBrandForegroundOnLightPressed,
    },
  },
});

const useGridContainerStyles = makeStyles({
  base: {
    marginTop: '4px',
  },
});

const useButtonRowStyles = makeStyles({
  base: {
    marginBottom: '16px',
    '&:last-of-type': {
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
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground3,
    fontFamily: 'inherit',
    fontSize: tokens.fontSizeBase200,
    height: '40px',
    lineHeight: '40px',
    minHeight: '40px',
    minWidth: '40px',
    margin: '0 12px 0 0',
    overflow: 'visible',
    padding: '0',
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
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorNeutralForeground1Static,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'WindowText',
        forcedColorAdjust: 'none',
        outline: '1px solid Highlight',
      },
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,

      '@media (forced-colors: active)': {
        backgroundColor: 'Window',
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
  },
});

const useCurrentStyles = makeStyles({
  highlightCurrent: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '&:hover, &:hover:active': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,

      '@media (forced-colors: active)': {
        backgroundColor: 'WindowText',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
  },
});

const useSelectedStyles = makeStyles({
  highlightSelected: {
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    color: tokens.colorNeutralForeground1Static,
    fontWeight: tokens.fontWeightSemibold,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '& div': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '&:hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
      color: tokens.colorNeutralForeground1Static,

      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '&:hover:active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedPressed,
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
 * @internal
 *
 * Apply styling to the CalendarPicker slots based on the state
 */
export const useCalendarPickerStyles_unstable = (props: CalendarPickerStyleProps): CalendarPickerStyles => {
  'use no memo';

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
    headerContainer: mergeClasses(calendarPickerClassNames.headerContainer, headerContainerStyles.base),
    currentItemButton: mergeClasses(
      calendarPickerClassNames.currentItemButton,
      currentItemButtonStyles.base,
      animateBackwards !== undefined && currentItemButtonStyles.animation,
      hasHeaderClickCallback && currentItemButtonStyles.hasHeaderClickCallback,
    ),
    navigationButtonsContainer: mergeClasses(
      calendarPickerClassNames.navigationButtonsContainer,
      navigationButtonsContainerStyles.base,
    ),
    navigationButton: mergeClasses(calendarPickerClassNames.navigationButton, navigationButtonStyles.base),
    gridContainer: mergeClasses(calendarPickerClassNames.gridContainer, gridContainerStyles.base),
    buttonRow: mergeClasses(
      calendarPickerClassNames.buttonRow,
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
    itemButton: mergeClasses(calendarPickerClassNames.itemButton, itemButtonStyles.base),
    selected: mergeClasses(calendarPickerClassNames.selected, highlightSelected && selectedStyles.highlightSelected),
    current: mergeClasses(calendarPickerClassNames.current, highlightCurrent && currentStyles.highlightCurrent),
    disabled: mergeClasses(calendarPickerClassNames.disabled, disabledStyles.base),
  };
};
