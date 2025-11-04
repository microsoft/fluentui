'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { menuButtonClassNames, type MenuButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticButtonStyles } from './useSemanticButtonStyles.styles';

const useRootExpandedStyles = makeStyles({
  base: {
    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },

  // Appearance variations
  outline: {
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
    ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    color: semanticTokens.groupButtonOutlineForegroundSelected,

    // Ensure state is retained over base hover
    ':hover': {
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
      color: semanticTokens.groupButtonOutlineForegroundSelected,
    },

    // Ensure state is retained over base hover active
    ':hover:active': {
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
      color: semanticTokens.groupButtonOutlineForegroundSelected,
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundSelected,
  },
  secondary: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeSelected),
    color: semanticTokens.groupButtonNeutralForegroundSelected,
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundSelected,
    color: semanticTokens.groupButtonNeutralForegroundSelected,
  },
  transparent: {
    color: semanticTokens.groupButtonNeutralForegroundSelected,
  },
});

const useIconExpandedStyles = makeStyles({
  // Appearance variations
  outline: {
    color: semanticTokens.groupButtonNeutralIconForegroundSelected,
  },
  primary: {
    /* The primary styles are exactly the same as the base styles. */
  },
  secondary: {
    color: semanticTokens.groupButtonNeutralIconForegroundSelected,
  },
  subtle: {
    color: semanticTokens.groupButtonSubtleIconForegroundSelected,
  },
  transparent: {
    color: semanticTokens.groupButtonTransparentForegroundSelected,
  },
  highContrast: {
    // High contrast styles
    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',
      },
    },
  },
});

const useMenuIconStyles = makeStyles({
  base: {
    lineHeight: 0,
  },

  // Size appearance
  small: {
    fontSize: semanticTokens.groupButtonSmallFontsize,
    height: semanticTokens.groupButtonSmallFontsize,
    lineHeight: semanticTokens.groupButtonSmallLineheight,
    width: semanticTokens.groupButtonSmallFontsize,
  },
  medium: {
    // Medium uses small font size for icon
    fontSize: semanticTokens.groupButtonSmallFontsize,
    height: semanticTokens.groupButtonSmallFontsize,
    lineHeight: semanticTokens.groupButtonSmallLineheight,
    width: semanticTokens.groupButtonSmallFontsize,
  },
  large: {
    fontSize: semanticTokens.groupButtonLargeFontsize,
    height: semanticTokens.groupButtonLargeFontsize,
    lineHeight: semanticTokens.groupButtonLargeLineheight,
    width: semanticTokens.groupButtonLargeFontsize,
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: semanticTokens.groupButtonSmallGap,
  },
});

export const useSemanticMenuButtonStyles = (_state: unknown): MenuButtonState => {
  'use no memo';

  const state = _state as MenuButtonState;

  const rootExpandedStyles = useRootExpandedStyles();
  const iconExpandedStyles = useIconExpandedStyles();
  const menuIconStyles = useMenuIconStyles();

  useSemanticButtonStyles({ ...state, iconPosition: 'before' });

  state.root.className = mergeClasses(
    state.root.className,
    menuButtonClassNames.root,
    state.root['aria-expanded'] && rootExpandedStyles.base,
    state.root['aria-expanded'] && rootExpandedStyles[state.appearance],
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuButtonClassNames.icon,
      state.root['aria-expanded'] && iconExpandedStyles[state.appearance] && iconExpandedStyles.highContrast,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      state.menuIcon.className,
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.notIconOnly,
      getSlotClassNameProp_unstable(state.menuIcon),
    );
  }

  return state;
};
