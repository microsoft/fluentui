import { ax, makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { useButtonStyles } from '../Button/useButtonStyles';
import { ToggleButtonState, ToggleButtonStyleSelectors, ToggleButtonVariantTokens } from './ToggleButton.types';

export const makeToggleButtonTokens = (theme: Theme): ToggleButtonVariantTokens => ({
  checked: {
    background: theme.alias.color.neutral.neutralBackground1Selected,
    color: theme.alias.color.neutral.neutralForeground1,

    borderColor: theme.alias.color.neutral.neutralStroke1,
    borderWidth: theme.global.strokeWidth.thin,

    // TODO: spec calls out "shadow 2 __lighter__", are we missing tokens?
    shadow: theme.alias.shadow.shadow2,

    hovered: {
      background: theme.alias.color.neutral.neutralBackground1Hover,
      borderColor: theme.alias.color.neutral.neutralStroke1Hover,
      color: theme.alias.color.neutral.neutralForeground1,

      // TODO: spec calls out "shadow 4 __lighter__", are we missing tokens?
      shadow: theme.alias.shadow.shadow4,
    },

    pressed: {
      background: theme.alias.color.neutral.neutralBackground1Pressed,
      borderColor: theme.alias.color.neutral.neutralStroke1Pressed,
      color: theme.alias.color.neutral.neutralForeground1,

      // TODO: spec calls out "shadow 2 __lighter__", are we missing tokens?
      shadow: theme.alias.shadow.shadow2,
    },
  },
  checkedPrimary: {
    background: theme.alias.color.brand.brandBackgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

    // TODO: spec calls out "shadow 2 __brand__", are we missing tokens?
    shadow: theme.alias.shadow.shadow2,

    hovered: {
      background: theme.alias.color.brand.brandBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

      // TODO: spec calls out "shadow 4 __brand__", are we missing tokens?
      shadow: theme.alias.shadow.shadow4,
    },

    pressed: {
      background: theme.alias.color.brand.brandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

      // TODO: spec calls out "shadow 2 __brand__", are we missing tokens?
      shadow: theme.alias.shadow.shadow2,
    },
  },
  checkedSubtle: {
    background: theme.alias.color.subtle.backgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.brandForeground2Selected,

    shadow: 'none',

    hovered: {
      background: theme.alias.color.subtle.backgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.brandForeground2Hover,

      shadow: 'none',
    },

    pressed: {
      background: theme.alias.color.subtle.backgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.brandForeground2Pressed,

      shadow: 'none',
    },
  },
  checkedTransparent: {
    background: theme.alias.color.transparent.backgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.brandForeground2Selected,

    shadow: 'none',

    hovered: {
      background: theme.alias.color.transparent.backgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.brandForeground2Hover,

      shadow: 'none',
    },

    pressed: {
      background: theme.alias.color.transparent.backgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.brandForeground2Pressed,

      shadow: 'none',
    },
  },
  disabled: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,

    shadow: 'none',

    hovered: {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      shadow: 'none',
    },

    pressed: {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,

      shadow: 'none',
    },
  },
  disabledPrimary: {
    borderColor: 'transparent',

    hovered: {
      borderColor: 'transparent',
    },

    pressed: {
      borderColor: 'transparent',
    },
  },
  disabledSubtle: {
    background: 'none',
    borderColor: 'transparent',

    hovered: {
      background: 'none',
      borderColor: 'transparent',
    },

    pressed: {
      background: 'none',
      borderColor: 'transparent',
    },
  },
  disabledTransparent: {
    background: 'none',
    borderColor: 'transparent',

    hovered: {
      background: 'none',
      borderColor: 'transparent',
    },

    pressed: {
      background: 'none',
      borderColor: 'transparent',
    },
  },
});

