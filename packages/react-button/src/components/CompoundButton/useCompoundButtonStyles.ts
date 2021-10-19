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
      color: theme.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2Hover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2Pressed,
      },
    },
  }),

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.colorNeutralForegroundOnBrand,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForegroundOnBrand,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForegroundOnBrand,
      },
    },
  }),
  subtle: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2BrandPressed,
      },
    },
  }),
  transparent: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForeground2BrandPressed,
      },
    },
  }),

  // Size variations
  small: theme => ({
    padding: buttonSpacing.medium,

    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
  }),
  medium: theme => ({
    padding: buttonSpacing.large,

    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
  }),
  large: theme => ({
    padding: buttonSpacing.larger,

    fontSize: theme.fontSizeBase400,
    lineHeight: theme.lineHeightBase400,
  }),

  // Disabled styles
  disabled: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.colorNeutralForegroundDisabled,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForegroundDisabled,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.colorNeutralForegroundDisabled,
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
    fontWeight: theme.fontWeightRegular,
  }),

  // Size variations
  small: theme => ({
    fontSize: theme.fontSizeBase200,
  }),
  medium: theme => ({
    fontSize: theme.fontSizeBase200,
  }),
  large: theme => ({
    fontSize: theme.fontSizeBase300,
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
