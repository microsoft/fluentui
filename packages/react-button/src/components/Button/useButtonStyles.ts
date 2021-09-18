import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { ButtonState } from './Button.types';

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

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    background: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    borderColor: theme.alias.color.neutral.neutralStroke1,
    borderStyle: 'solid',
    borderWidth: theme.global.strokeWidth.thin,

    fontFamily: theme.global.type.fontFamilies.base,

    outline: 'none',

    ':hover': {
      background: theme.alias.color.neutral.neutralBackground1Hover,
      borderColor: theme.alias.color.neutral.neutralStroke1Hover,
      color: theme.alias.color.neutral.neutralForeground1,

      cursor: 'pointer',
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackground1Pressed,
      borderColor: theme.alias.color.neutral.neutralStroke1Pressed,
      color: theme.alias.color.neutral.neutralForeground1,

      outline: 'none',
    },
  }),
  small: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.smaller,
    padding: `0 ${buttonSpacing.medium}`,

    height: '24px',
    minWidth: '64px',

    borderRadius: theme.global.borderRadius.small,

    fontSize: theme.global.type.fontSizes.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
    lineHeight: theme.global.type.lineHeights.base[200],
  }),
  medium: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.large}`,

    height: '32px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,

    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  large: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.larger}`,

    height: '40px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,

    fontSize: theme.global.type.fontSizes.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
  block: {
    maxWidth: '100%',
    width: '100%',
  },
  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),
  outline: theme => ({
    background: theme.alias.color.neutral.transparentBackground,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    background: theme.alias.color.neutral.brandBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForegroundOnBrand,

    ':hover': {
      background: theme.alias.color.neutral.brandBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundOnBrand,
    },

    ':active': {
      background: theme.alias.color.neutral.brandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    background: theme.alias.color.neutral.subtleBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2,

    ':hover': {
      background: theme.alias.color.neutral.subtleBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,
    },

    ':active': {
      background: theme.alias.color.neutral.subtleBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,
    },
  }),
  transparent: theme => ({
    background: theme.alias.color.neutral.transparentBackground,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,
    },
  }),
  disabled: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      cursor: 'not-allowed',
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      cursor: 'not-allowed',
    },
  }),
  disabledOutline: theme => ({
    background: theme.alias.color.neutral.transparentBackground,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
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

const useRootFocusStyles = makeStyles({
  base: createFocusIndicatorStyleRule(theme => ({
    borderColor: 'transparent',
    boxShadow: `
      ${theme.alias.shadow.shadow4},
      0 0 0 2px ${theme.alias.color.neutral.strokeFocus2}
    `,
    zIndex: 1,
  })),
  circular: createFocusIndicatorStyleRule(theme => ({
    borderRadius: theme.global.borderRadius.circular,
  })),
  primary: createFocusIndicatorStyleRule(theme => ({
    borderColor: theme.alias.color.neutral.neutralForegroundOnBrand,
    boxShadow: `${theme.alias.shadow.shadow2}, 0 0 0 2px ${theme.alias.color.neutral.strokeFocus2}`,
  })),
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
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  state.className = mergeClasses(
    rootStyles.base,
    rootFocusStyles.base,
    rootStyles[state.size],
    state.block && rootStyles.block,
    state.circular && rootStyles.circular,
    state.circular && rootFocusStyles.circular,
    state.outline && rootStyles.outline,
    state.primary && rootStyles.primary,
    state.primary && rootFocusStyles.primary,
    state.subtle && rootStyles.subtle,
    state.transparent && rootStyles.transparent,
    (state.disabled || state.disabledFocusable) && rootStyles.disabled,
    (state.disabled || state.disabledFocusable) && state.outline && rootStyles.disabledOutline,
    (state.disabled || state.disabledFocusable) && state.primary && rootStyles.disabledPrimary,
    (state.disabled || state.disabledFocusable) && state.subtle && rootStyles.disabledSubtle,
    (state.disabled || state.disabledFocusable) && state.transparent && rootStyles.disabledTransparent,
    state.iconOnly && rootIconOnlyStyles[state.size],
    state.className,
  );

  state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);

  return state;
};
