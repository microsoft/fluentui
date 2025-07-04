import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
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
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),
    color: tokens.colorNeutralForeground1Selected,

    // Ensure state is retained over base hover
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
      ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),
      color: tokens.colorNeutralForeground1Selected,
    },

    // Ensure state is retained over base hover active
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
      ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),
      color: tokens.colorNeutralForeground1Selected,
    },
  },
  primary: {
    backgroundColor: tokens.colorBrandBackgroundSelected,
  },
  secondary: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    color: tokens.colorNeutralForeground1Selected,
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2Selected,
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

const useIconExpandedStyles = makeStyles({
  // Appearance variations
  outline: {
    color: tokens.colorNeutralForeground1Selected,
  },
  primary: {
    /* The primary styles are exactly the same as the base styles. */
  },
  secondary: {
    color: tokens.colorNeutralForeground1Selected,
  },
  subtle: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
  transparent: {
    color: tokens.colorNeutralForeground2BrandSelected,
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
    fontSize: '12px',
    height: '12px',
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
    width: '12px',
  },
  medium: {
    fontSize: '12px',
    height: '12px',
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
    width: '12px',
  },
  large: {
    fontSize: '16px',
    height: '16px',
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
    width: '16px',
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: semanticTokens.gapInsideCtrlSmDefault,
  },
});

export const useSemanticMenuButtonStyles = (_state: unknown): MenuButtonState => {
  'use no memo';

  const state = _state as MenuButtonState;

  const rootExpandedStyles = useRootExpandedStyles();
  const iconExpandedStyles = useIconExpandedStyles();
  const menuIconStyles = useMenuIconStyles();

  state.root.className = mergeClasses(
    menuButtonClassNames.root,
    state.root['aria-expanded'] && rootExpandedStyles.base,
    state.root['aria-expanded'] && rootExpandedStyles[state.appearance],
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      menuButtonClassNames.icon,
      state.root['aria-expanded'] && iconExpandedStyles[state.appearance] && iconExpandedStyles.highContrast,
      state.icon.className,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.notIconOnly,
      state.menuIcon.className,
      getSlotClassNameProp_unstable(state.menuIcon),
    );
  }

  useSemanticButtonStyles({ ...state, iconPosition: 'before' });

  return state;
};
