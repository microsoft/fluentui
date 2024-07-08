import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

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
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
    color: tokens.colorNeutralForeground1Selected,
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
        color: 'Canvas',
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
    lineHeight: tokens.lineHeightBase200,
    width: '12px',
  },
  medium: {
    fontSize: '12px',
    height: '12px',
    lineHeight: tokens.lineHeightBase200,
    width: '12px',
  },
  large: {
    fontSize: '16px',
    height: '16px',
    lineHeight: tokens.lineHeightBase400,
    width: '16px',
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: tokens.spacingHorizontalXS,
  },
});

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  'use no memo';

  const rootExpandedStyles = useRootExpandedStyles();
  const iconExpandedStyles = useIconExpandedStyles();
  const menuIconStyles = useMenuIconStyles();

  state.root.className = mergeClasses(
    menuButtonClassNames.root,
    state.root['aria-expanded'] && rootExpandedStyles.base,
    state.root['aria-expanded'] && rootExpandedStyles[state.appearance],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      menuButtonClassNames.icon,
      state.root['aria-expanded'] && iconExpandedStyles[state.appearance] && iconExpandedStyles.highContrast,
      state.icon.className,
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[state.size],
      !state.iconOnly && menuIconStyles.notIconOnly,
      state.menuIcon.className,
    );
  }

  useButtonStyles_unstable({ ...state, iconPosition: 'before' });

  return state;
};
