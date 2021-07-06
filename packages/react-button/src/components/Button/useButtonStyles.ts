import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
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

const useRootStyles = makeStyles({
  base: theme => ({
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
  focusIndicator: createFocusIndicatorStyleRule(theme => ({
    border: `2px solid ${theme.alias.color.neutral.neutralForeground1}`,
    borderRadius: '4px',
  })),
  small: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.smaller,
    padding: `0 ${buttonSpacing.medium}`,

    height: '24px',
    minWidth: '64px',

    borderRadius: theme.global.borderRadius.small,
  }),
  medium: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.large}`,

    height: '32px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,
  }),
  large: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.larger}`,

    height: '40px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,
  }),
  primary: theme => ({
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
  subtle: theme => ({
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
  transparent: theme => ({
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
  disabled: theme => ({
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
  disabledPrimary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  disabledSubtle: {
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
  disabledTransparent: {
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
});

const useRootIconOnlyStyles = makeStyles({
  small: {
    padding: buttonSpacing.smaller,

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    padding: buttonSpacing.smaller,

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: buttonSpacing.small,

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useChildrenStyles = makeStyles({
  base: theme => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }),
  small: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
    lineHeight: theme.global.type.lineHeights.base[200],
  }),
  medium: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  large: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
});

const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
});

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const childrenStyles = useChildrenStyles();
  const iconStyles = useIconStyles();

  state.className = mergeClasses(
    rootStyles.base,
    rootStyles.focusIndicator,
    rootStyles[state.size],
    state.primary && rootStyles.primary,
    state.subtle && rootStyles.subtle,
    state.transparent && rootStyles.transparent,
    state.disabled && rootStyles.disabled,
    state.disabled && state.primary && rootStyles.disabledPrimary,
    state.disabled && state.subtle && rootStyles.disabledSubtle,
    state.disabled && state.transparent && rootStyles.disabledTransparent,
    state.iconOnly && rootIconOnlyStyles[state.size],
    state.className,
  );

  if (state.children) {
    state.children.className = mergeClasses(childrenStyles.base, childrenStyles[state.size], state.children.className);
  }

  state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);

  return state;
};
