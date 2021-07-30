import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { buttonSpacing, useButtonStyles } from '../Button/useButtonStyles';
import { CompoundButtonState } from './CompoundButton.types';

const CompoundButtonClassNames = {
  secondaryContent: 'CompoundButton-secondaryContent',
};

const useRootStyles = makeStyles({
  base: theme => ({
    // TODO: remove unsafe property: https://caniuse.com/?search=gap
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
  base: {
    fontSize: '40px',
    height: '40px',
    width: '40px',
  },
});

const useContentContainerStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
});

const useSecondaryContentStyles = makeStyles({
  base: theme => ({
    lineHeight: '100%',
    marginTop: '4px',
    fontWeight: theme.global.type.fontWeights.regular,
  }),
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

  state.className = mergeClasses(
    rootStyles.base,
    rootStyles[state.size],
    state.primary && rootStyles.primary,
    state.subtle && rootStyles.subtle,
    state.transparent && rootStyles.transparent,
    (state.disabled || state.disabledFocusable) && rootStyles.disabled,
    state.iconOnly && rootIconOnlyStyles[state.size],
    state.className,
  );

  state.icon.className = mergeClasses(iconStyles.base, state.icon.className);

  state.contentContainer.className = mergeClasses(contentContainerStyles.base, state.contentContainer.className);

  state.secondaryContent.className = mergeClasses(
    CompoundButtonClassNames.secondaryContent,
    secondaryContentStyles.base,
    secondaryContentStyles[state.size],
    state.secondaryContent.className,
  );

  useButtonStyles(state);

  return state;
};
