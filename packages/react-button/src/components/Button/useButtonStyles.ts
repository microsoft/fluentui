import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
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
  // Base styles
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

  // Block styles
  block: {
    maxWidth: '100%',
    width: '100%',
  },

  // Appearance variations
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

  // Shape variations
  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: theme => ({
    borderRadius: theme.global.borderRadius.none,
  }),

  // Size variations
  small: theme => ({
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
    gap: buttonSpacing.small,
    padding: `0 ${buttonSpacing.larger}`,

    height: '40px',
    minWidth: '96px',

    borderRadius: theme.global.borderRadius.medium,

    fontSize: theme.global.type.fontSizes.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: theme => ({
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

  // Appearance variations
  outline: theme => ({
    background: theme.alias.color.neutral.transparentBackground,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
    },
  }),
  primary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  subtle: {
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
  transparent: {
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
  // TODO: `overflow: 'hidden'` on the root does not pay well with `position: absolute`
  // used by the outline pseudo-element. Need to introduce a text container for children and set
  // overflow there so that default focus outline can work
  //
  // base: theme => createFocusOutlineStyle(theme),
  // circular: theme =>
  //  createFocusOutlineStyle(theme, { style: { outlineRadius: theme.global.borderRadius.circular } }),
  // primary: theme => createFocusOutlineStyle(theme, { style: { outlineOffset: '2px' } }),
  // square: theme => createFocusOutlineStyle(theme, { style: { outlineRadius: theme.global.borderRadius.none } }),

  base: createCustomFocusIndicatorStyle(theme => ({
    borderColor: 'transparent',
    outline: '2px solid transparent',
    boxShadow: `
      ${theme.alias.shadow.shadow4},
      0 0 0 2px ${theme.alias.color.neutral.strokeFocus2}
    `,
    zIndex: 1,
  })),

  // Primary styles
  primary: createCustomFocusIndicatorStyle(theme => ({
    borderColor: theme.alias.color.neutral.neutralForegroundOnBrand,
    boxShadow: `${theme.alias.shadow.shadow2}, 0 0 0 2px ${theme.alias.color.neutral.strokeFocus2}`,
  })),
  square: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.global.borderRadius.none,
  })),

  // Size variations
  small: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.global.borderRadius.small,
  })),
  medium: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.global.borderRadius.medium,
  })),
  large: createCustomFocusIndicatorStyle(theme => ({
    borderRadius: theme.global.borderRadius.large,
  })),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
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
  // Base styles
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },

  // Size variations
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
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, block, disabled, disabledFocusable, iconOnly, shape, size } = state;

  state.root.className = mergeClasses(
    // Root styles
    rootStyles.base,
    block && rootStyles.block,
    appearance && rootStyles[appearance],
    rootStyles[size],
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    rootFocusStyles.base,
    appearance === 'primary' && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[size], state.icon.className);
  }

  return state;
};
