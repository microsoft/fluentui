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
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,

    borderColor: 'transparent',

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
  disabled: {
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,

    hovered: {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    pressed: {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  },
});

const useStyles = makeStyles({
  rootChecked: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checked?.background,
      borderColor: toggleButtonTokens.checked?.borderColor,
      borderWidth: toggleButtonTokens.checked?.borderWidth,
      shadow: toggleButtonTokens.checked?.shadow,

      ':hover': {
        background: toggleButtonTokens.checked?.hovered?.background,
        borderColor: toggleButtonTokens.checked?.hovered?.borderColor,
        shadow: toggleButtonTokens.checked?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checked?.pressed?.background,
        borderColor: toggleButtonTokens.checked?.pressed?.borderColor,
        shadow: toggleButtonTokens.checked?.pressed?.shadow,
      },
    };
  },
  rootCheckedPrimary: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.checkedPrimary?.background,
      borderColor: toggleButtonTokens.checkedPrimary?.borderColor,
      shadow: toggleButtonTokens.checkedPrimary?.shadow,

      ':hover': {
        background: toggleButtonTokens.checkedPrimary?.hovered?.background,
        borderColor: toggleButtonTokens.checkedPrimary?.hovered?.borderColor,
        shadow: toggleButtonTokens.checkedPrimary?.hovered?.shadow,
      },

      ':active': {
        background: toggleButtonTokens.checkedPrimary?.pressed?.background,
        borderColor: toggleButtonTokens.checkedPrimary?.pressed?.borderColor,
        shadow: toggleButtonTokens.checkedPrimary?.pressed?.shadow,
      },
    };
  },
  rootDisabled: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      background: toggleButtonTokens.disabled?.background,
      borderColor: toggleButtonTokens.disabled?.borderColor,

      ':hover': {
        background: toggleButtonTokens.disabled?.hovered?.background,
        borderColor: toggleButtonTokens.disabled?.hovered?.borderColor,
      },

      ':active': {
        background: toggleButtonTokens.disabled?.pressed?.background,
        borderColor: toggleButtonTokens.disabled?.pressed?.borderColor,
      },
    };
  },
  childrenChecked: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      color: toggleButtonTokens.checked?.color,

      ':hover': {
        color: toggleButtonTokens.checked?.hovered?.color,
      },

      ':active': {
        color: toggleButtonTokens.checked?.pressed?.color,
      },
    };
  },
  childrenCheckedPrimary: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      color: toggleButtonTokens.checkedPrimary?.color,

      ':hover': {
        color: toggleButtonTokens.checkedPrimary?.hovered?.color,
      },

      ':active': {
        color: toggleButtonTokens.checkedPrimary?.pressed?.color,
      },
    };
  },
  childrenDisabled: theme => {
    const toggleButtonTokens = makeToggleButtonTokens(theme);

    return {
      color: toggleButtonTokens.disabled?.color,

      ':hover': {
        color: toggleButtonTokens.disabled?.hovered?.color,
      },

      ':active': {
        color: toggleButtonTokens.disabled?.pressed?.color,
      },
    };
  },
});

export const useToggleButtonStyles = (state: ToggleButtonState, selectors: ToggleButtonStyleSelectors) => {
  // Save the classnames used in useButtonStyles and undefine them at the state level so that they are always applied
  // last.
  const { className: rootClassName, children: { className: childrenClassName } = { className: undefined } } = state;
  state.className = undefined;
  if (state.children) {
    state.children.className = undefined;
  }
  useButtonStyles(state, selectors);

  const styles = useStyles();

  state.className = ax(
    state.className,
    selectors.checked && styles.rootChecked,
    selectors.checked && selectors.primary && styles.rootCheckedPrimary,
    selectors.disabled && styles.rootDisabled,
    rootClassName,
  );

  if (state.children) {
    state.children.className = ax(
      state.children.className,
      selectors.checked && styles.childrenChecked,
      selectors.checked && selectors.primary && styles.childrenCheckedPrimary,
      selectors.disabled && styles.childrenDisabled,
      childrenClassName,
    );
  }
};