const useStyles = makeStyles({
  rootChecked: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checked?.background,
      color: toggleButtonTokens.checked?.color,

      borderColor: toggleButtonTokens.checked?.borderColor,
      borderWidth: toggleButtonTokens.checked?.borderWidth,

      boxShadow: toggleButtonTokens.checked?.shadow,

      ':hover': {
        background: toggleButtonTokens.checked?.hovered?.background,
        borderColor: toggleButtonTokens.checked?.hovered?.borderColor,
        color: toggleButtonTokens.checked?.hovered?.color,

        boxShadow: toggleButtonTokens.checked?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checked?.pressed?.background,
        borderColor: toggleButtonTokens.checked?.pressed?.borderColor,
        color: toggleButtonTokens.checked?.pressed?.color,

        boxShadow: toggleButtonTokens.checked?.pressed?.shadow,
      },
    };
  },
  rootCheckedPrimary: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checkedPrimary?.background,
      borderColor: toggleButtonTokens.checkedPrimary?.borderColor,
      color: toggleButtonTokens.checkedPrimary?.color,

      boxShadow: toggleButtonTokens.checkedPrimary?.shadow,

      ':hover': {
        background: toggleButtonTokens.checkedPrimary?.hovered?.background,
        borderColor: toggleButtonTokens.checkedPrimary?.hovered?.borderColor,
        color: toggleButtonTokens.checkedPrimary?.hovered?.color,

        boxShadow: toggleButtonTokens.checkedPrimary?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checkedPrimary?.pressed?.background,
        borderColor: toggleButtonTokens.checkedPrimary?.pressed?.borderColor,
        color: toggleButtonTokens.checkedPrimary?.pressed?.color,

        boxShadow: toggleButtonTokens.checkedPrimary?.pressed?.shadow,
      },
    };
  },
  rootCheckedSubtle: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checkedSubtle?.background,
      borderColor: toggleButtonTokens.checkedSubtle?.borderColor,
      color: toggleButtonTokens.checkedSubtle?.color,

      boxShadow: toggleButtonTokens.checkedSubtle?.shadow,

      ':hover': {
        background: toggleButtonTokens.checkedSubtle?.hovered?.background,
        borderColor: toggleButtonTokens.checkedSubtle?.hovered?.borderColor,
        color: toggleButtonTokens.checkedSubtle?.hovered?.color,

        boxShadow: toggleButtonTokens.checkedSubtle?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checkedSubtle?.pressed?.background,
        borderColor: toggleButtonTokens.checkedSubtle?.pressed?.borderColor,
        color: toggleButtonTokens.checkedSubtle?.pressed?.color,

        boxShadow: toggleButtonTokens.checkedSubtle?.pressed?.shadow,
      },
    };
  },
  rootCheckedTransparent: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checkedTransparent?.background,
      borderColor: toggleButtonTokens.checkedTransparent?.borderColor,
      color: toggleButtonTokens.checkedTransparent?.color,

      boxShadow: toggleButtonTokens.checkedTransparent?.shadow,

      ':hover': {
        background: toggleButtonTokens.checkedTransparent?.hovered?.background,
        borderColor: toggleButtonTokens.checkedTransparent?.hovered?.borderColor,
        color: toggleButtonTokens.checkedTransparent?.hovered?.color,

        boxShadow: toggleButtonTokens.checkedTransparent?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checkedTransparent?.pressed?.background,
        borderColor: toggleButtonTokens.checkedTransparent?.pressed?.borderColor,
        color: toggleButtonTokens.checkedTransparent?.pressed?.color,

        boxShadow: toggleButtonTokens.checkedTransparent?.pressed?.shadow,
      },
    };
  },
  rootDisabled: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.disabled?.background,
      borderColor: toggleButtonTokens.disabled?.borderColor,
      color: toggleButtonTokens.disabled?.color,

      boxShadow: toggleButtonTokens.disabled?.shadow,

      ':hover': {
        background: toggleButtonTokens.disabled?.hovered?.background,
        borderColor: toggleButtonTokens.disabled?.hovered?.borderColor,
        color: toggleButtonTokens.disabled?.hovered?.color,

        boxShadow: toggleButtonTokens.disabled?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.disabled?.pressed?.background,
        borderColor: toggleButtonTokens.disabled?.pressed?.borderColor,
        color: toggleButtonTokens.disabled?.pressed?.color,

        boxShadow: toggleButtonTokens.disabled?.pressed?.shadow,
      },
    };
  },
  rootDisabledPrimary: theme => {
    const buttonTokens = makeToggleButtonTokens(theme);

    return {
      borderColor: buttonTokens.disabledPrimary?.borderColor,

      ':hover': {
        borderColor: buttonTokens.disabledPrimary?.hovered?.borderColor,
      },

      ':active': {
        borderColor: buttonTokens.disabledPrimary?.pressed?.borderColor,
      },
    };
  },
  rootDisabledSubtle: theme => {
    const buttonTokens = makeToggleButtonTokens(theme);

    return {
      background: buttonTokens.disabledSubtle?.background,
      borderColor: buttonTokens.disabledSubtle?.borderColor,

      ':hover': {
        background: buttonTokens.disabledSubtle?.hovered?.background,
        borderColor: buttonTokens.disabledSubtle?.hovered?.borderColor,
      },

      ':active': {
        background: buttonTokens.disabledSubtle?.pressed?.background,
        borderColor: buttonTokens.disabledSubtle?.pressed?.borderColor,
      },
    };
  },
  rootDisabledTransparent: theme => {
    const buttonTokens = makeToggleButtonTokens(theme);

    return {
      background: buttonTokens.disabledTransparent?.background,
      borderColor: buttonTokens.disabledTransparent?.borderColor,

      ':hover': {
        background: buttonTokens.disabledTransparent?.hovered?.background,
        borderColor: buttonTokens.disabledTransparent?.hovered?.borderColor,
      },

      ':active': {
        background: buttonTokens.disabledTransparent?.pressed?.background,
        borderColor: buttonTokens.disabledTransparent?.pressed?.borderColor,
      },
    };
  },
});

export const useToggleButtonStyles = (state: ToggleButtonState, selectors: ToggleButtonStyleSelectors) => {
  // Save the classnames used in useButtonStyles and undefine them at the state level so that they are always applied
  // last.
  const { className: rootClassName } = state;
  useButtonStyles(state, selectors);

  const styles = useStyles();

  state.className = ax(
    state.className,
    selectors.checked && styles.rootChecked,
    selectors.checked && selectors.primary && styles.rootCheckedPrimary,
    selectors.checked && selectors.subtle && styles.rootCheckedSubtle,
    selectors.checked && selectors.transparent && styles.rootCheckedTransparent,
    selectors.disabled && styles.rootDisabled,
    selectors.disabled && selectors.primary && styles.rootDisabledPrimary,
    selectors.disabled && selectors.subtle && styles.rootDisabledSubtle,
    selectors.disabled && selectors.transparent && styles.rootDisabledTransparent,
    rootClassName,
  );
};
