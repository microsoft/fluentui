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
    backgroundColor: `var(--ctrl-token-CalendarPicker-623, var(--semantic-token-CalendarPicker-624, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderStyle('none'),
    borderRadius: `var(--ctrl-token-CalendarPicker-625, var(--semantic-token-CalendarPicker-626, ${tokens.borderRadiusMedium}))`,
    color: 'inherit',
    flexGrow: 1,
    fontFamily: 'inherit',
    fontSize: `var(--ctrl-token-CalendarPicker-627, var(--semantic-token-CalendarPicker-628, ${tokens.fontSizeBase300}))`,
    fontWeight: `var(--ctrl-token-CalendarPicker-629, var(--semantic-token-CalendarPicker-630, ${tokens.fontWeightSemibold}))`,
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
      backgroundColor: `var(--ctrl-token-CalendarPicker-631, var(--semantic-token-CalendarPicker-632, ${tokens.colorBrandBackgroundInvertedHover}))`,
      color: `var(--ctrl-token-CalendarPicker-633, var(--semantic-token-CalendarPicker-634, ${tokens.colorBrandForegroundOnLightHover}))`,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },
    '&:hover:active': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-635, var(--semantic-token-CalendarPicker-636, ${tokens.colorBrandBackgroundInvertedPressed}))`,
      color: `var(--ctrl-token-CalendarPicker-637, var(--semantic-token-CalendarPicker-638, ${tokens.colorBrandForegroundOnLightPressed}))`,
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
    backgroundColor: `var(--ctrl-token-CalendarPicker-639, var(--semantic-token-CalendarPicker-640, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    borderRadius: `var(--ctrl-token-CalendarPicker-641, var(--semantic-token-CalendarPicker-642, ${tokens.borderRadiusMedium}))`,
    color: `var(--ctrl-token-CalendarPicker-643, var(--semantic-token-CalendarPicker-644, ${tokens.colorNeutralForeground1}))`,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: `var(--ctrl-token-CalendarPicker-645, var(--semantic-token-CalendarPicker-646, ${tokens.fontSizeBase200}))`,
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
      backgroundColor: `var(--ctrl-token-CalendarPicker-647, var(--semantic-token-CalendarPicker-648, ${tokens.colorBrandBackgroundInvertedHover}))`,
      color: `var(--ctrl-token-CalendarPicker-649, var(--semantic-token-CalendarPicker-650, ${tokens.colorBrandForegroundOnLightHover}))`,
      cursor: 'pointer',
      outline: `1px solid ${tokens.colorTransparentStroke}`,
    },

    '&:hover:active': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-651, var(--semantic-token-CalendarPicker-652, ${tokens.colorBrandBackgroundInvertedPressed}))`,
      color: `var(--ctrl-token-CalendarPicker-653, var(--semantic-token-CalendarPicker-654, ${tokens.colorBrandForegroundOnLightPressed}))`,
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
    backgroundColor: `var(--ctrl-token-CalendarPicker-655, var(--semantic-token-CalendarPicker-656, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    borderRadius: `var(--ctrl-token-CalendarPicker-657, var(--semantic-token-CalendarPicker-658, ${tokens.borderRadiusMedium}))`,
    color: `var(--ctrl-token-CalendarPicker-659, var(--semantic-token-CalendarPicker-660, ${tokens.colorNeutralForeground3}))`,
    fontFamily: 'inherit',
    fontSize: `var(--ctrl-token-CalendarPicker-661, var(--semantic-token-CalendarPicker-662, ${tokens.fontSizeBase200}))`,
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
      fontWeight: `var(--ctrl-token-CalendarPicker-663, var(--semantic-token-CalendarPicker-664, ${tokens.fontWeightRegular}))`,
    },
    '&:hover': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-665, var(--semantic-token-CalendarPicker-666, ${tokens.colorBrandBackgroundInvertedHover}))`,
      color: `var(--ctrl-token-CalendarPicker-667, var(--semantic-token-CalendarPicker-668, ${tokens.colorNeutralForeground1Static}))`,
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
      backgroundColor: `var(--ctrl-token-CalendarPicker-669, var(--semantic-token-CalendarPicker-670, ${tokens.colorBrandBackgroundInvertedPressed}))`,

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
    backgroundColor: `var(--ctrl-token-CalendarPicker-671, var(--semantic-token-CalendarPicker-672, ${tokens.colorBrandBackground}))`,
    color: `var(--ctrl-token-CalendarPicker-673, var(--semantic-token-CalendarPicker-674, ${tokens.colorNeutralForegroundOnBrand}))`,
    fontWeight: `var(--ctrl-token-CalendarPicker-675, var(--semantic-token-CalendarPicker-676, ${tokens.fontWeightSemibold}))`,

    '@media (forced-colors: active)': {
      backgroundColor: 'WindowText',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '&:hover, &:hover:active': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-677, var(--semantic-token-CalendarPicker-678, ${tokens.colorBrandBackground}))`,
      color: `var(--ctrl-token-CalendarPicker-679, var(--semantic-token-CalendarPicker-680, ${tokens.colorNeutralForegroundOnBrand}))`,

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
    backgroundColor: `var(--ctrl-token-CalendarPicker-681, var(--semantic-token-CalendarPicker-682, ${tokens.colorBrandBackgroundInvertedSelected}))`,
    color: `var(--ctrl-token-CalendarPicker-683, var(--semantic-token-CalendarPicker-684, ${tokens.colorNeutralForeground1Static}))`,
    fontWeight: `var(--ctrl-token-CalendarPicker-685, var(--semantic-token-CalendarPicker-686, ${tokens.fontWeightSemibold}))`,

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Window',
      forcedColorAdjust: 'none',
    },
    '& div': {
      fontWeight: `var(--ctrl-token-CalendarPicker-687, var(--semantic-token-CalendarPicker-688, ${tokens.fontWeightSemibold}))`,
    },
    '&:hover': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-689, var(--semantic-token-CalendarPicker-690, ${tokens.colorBrandBackgroundInvertedSelected}))`,
      color: `var(--ctrl-token-CalendarPicker-691, var(--semantic-token-CalendarPicker-692, ${tokens.colorNeutralForeground1Static}))`,

      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'Window',
        forcedColorAdjust: 'none',
      },
    },
    '&:hover:active': {
      backgroundColor: `var(--ctrl-token-CalendarPicker-693, var(--semantic-token-CalendarPicker-694, ${tokens.colorBrandBackgroundInvertedPressed}))`,
    },
  },
});

const useDisabledStyles = makeStyles({
  base: {
    '&, &:disabled, & button': {
      color: `var(--ctrl-token-CalendarPicker-695, var(--semantic-token-CalendarPicker-696, ${tokens.colorNeutralForegroundDisabled}))`,
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
