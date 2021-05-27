import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { SplitButtonState, SplitButtonStyleSelectors, SplitButtonVariantTokens } from './SplitButton.types';

const SplitButtonClassNames = {
  button: 'SplitButton-button',
  menuButton: 'SplitButton-menuButton',
};

export const makeSplitButtonTokens = (theme: Theme): SplitButtonVariantTokens => ({
  primary: {
    dividerColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
  },
  disabledPrimary: {
    dividerColor: theme.alias.color.neutral.neutralStrokeDisabled,
  },
});

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    justifyContent: 'stretch',
    position: 'relative',

    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.menuButton}`]: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }),
  rootPrimary: theme => {
    const splitButtonTokens = makeSplitButtonTokens(theme);

    return {
      // Use classnames to increase specificy of styles and avoid collisions.
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: splitButtonTokens.primary?.dividerColor,
      },

      ':hover': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: splitButtonTokens.primary?.dividerColor,
        },
      },

      ':active': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: splitButtonTokens.primary?.dividerColor,
        },
      },
    };
  },
  rootDisabledPrimary: theme => {
    const splitButtonTokens = makeSplitButtonTokens(theme);

    return {
      // Use classnames to increase specificy of styles and avoid collisions.
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: splitButtonTokens.disabledPrimary?.dividerColor,
      },

      ':hover': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: splitButtonTokens.disabledPrimary?.dividerColor,
        },
      },

      ':active': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: splitButtonTokens.disabledPrimary?.dividerColor,
        },
      },
    };
  },
});

export const useSplitButtonStyles = (state: SplitButtonState, selectors: SplitButtonStyleSelectors) => {
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    selectors.primary && styles.rootPrimary,
    selectors.disabled && selectors.primary && styles.rootDisabledPrimary,
    state.className,
  );

  if (state.button) {
    state.button.className = mergeClasses(SplitButtonClassNames.button, state.button.className);
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(SplitButtonClassNames.menuButton, state.menuButton.className);
  }
};
