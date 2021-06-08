import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { ButtonState } from './Button.types';

// TODO: These are named in design specs but not hoisted to global/alias yet.
//       We're tracking these here to determine how we can hoist them.
export const buttonSpacing = {
  smallest: '2px',
  smaller: '4px',
  small: '6px',
  medium: '8px',
  large: '12px',
  larger: '16px',
};

const useStyles = makeStyles({
  root: theme => ({
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',

    margin: 0,

    maxWidth: '280px',

    background: theme.alias.color.neutral.neutralBackground1,
    borderColor: theme.alias.color.neutral.neutralStroke1,
    color: theme.alias.color.neutral.neutralForeground1,

    borderStyle: 'solid',
    borderWidth: theme.global.strokeWidth.thin,

    boxShadow: theme.alias.shadow.shadow4,
    outline: 'none',

    ':hover': {
      background: theme.alias.color.neutral.neutralBackground1Hover,
      borderColor: theme.alias.color.neutral.neutralStroke1Hover,
      color: theme.alias.color.neutral.neutralForeground1,

      boxShadow: theme.alias.shadow.shadow4,
      cursor: 'pointer',
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackground1Pressed,
      borderColor: theme.alias.color.neutral.neutralStroke1Pressed,
      color: theme.alias.color.neutral.neutralForeground1,

      boxShadow: theme.alias.shadow.shadow2,
      outline: 'none',
    },
  }),
  rootSmall: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.smaller,
    padding: `0 ${buttonSpacing.medium}`,

    height: '24px',
    minWidth: '64px',

    borderRadius: theme.global.borderRadius.small,
  }),
  rootMedium: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.large}`,

    height: '32px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,
  }),
  rootLarge: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.larger}`,

    height: '40px',

    borderRadius: theme.global.borderRadius.medium,
  }),
  rootPrimary: theme => ({
    background: theme.alias.color.neutral.brandBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

    boxShadow: theme.alias.shadow.shadow4,

    ':hover': {
      background: theme.alias.color.neutral.brandBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

      boxShadow: theme.alias.shadow.shadow4,
    },

    ':active': {
      background: theme.alias.color.neutral.brandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

      boxShadow: theme.alias.shadow.shadow2,
    },
  }),
  rootSubtle: theme => ({
    background: theme.alias.color.neutral.subtleBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2,

    boxShadow: 'none',

    ':hover': {
      background: theme.alias.color.neutral.subtleBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,

      boxShadow: 'none',
    },

    ':active': {
      background: theme.alias.color.neutral.subtleBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,

      boxShadow: 'none',
    },
  }),
  rootTransparent: theme => ({
    background: theme.alias.color.neutral.transparentBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2,

    boxShadow: 'none',

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,

      boxShadow: 'none',
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,

      boxShadow: 'none',
    },
  }),
  rootDisabled: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,

    boxShadow: 'none',

    cursor: 'default',

    ':hover': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      boxShadow: 'none',
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      boxShadow: 'none',
    },
  }),
  rootDisabledPrimary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  rootDisabledSubtle: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
    },
  },
  rootDisabledTransparent: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
    },
  },
  rootIconOnlySmall: {
    padding: buttonSpacing.smaller,

    minWidth: '28px',
    maxWidth: '28px',
  },
  rootIconOnlyMedium: {
    padding: buttonSpacing.smaller,

    minWidth: '32px',
    maxWidth: '32px',
  },
  rootIconOnlyLarge: {
    padding: buttonSpacing.small,

    minWidth: '40px',
    maxWidth: '40px',
  },
  children: theme => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }),
  childrenSmall: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
    lineHeight: theme.global.type.lineHeights.base[200],
  }),
  childrenMedium: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  childrenLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
  icon: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  iconSmall: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  iconMedium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  iconLarge: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
});

export const useButtonStyles = (state: ButtonState) => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state.primary && styles.rootPrimary,
    state.subtle && styles.rootSubtle,
    state.transparent && styles.rootTransparent,
    state.disabled && styles.rootDisabled,
    state.disabled && state.primary && styles.rootDisabledPrimary,
    state.disabled && state.subtle && styles.rootDisabledSubtle,
    state.disabled && state.transparent && styles.rootDisabledTransparent,
    styles[`root${capitalizeString(state.size)}` as `root${Capitalize<ButtonState['size']>}`],
    state.iconOnly &&
      styles[`rootIconOnly${capitalizeString(state.size)}` as `rootIconOnly${Capitalize<ButtonState['size']>}`],
    state.className,
  );

  if (state.children) {
    state.children.className = mergeClasses(
      styles.children,
      styles[`children${capitalizeString(state.size)}` as `children${Capitalize<ButtonState['size']>}`],
      state.children.className,
    );
  }

  state.icon.className = mergeClasses(
    styles.icon,
    styles[`icon${capitalizeString(state.size)}` as `icon${Capitalize<ButtonState['size']>}`],
    state.icon.className,
  );
};

function capitalizeString(s: ButtonState['size']): string {
  return s[0].toUpperCase() + s.slice(1);
}
