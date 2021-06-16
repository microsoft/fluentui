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
  small: {
    padding: buttonSpacing.medium,
  },
  medium: {
    padding: buttonSpacing.large,
  },
  large: {
    padding: buttonSpacing.larger,
  },
  primary: theme => ({
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
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
    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    maxWidth: '56px',
    minWidth: '56px',
  },
});

const useChildrenStyles = makeStyles({
  small: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  medium: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  large: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
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
    marginTop: buttonSpacing.smaller,

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
  const childrenStyles = useChildrenStyles();
  const iconStyles = useIconStyles();
  const contentContainerStyles = useContentContainerStyles();
  const secondaryContentStyles = useSecondaryContentStyles();

  state.className = mergeClasses(
    rootStyles.base,
    rootStyles[state.size],
    state.primary && rootStyles.primary,
    state.subtle && rootStyles.subtle,
    state.transparent && rootStyles.transparent,
    state.disabled && rootStyles.disabled,
    state.iconOnly && rootIconOnlyStyles[state.size],
    state.className,
  );

  if (state.children) {
    state.children.className = mergeClasses(childrenStyles[state.size], state.children.className);
  }

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
