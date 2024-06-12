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
    color: `var(--61, var(--62, ${tokens.colorNeutralForeground1Selected}))`,
  },
  primary: {
    backgroundColor: `var(--63, var(--64, ${tokens.colorBrandBackgroundSelected}))`,
  },
  secondary: {
    backgroundColor: `var(--65, var(--66, ${tokens.colorNeutralBackground1Selected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    color: `var(--67, var(--68, ${tokens.colorNeutralForeground1Selected}))`,
  },
  subtle: {
    backgroundColor: `var(--69, var(--70, ${tokens.colorSubtleBackgroundSelected}))`,
    color: `var(--71, var(--72, ${tokens.colorNeutralForeground2Selected}))`,
  },
  transparent: {
    backgroundColor: `var(--73, var(--74, ${tokens.colorTransparentBackgroundSelected}))`,
    color: `var(--75, var(--76, ${tokens.colorNeutralForeground2BrandSelected}))`,
  },
});

const useIconExpandedStyles = makeStyles({
  // Appearance variations
  outline: {
    color: `var(--77, var(--78, ${tokens.colorNeutralForeground1Selected}))`,
  },
  primary: {
    /* The primary styles are exactly the same as the base styles. */
  },
  secondary: {
    color: `var(--79, var(--80, ${tokens.colorNeutralForeground1Selected}))`,
  },
  subtle: {
    color: `var(--81, var(--82, ${tokens.colorNeutralForeground2BrandSelected}))`,
  },
  transparent: {
    color: `var(--83, var(--84, ${tokens.colorNeutralForeground2BrandSelected}))`,
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
    lineHeight: `var(--85, var(--86, ${tokens.lineHeightBase200}))`,
    width: '12px',
  },
  medium: {
    fontSize: '12px',
    height: '12px',
    lineHeight: `var(--87, var(--88, ${tokens.lineHeightBase200}))`,
    width: '12px',
  },
  large: {
    fontSize: '16px',
    height: '16px',
    lineHeight: `var(--89, var(--90, ${tokens.lineHeightBase400}))`,
    width: '16px',
  },

  // Not-icon only
  notIconOnly: {
    marginLeft: `var(--91, var(--92, ${tokens.spacingHorizontalXS}))`,
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
