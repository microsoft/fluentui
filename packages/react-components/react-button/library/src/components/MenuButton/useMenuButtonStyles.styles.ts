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
    color: `var(--ctrl-token-MenuButton-61, var(--semantic-token-MenuButton-62, ${tokens.colorNeutralForeground1Selected}))`,
  },
  primary: {
    backgroundColor: `var(--ctrl-token-MenuButton-63, var(--semantic-token-MenuButton-64, ${tokens.colorBrandBackgroundSelected}))`,
  },
  secondary: {
    backgroundColor: `var(--ctrl-token-MenuButton-65, var(--semantic-token-MenuButton-66, ${tokens.colorNeutralBackground1Selected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    color: `var(--ctrl-token-MenuButton-67, var(--semantic-token-MenuButton-68, ${tokens.colorNeutralForeground1Selected}))`,
  },
  subtle: {
    backgroundColor: `var(--ctrl-token-MenuButton-69, var(--semantic-token-MenuButton-70, ${tokens.colorSubtleBackgroundSelected}))`,
    color: `var(--ctrl-token-MenuButton-71, var(--semantic-token-MenuButton-72, ${tokens.colorNeutralForeground2Selected}))`,
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-MenuButton-73, var(--semantic-token-MenuButton-74, ${tokens.colorTransparentBackgroundSelected}))`,
    color: `var(--ctrl-token-MenuButton-75, var(--semantic-token-MenuButton-76, ${tokens.colorNeutralForeground2BrandSelected}))`,
  },
});

const useIconExpandedStyles = makeStyles({
  // Appearance variations
  outline: {
    color: `var(--ctrl-token-MenuButton-77, var(--semantic-token-MenuButton-78, ${tokens.colorNeutralForeground1Selected}))`,
  },
  primary: {
    /* The primary styles are exactly the same as the base styles. */
  },
  secondary: {
    color: `var(--ctrl-token-MenuButton-79, var(--semantic-token-MenuButton-80, ${tokens.colorNeutralForeground1Selected}))`,
  },
  subtle: {
    color: `var(--ctrl-token-MenuButton-81, var(--semantic-token-MenuButton-82, ${tokens.colorNeutralForeground2BrandSelected}))`,
  },
  transparent: {
    color: `var(--ctrl-token-MenuButton-83, var(--semantic-token-MenuButton-84, ${tokens.colorNeutralForeground2BrandSelected}))`,
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
    lineHeight: `var(--ctrl-token-MenuButton-85, var(--semantic-token-MenuButton-86, ${tokens.lineHeightBase200}))`,
    width: '12px',
  },
  medium: {
    fontSize: '12px',
    height: '12px',
    lineHeight: `var(--ctrl-token-MenuButton-87, var(--semantic-token-MenuButton-88, ${tokens.lineHeightBase200}))`,
    width: '12px',
  },
  large: {
    fontSize: '16px',
    height: '16px',
    lineHeight: `var(--ctrl-token-MenuButton-89, var(--semantic-token-MenuButton-90, ${tokens.lineHeightBase400}))`,
    width: '16px',
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: `var(--ctrl-token-MenuButton-91, var(--semantic-token-MenuButton-92, ${tokens.spacingHorizontalXS}))`,
  },
});

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
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
