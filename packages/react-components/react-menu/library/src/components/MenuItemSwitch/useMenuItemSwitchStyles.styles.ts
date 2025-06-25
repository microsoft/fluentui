import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { type SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
  subText: 'fui-MenuItemSwitch__subText',
};

export const circleFilledClassName = 'fui-MenuItemSwitch__switchIndicator__circleFilled';

const thumbHeight = `calc(${semanticTokens.ctrlChoiceSwitchHeight} - (${semanticTokens.ctrlChoiceSwitchPaddingRest} * 2))`;

const useSwitchIndicatorBaseClassName = makeResetStyles({
  borderRadius: semanticTokens.ctrlChoiceSwitchCorner,
  border: `${semanticTokens.strokeWidthCtrlOutlineRest} solid ${semanticTokens.ctrlChoiceBaseStrokeRest}`,
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  height: semanticTokens.ctrlChoiceSwitchHeight,
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: 'background, border, color',
  width: semanticTokens.ctrlChoiceSwitchWidth,
  marginRight: semanticTokens.gapInsideCtrlSmDefault,
  color: semanticTokens.backgroundCtrlShapeSafeNeutralRest,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  '> *': {
    position: 'relative',
    height: thumbHeight,
    width: semanticTokens.ctrlChoiceSwitchThumbWidthRest,
    fontSize: thumbHeight,
    top: `calc(50% - ${thumbHeight} / 2)`,
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'transform',
  },

  ':hover': {
    color: semanticTokens.backgroundCtrlShapeSafeNeutralHover,
    borderColor: semanticTokens.ctrlChoiceBaseStrokeHover,
  },

  ':hover:active': {
    color: semanticTokens.backgroundCtrlShapeSafeNeutralPressed,
    borderColor: semanticTokens.ctrlChoiceBaseStrokePressed,
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
      transform: `translateX(calc(${semanticTokens.ctrlChoiceSwitchWidth} - ${semanticTokens.ctrlChoiceSwitchThumbWidthRest} - ${semanticTokens.ctrlChoiceSwitchPaddingRest}))`,
      ':dir(rtl)': {
        // Inverse animation for RTL (Griffel doesn't support flipping CSSVars)
        transform: `translateX(calc(-1 * (${semanticTokens.ctrlChoiceSwitchWidth} - ${semanticTokens.ctrlChoiceSwitchThumbWidthRest} - ${semanticTokens.ctrlChoiceSwitchPaddingRest})))`,
      },
    },

    backgroundColor: semanticTokens.backgroundCtrlActiveBrandRest,
    color: semanticTokens.foregroundCtrlOnActiveBrandRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandRest),

    ':hover': {
      color: semanticTokens.foregroundCtrlOnActiveBrandHover,
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandHover,
      ...shorthands.borderColor(semanticTokens._ctrlSwitchStrokeOnActiveBrandHover),
    },

    ':hover:active': {
      color: semanticTokens.foregroundCtrlOnActiveBrandPressed,
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandPressed),
    },
  },
});

const useMultilineStyles = makeStyles({
  switch: {
    alignSelf: 'center',
  },
});

/**
 * Apply styling to the MenuItemSwitch slots based on the state
 */
export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
  'use no memo';

  const { checked, subText } = state;
  const multiline = !!subText;
  const switchIndicatorStyles = useSwitchIndicatorStyles();
  const switchIndicatorBaseStyles = useSwitchIndicatorBaseClassName();
  const multilineStyles = useMultilineStyles();
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

  if (state.subText) {
    state.subText.className = mergeClasses(menuItemSwitchClassNames.subText, state.subText.className);
  }

  if (state.switchIndicator) {
    state.switchIndicator.className = mergeClasses(
      menuItemSwitchClassNames.switchIndicator,
      switchIndicatorBaseStyles,
      checked && switchIndicatorStyles.checked,
      state.switchIndicator.className,
      multiline && multilineStyles.switch,
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
