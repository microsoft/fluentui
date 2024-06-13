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
  borderRadius: `var(--ctrl-token-MenuItemSwitch-1359, var(--semantic-token-MenuItemSwitch-1360, ${tokens.borderRadiusCircular}))`,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  fontSize: `${thumbSize}px`,
  height: `${trackHeight}px`,
  transitionDuration: `var(--ctrl-token-MenuItemSwitch-1361, var(--semantic-token-MenuItemSwitch-1362, ${tokens.durationNormal}))`,
  transitionTimingFunction: `var(--ctrl-token-MenuItemSwitch-1363, var(--semantic-token-MenuItemSwitch-1364, ${tokens.curveEasyEase}))`,
  transitionProperty: 'background, border, color',
  width: `${trackWidth}px`,
  marginRight: `var(--ctrl-token-MenuItemSwitch-1365, var(--semantic-token-MenuItemSwitch-1366, ${tokens.spacingHorizontalXS}))`,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  color: `var(--ctrl-token-MenuItemSwitch-1367, var(--semantic-token-MenuItemSwitch-1368, ${tokens.colorNeutralStrokeAccessible}))`,
  ':hover': {
    color: `var(--ctrl-token-MenuItemSwitch-1369, var(--semantic-token-MenuItemSwitch-1370, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    borderColor: `var(--ctrl-token-MenuItemSwitch-1371, var(--semantic-token-MenuItemSwitch-1372, ${tokens.colorNeutralStrokeAccessibleHover}))`,
  },

  ':hover:active': {
    color: `var(--ctrl-token-MenuItemSwitch-1373, var(--semantic-token-MenuItemSwitch-1374, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    borderColor: `var(--ctrl-token-MenuItemSwitch-1375, var(--semantic-token-MenuItemSwitch-1376, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
  },
  [`& .${circleFilledClassName}`]: {
    transitionDuration: `var(--ctrl-token-MenuItemSwitch-1377, var(--semantic-token-MenuItemSwitch-1378, ${tokens.durationNormal}))`,
    transitionTimingFunction: `var(--ctrl-token-MenuItemSwitch-1379, var(--semantic-token-MenuItemSwitch-1380, ${tokens.curveEasyEase}))`,
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

    backgroundColor: `var(--ctrl-token-MenuItemSwitch-1381, var(--semantic-token-MenuItemSwitch-1382, ${tokens.colorCompoundBrandBackground}))`,
    color: `var(--ctrl-token-MenuItemSwitch-1383, var(--semantic-token-MenuItemSwitch-1384, ${tokens.colorNeutralForegroundInverted}))`,
    ...shorthands.borderColor(tokens.colorTransparentStroke),

    ':hover': {
      color: `var(--ctrl-token-MenuItemSwitch-1385, var(--semantic-token-MenuItemSwitch-1386, ${tokens.colorNeutralForegroundInverted}))`,
      backgroundColor: `var(--ctrl-token-MenuItemSwitch-1387, var(--semantic-token-MenuItemSwitch-1388, ${tokens.colorCompoundBrandBackgroundHover}))`,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },

    ':hover:active': {
      color: `var(--ctrl-token-MenuItemSwitch-1389, var(--semantic-token-MenuItemSwitch-1390, ${tokens.colorNeutralForegroundInverted}))`,
      backgroundColor: `var(--ctrl-token-MenuItemSwitch-1391, var(--semantic-token-MenuItemSwitch-1392, ${tokens.colorCompoundBrandBackgroundPressed}))`,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
});

/**
 * Apply styling to the MenuItemSwitch slots based on the state
 */
export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
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
