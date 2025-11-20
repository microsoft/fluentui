'use client';

import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ComboboxState } from '@fluentui/react-combobox';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

// Matches internal heights for Select and Input, but there are no theme variables for these
const fieldHeights = {
  small: `calc(${semanticTokens.groupInputMinheight} * 0.75)`,
  medium: semanticTokens.groupInputMinheight,
  large: `calc(${semanticTokens.groupInputMinheight} * 1.25)`,
};

const inputPadding = {
  small: `calc(${semanticTokens.groupInputPaddingHorizontal} / 2)`,
  medium: `calc(${semanticTokens.groupInputPaddingHorizontal} / 6 * 5)`,
  large: semanticTokens.groupInputPaddingHorizontal,
};

const inputGap = {
  small: `calc(${semanticTokens.groupInputGap} / 2)`,
  medium: `calc(${semanticTokens.groupInputGap} / 2)`,
  large: `calc(${semanticTokens.groupInputGap} * 1.5)`,
};

// Maintaining the correct corner radius:
// Use the whole border-radius as the height and only put radii on the bottom corners.
// (Otherwise the radius would be automatically reduced to fit available space.)
// max() ensures the focus border still shows up even if someone sets semanticTokens.groupInputCorner to 0.
const inputBottomFocusBorderStrokewidth = `max(${semanticTokens.groupInputUnderlineStrokewidthSelected}, ${semanticTokens.groupInputCorner})`;

/**
 * Styles for Combobox
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    borderRadius: semanticTokens.groupInputCorner,
    boxSizing: 'border-box',
    columnGap: `calc(${semanticTokens.groupInputGap} / 2)`,
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    minWidth: '250px',
    position: 'relative',
    verticalAlign: 'middle',

    // windows high contrast mode focus indicator
    ':focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },

    // bottom focus border, shared with Input, Select, and SpinButton
    '::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',
      height: inputBottomFocusBorderStrokewidth,
      borderBottomLeftRadius: semanticTokens.groupInputCorner,
      borderBottomRightRadius: semanticTokens.groupInputCorner,
      borderBottom: `${semanticTokens.groupInputUnderlineStrokewidthSelected} solid ${semanticTokens.groupInputUnderlineStrokeSelected}`,
      clipPath: `inset(calc(100% - ${semanticTokens.groupInputUnderlineStrokewidthSelected}) 0 0 0)`,
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeSelectedPressed,
    },
  },

  listbox: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: semanticTokens.groupInputCorner,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: {
    zIndex: 1,
  },
  // size variants
  small: {
    height: fieldHeights.small,
    paddingRight: inputPadding.small,
  },
  medium: {
    height: fieldHeights.medium,
    paddingRight: inputPadding.medium,
  },
  large: {
    columnGap: inputGap.large,
    height: fieldHeights.large,
    paddingRight: inputPadding.large,
  },

  // appearance variants
  outline: {
    backgroundColor: semanticTokens.groupInputBackground,
    border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStroke}`,
    borderBottomColor: semanticTokens.groupInputUnderlineStroke,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeHover),
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeHover,
    },

    '&:active': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeSelected),
      borderBottomColor: semanticTokens.groupInputUnderlineStrokePressed,
    },

    '&:focus-within': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeSelected),
      borderBottomColor: semanticTokens.groupInputUnderlineStrokePressed,
    },
  },
  underline: {
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    borderBottom: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputUnderlineStroke}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: semanticTokens.groupInputBackground,
    border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.strokeNeutralTransparent}`,
  },
  'filled-darker': {
    backgroundColor: semanticTokens.groupInputFilledDarkerBackground,
    border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.strokeNeutralTransparent}`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeInvalid),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: semanticTokens.groupInputStrokeInvalid,
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: semanticTokens.groupInputBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupInputStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
});

const useInputStyles = makeStyles({
  input: {
    alignSelf: 'stretch',
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    border: 'none',
    color: semanticTokens.groupInputForeground,
    fontFamily: semanticTokens.groupInputFontfamily,

    '&:focus': {
      outlineStyle: 'none',
    },

    '&::placeholder': {
      color: semanticTokens.groupInputPlaceholderForeground,
      opacity: 1,
    },
  },

  // size variants
  small: {
    ...typographyStyles.caption1,
    padding: `0 0 0 ${`calc(${inputPadding.small} + ${inputGap.small})`}`,
  },
  medium: {
    ...typographyStyles.body1,
    padding: `0 0 0 ${`calc(${inputPadding.medium} + ${inputGap.medium})`}`,
  },
  large: {
    ...typographyStyles.body2,
    padding: `0 0 0 ${`calc(${inputPadding.large} + ${inputGap.large})`}`,
  },
  disabled: {
    color: semanticTokens.groupInputForegroundDisabled,
    backgroundColor: semanticTokens.groupInputBackgroundDisabled,
    cursor: 'not-allowed',
    '::placeholder': {
      color: semanticTokens.groupInputForegroundDisabled,
    },
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: semanticTokens.groupInputIconForeground,
    cursor: 'pointer',
    display: 'block',
    fontSize: semanticTokens.groupInputIconSize,

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  hidden: {
    display: 'none',
  },
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute',
  },

  // icon size variants
  small: {
    fontSize: `calc(${semanticTokens.groupInputIconSize} * 0.75)`,
    marginLeft: `calc(${semanticTokens.groupInputGap} / 2)`,
  },
  medium: {
    // fontSize: iconSizes.medium,
    fontSize: semanticTokens.groupInputIconSize,
    marginLeft: `calc(${semanticTokens.groupInputGap} / 2)`,
  },
  large: {
    fontSize: `calc(${semanticTokens.groupInputIconSize} * 1.2)`,
    marginLeft: `calc(${semanticTokens.groupInputGap} * 1.5)`,
  },
  disabled: {
    color: semanticTokens.groupInputForegroundDisabled,
    cursor: 'not-allowed',
  },
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useSemanticComboboxStyles = (_state: unknown): ComboboxState => {
  'use no memo';

  const state = _state as ComboboxState;
  const { appearance, open, size, showClearIcon } = state;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const disabled = state.input.disabled;
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[appearance],
    styles[size],
    !disabled && appearance === 'outline' && styles.outlineInteractive,
    invalid && appearance !== 'underline' && styles.invalid,
    invalid && appearance === 'underline' && styles.invalidUnderline,
    disabled && styles.disabled,
    getSlotClassNameProp_unstable(state.root),
  );

  state.input.className = mergeClasses(
    state.input.className,
    inputStyles.input,
    inputStyles[size],
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      state.listbox.className,
      styles.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      getSlotClassNameProp_unstable(state.listbox),
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      state.expandIcon.className,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      showClearIcon && iconStyles.visuallyHidden,
      getSlotClassNameProp_unstable(state.expandIcon),
    );
  }

  if (state.clearIcon) {
    state.clearIcon.className = mergeClasses(
      state.clearIcon.className,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      !showClearIcon && iconStyles.hidden,
      getSlotClassNameProp_unstable(state.clearIcon),
    );
  }

  return state;
};
