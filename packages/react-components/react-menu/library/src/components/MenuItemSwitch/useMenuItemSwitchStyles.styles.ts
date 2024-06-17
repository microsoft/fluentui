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
  borderRadius: `var(--1359, var(--1360, ${tokens.borderRadiusCircular}))`,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  fontSize: `${thumbSize}px`,
  height: `${trackHeight}px`,
  transitionDuration: `var(--1361, var(--1362, ${tokens.durationNormal}))`,
  transitionTimingFunction: `var(--1363, var(--1364, ${tokens.curveEasyEase}))`,
  transitionProperty: 'background, border, color',
  width: `${trackWidth}px`,
  marginRight: `var(--1365, var(--1366, ${tokens.spacingHorizontalXS}))`,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  color: `var(--1367, var(--1368, ${tokens.colorNeutralStrokeAccessible}))`,
  ':hover': {
    color: `var(--1369, var(--1370, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    borderColor: `var(--1371, var(--1372, ${tokens.colorNeutralStrokeAccessibleHover}))`,
  },

  ':hover:active': {
    color: `var(--1373, var(--1374, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    borderColor: `var(--1375, var(--1376, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
  },
  [`& .${circleFilledClassName}`]: {
    transitionDuration: `var(--1377, var(--1378, ${tokens.durationNormal}))`,
    transitionTimingFunction: `var(--1379, var(--1380, ${tokens.curveEasyEase}))`,
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

    backgroundColor: `var(--1381, var(--1382, ${tokens.colorCompoundBrandBackground}))`,
    color: `var(--1383, var(--1384, ${tokens.colorNeutralForegroundInverted}))`,
    ...shorthands.borderColor(tokens.colorTransparentStroke),

    ':hover': {
      color: `var(--1385, var(--1386, ${tokens.colorNeutralForegroundInverted}))`,
      backgroundColor: `var(--1387, var(--1388, ${tokens.colorCompoundBrandBackgroundHover}))`,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },

    ':hover:active': {
      color: `var(--1389, var(--1390, ${tokens.colorNeutralForegroundInverted}))`,
      backgroundColor: `var(--1391, var(--1392, ${tokens.colorCompoundBrandBackgroundPressed}))`,
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
