import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { menuItemSwitchClassNames, type MenuItemSwitchState, useMenuItemStyles_unstable } from '@fluentui/react-menu';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticMenuItemSwitchStyles = (_state: unknown): MenuItemSwitchState => {
  'use no memo';

  const state = _state as MenuItemSwitchState;
  const { checked, subText } = state;
  const multiline = !!subText;
  const switchIndicatorStyles = useSwitchIndicatorStyles();
  const switchIndicatorBaseStyles = useSwitchIndicatorBaseClassName();
  const multilineStyles = useMultilineStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuItemSwitchClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemSwitchClassNames.content,
      getSlotClassNameProp_unstable(state.content),
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemSwitchClassNames.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent),
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemSwitchClassNames.icon,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemSwitchClassNames.subText,
      getSlotClassNameProp_unstable(state.subText),
    );
  }

  if (state.switchIndicator) {
    state.switchIndicator.className = mergeClasses(
      state.switchIndicator.className,
      menuItemSwitchClassNames.switchIndicator,
      switchIndicatorBaseStyles,
      checked && switchIndicatorStyles.checked,
      multiline && multilineStyles.switch,
      getSlotClassNameProp_unstable(state.switchIndicator),
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
