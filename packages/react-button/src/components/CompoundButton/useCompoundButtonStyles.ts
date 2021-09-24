import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { buttonSpacing, useButtonStyles } from '../Button/useButtonStyles';
import type { CompoundButtonState } from './CompoundButton.types';

const CompoundButtonClassNames = {
  secondaryContent: 'CompoundButton-secondaryContent',
};

const useRootStyles = makeStyles({
  // Base styles
  base: theme => ({
    gap: buttonSpacing.large,

    height: 'auto',

    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2Hover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2Pressed,
      },
    },
  }),

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForegroundOnBrand,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundOnBrand,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundOnBrand,
      },
    },
  }),
  subtle: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2BrandPressed,
      },
    },
  }),
  transparent: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForeground2BrandPressed,
      },
    },
  }),

  // Size variations
  small: theme => ({
    padding: buttonSpacing.medium,

    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  medium: theme => ({
    padding: buttonSpacing.large,

    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  large: theme => ({
    padding: buttonSpacing.larger,

    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
  }),

  // Disabled styles
  disabled: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundDisabled,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundDisabled,
      },
    },
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: buttonSpacing.smaller,

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    padding: buttonSpacing.small,

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    padding: buttonSpacing.medium,

    maxWidth: '56px',
    minWidth: '56px',
  },
});

const useIconStyles = makeStyles({
  // Base styles
  base: {
    fontSize: '40px',
    height: '40px',
    width: '40px',
  },
});

const useContentContainerStyles = makeStyles({
  // Base styles
  base: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
});

const useSecondaryContentStyles = makeStyles({
  // Base styles
  base: theme => ({
    lineHeight: '100%',
    marginTop: '4px',
    fontWeight: theme.global.type.fontWeights.regular,
  }),

  // Size variations
  small: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
  }),
  medium: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
  }),
  large: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
  }),
});

export const useCompoundButtonStyles = (state: CompoundButtonState): CompoundButtonState => {
  const rootStyles = useRootStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const contentContainerStyles = useContentContainerStyles();
  const secondaryContentStyles = useSecondaryContentStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, size } = state;

  state.root.className = mergeClasses(
    // Root styles
    rootStyles.base,
    appearance && rootStyles[appearance],
    rootStyles[size],

    // Disabled styles
    (disabled || disabledFocusable) && rootStyles.disabled,

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, state.icon.className);
  }

  state.contentContainer.className = mergeClasses(contentContainerStyles.base, state.contentContainer.className);

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      CompoundButtonClassNames.secondaryContent,
      secondaryContentStyles.base,
      secondaryContentStyles[size],
      state.secondaryContent.className,
    );
  }

  useButtonStyles(state);

  return state;
};
