import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';

export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
};

export const circleFilledClassName = 'fui-MenuItemSwitch__switchIndicator__circleFilled';

// Thumb and track sizes used by the component.
const spaceBetweenThumbAndTrack = 2;
const trackHeight = 20;
const trackWidth = 40;
const thumbSize = trackHeight - spaceBetweenThumbAndTrack;

const useSwitchIndicatorBaseClassName = makeResetStyles({
  borderRadius: tokens.borderRadiusCircular,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  fontSize: `${thumbSize}px`,
  height: `${trackHeight}px`,
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: 'background, border, color',
  width: `${trackWidth}px`,
  marginRight: tokens.spacingHorizontalXS,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  color: tokens.colorNeutralStrokeAccessible,
  ':hover': {
    color: tokens.colorNeutralStrokeAccessibleHover,
    borderColor: tokens.colorNeutralStrokeAccessibleHover,
  },

  ':hover:active': {
    color: tokens.colorNeutralStrokeAccessiblePressed,
    borderColor: tokens.colorNeutralStrokeAccessiblePressed,
  },
  [`& .${circleFilledClassName}`]: {
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'transform',

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

const useSwitchIndicatorStyles = makeStyles({
  checked: {
    [`& .${circleFilledClassName}`]: {
      transform: `translateX(${trackWidth - thumbSize - spaceBetweenThumbAndTrack}px)`,
    },

    backgroundColor: tokens.colorCompoundBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderColor(tokens.colorTransparentStroke),

    ':hover': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },

    ':hover:active': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
});

/**
 * Apply styling to the MenuItemSwitch slots based on the state
 */
export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
  'use no memo';

  const { checked } = state;
  const switchIndicatorStyles = useSwitchIndicatorStyles();
  const switchIndicatorBaseStyles = useSwitchIndicatorBaseClassName();
  state.root.className = mergeClasses(menuItemSwitchClassNames.root, state.root.className);
  if (state.content) {
    state.content.className = mergeClasses(menuItemSwitchClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemSwitchClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemSwitchClassNames.icon, state.icon.className);
  }

  if (state.switchIndicator) {
    state.switchIndicator.className = mergeClasses(
      menuItemSwitchClassNames.switchIndicator,
      switchIndicatorBaseStyles,
      checked && switchIndicatorStyles.checked,
      state.switchIndicator.className,
    );
  }

  useMenuItemStyles_unstable({
    ...state,
    components: {
      ...state.components,
      checkmark: 'span',
      submenuIndicator: 'span',
    },
    checkmark: undefined,
    submenuIndicator: undefined,
    hasSubmenu: false,
    persistOnClick: true,
  });

  return state;
};
