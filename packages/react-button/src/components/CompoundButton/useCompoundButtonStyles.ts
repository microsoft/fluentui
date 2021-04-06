import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { buttonSpacing, useButtonStyles } from '../Button/useButtonStyles';
import { CompoundButtonState, CompoundButtonStyleSelectors, CompoundButtonVariantTokens } from './CompoundButton.types';

export const makeCompoundButtonTokens = (theme: Theme): CompoundButtonVariantTokens => ({
  base: {
    // root tokens
    height: 'auto',
    paddingX: buttonSpacing.large,
    paddingY: buttonSpacing.large,

    // icon tokens
    iconFontSize: '40px',
    iconSpacing: buttonSpacing.large,
    iconHeight: '40px',
    iconWidth: '40px',

    // secondary content tokens
    secondaryContentColor: theme.alias.color.neutral.neutralForeground2,
    secondaryContentFontSize: theme.global.type.fontSizes.base[200],
    secondaryContentFontWeight: theme.global.type.fontWeights.regular,
    secondaryContentGap: buttonSpacing.smaller,

    hovered: {
      secondaryContentColor: theme.alias.color.neutral.neutralForeground2Hover,
    },

    pressed: {
      secondaryContentColor: theme.alias.color.neutral.neutralForeground2Pressed,
    },
  },
  small: {
    paddingX: buttonSpacing.medium,
    paddingY: buttonSpacing.medium,

    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  },
  large: {
    paddingX: buttonSpacing.larger,
    paddingY: buttonSpacing.larger,

    secondaryContentFontSize: theme.global.type.fontSizes.base[300],
  },
  iconOnly: {
    maxWidth: '52px',
    minWidth: '52px',
  },
  iconOnlySmall: {
    maxWidth: '48px',
    minWidth: '48px',
  },
  iconOnlyLarge: {
    maxWidth: '56px',
    minWidth: '56px',
  },
  primary: {
    secondaryContentColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

    hovered: {
      secondaryContentColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    },

    pressed: {
      secondaryContentColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    },
  },
  disabled: {
    secondaryContentColor: theme.alias.color.neutral.neutralForegroundDisabled,

    hovered: {
      secondaryContentColor: theme.alias.color.neutral.neutralForeground2Hover,
    },

    pressed: {
      secondaryContentColor: theme.alias.color.neutral.neutralForeground2Pressed,
    },
  },
});

const useStyles = makeStyles({
  root: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      gap: compoundButtonTokens.base?.iconSpacing,
      height: compoundButtonTokens.base?.height,
      padding: `${compoundButtonTokens.base?.paddingY} ${compoundButtonTokens.base?.paddingX}`,
    };
  },
  rootSmall: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      padding: `${compoundButtonTokens.small?.paddingY} ${compoundButtonTokens.small?.paddingX}`,
    };
  },
  rootLarge: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      padding: `${compoundButtonTokens.large?.paddingY} ${compoundButtonTokens.large?.paddingX}`,
    };
  },
  rootIconOnly: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      maxWidth: compoundButtonTokens.iconOnly?.maxWidth,
      minWidth: compoundButtonTokens.iconOnly?.minWidth,
    };
  },
  rootIconOnlySmall: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      maxWidth: compoundButtonTokens.iconOnlySmall?.maxWidth,
      minWidth: compoundButtonTokens.iconOnlySmall?.minWidth,
    };
  },
  rootIconOnlyLarge: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      maxWidth: compoundButtonTokens.iconOnlyLarge?.maxWidth,
      minWidth: compoundButtonTokens.iconOnlyLarge?.minWidth,
    };
  },
  childrenSmall: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      fontSize: compoundButtonTokens.small?.fontSize,
      lineHeight: compoundButtonTokens.small?.lineHeight,
    };
  },
  icon: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      fontSize: compoundButtonTokens.base?.iconFontSize,
      height: compoundButtonTokens.base?.iconHeight,
      width: compoundButtonTokens.base?.iconWidth,
    };
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  secondaryContent: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      lineHeight: '100%',

      color: compoundButtonTokens.base?.secondaryContentColor,
      fontSize: compoundButtonTokens.base?.secondaryContentFontSize,
      fontWeight: compoundButtonTokens.base?.secondaryContentFontWeight,
      marginTop: compoundButtonTokens.base?.secondaryContentGap,

      ':hover': {
        color: compoundButtonTokens.base?.hovered?.secondaryContentColor,
      },

      ':active': {
        color: compoundButtonTokens.base?.pressed?.secondaryContentColor,
      },
    };
  },
  secondaryContentLarge: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      fontSize: compoundButtonTokens.large?.secondaryContentFontSize,
    };
  },
  secondaryContentPrimary: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      color: compoundButtonTokens.primary?.secondaryContentColor,

      ':hover': {
        color: compoundButtonTokens.primary?.hovered?.secondaryContentColor,
      },

      ':active': {
        color: compoundButtonTokens.primary?.pressed?.secondaryContentColor,
      },
    };
  },
  secondaryContentDisabled: theme => {
    const compoundButtonTokens = makeCompoundButtonTokens(theme);

    return {
      color: compoundButtonTokens.disabled?.secondaryContentColor,

      ':hover': {
        color: compoundButtonTokens.disabled?.hovered?.secondaryContentColor,
      },

      ':active': {
        color: compoundButtonTokens.disabled?.pressed?.secondaryContentColor,
      },
    };
  },
});

export const useCompoundButtonStyles = (state: CompoundButtonState, selectors: CompoundButtonStyleSelectors) => {
  // Save the classnames used in useButtonStyles and undefine them at the state level so that they are always applied
  // last.
  const {
    className: rootClassName,
    children: { className: childrenClassName } = { className: undefined },
    icon: { className: iconClassName } = { className: undefined },
  } = state;
  state.className = undefined;
  if (state.children) {
    state.children.className = undefined;
  }
  if (state.icon) {
    state.icon.className = undefined;
  }
  useButtonStyles(state, selectors);

  const styles = useStyles();

  state.className = useAx(
    state.className,
    styles.root,
    selectors.size === 'small' && styles.rootSmall,
    selectors.size === 'large' && styles.rootLarge,
    selectors.iconOnly && styles.rootIconOnly,
    selectors.iconOnly && selectors.size === 'small' && styles.rootIconOnlySmall,
    selectors.iconOnly && selectors.size === 'large' && styles.rootIconOnlyLarge,
    rootClassName,
  );

  if (state.children) {
    state.children.className = useAx(
      state.children.className,
      selectors.size === 'small' && styles.childrenSmall,
      childrenClassName,
    );
  }

  if (state.icon) {
    state.icon.className = useAx(state.icon.className, styles.icon, iconClassName);
  }

  if (state.contentContainer) {
    state.contentContainer.className = useAx(styles.contentContainer, state.contentContainer.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = useAx(
      styles.secondaryContent,
      selectors.size === 'large' && styles.secondaryContentLarge,
      selectors.primary && styles.secondaryContentPrimary,
      selectors.disabled && styles.secondaryContentDisabled,
      state.secondaryContent.className,
    );
  }
};
