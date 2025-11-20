'use client';

import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InputState } from '@fluentui/react-input';
import { inputClassNames } from '@fluentui/react-input';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const fieldHeights = {
  small: `calc(${semanticTokens.groupInputMinheight} * 0.75)`,
  medium: semanticTokens.groupInputMinheight,
  large: `calc(${semanticTokens.groupInputMinheight} * 1.25)`,
};

// With no contentBefore or contentAfter, the input slot uses combined padding to increase its hit target.
// If there is contentBefore or contentAfter, then the root and input slots use their individual padding.
const horizontalPadding = {
  root: {
    small: `calc(${semanticTokens.groupInputPaddingHorizontal} / 3 * 2 - ${semanticTokens.groupInputGap} / 2)`,
    medium: `calc(${semanticTokens.groupInputPaddingHorizontal} - ${semanticTokens.groupInputGap} / 2)`,
    large: semanticTokens.groupInputPaddingHorizontal,
  },
  input: {
    small: `calc(${semanticTokens.groupInputGap} / 2)`,
    medium: `calc(${semanticTokens.groupInputGap} / 2)`,
    large: `calc(${semanticTokens.groupInputGap} * 1.5)`,
  },
  combined: {
    small: `calc(${semanticTokens.groupInputPaddingHorizontal} / 3 * 2)`,
    medium: semanticTokens.groupInputPaddingHorizontal,
    large: `calc(${semanticTokens.groupInputPaddingHorizontal} * 1.5)`,
  },
};

// Maintaining the correct corner radius:
// Use the whole border-radius as the height and only put radii on the bottom corners.
// (Otherwise the radius would be automatically reduced to fit available space.)
// max() ensures the focus border still shows up even if someone sets semanticTokens.groupInputCorner to 0.
const inputBottomFocusBorderStroke = `max(${semanticTokens.groupInputUnderlineStrokewidthSelected}, ${semanticTokens.groupInputCorner})`;

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: `calc(${semanticTokens.groupInputGap} / 2)`,
  borderRadius: semanticTokens.groupInputCorner, // used for all but underline
  position: 'relative',
  boxSizing: 'border-box',
  verticalAlign: 'middle',

  // size: medium (default)
  minHeight: fieldHeights.medium,
  fontFamily: semanticTokens.groupInputFontfamily,
  fontSize: semanticTokens.groupInputFontsize,
  fontWeight: semanticTokens.groupInputFontweight,
  lineHeight: semanticTokens.groupInputLineheight,

  // appearance: outline (default)
  backgroundColor: semanticTokens.groupInputBackground,
  border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStroke}`,
  borderBottomColor: semanticTokens.groupInputUnderlineStroke,

  // This is all for the bottom focus border.
  // It's supposed to be 2px flat all the way across and match the radius of the field's corners.
  '::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    left: '-1px',
    bottom: '-1px',
    right: '-1px',

    height: inputBottomFocusBorderStroke,
    borderBottomLeftRadius: semanticTokens.groupInputCorner,
    borderBottomRightRadius: semanticTokens.groupInputCorner,

    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `${semanticTokens.groupInputUnderlineStrokewidthSelected} solid ${semanticTokens.groupInputUnderlineStrokeSelected}`,
    clipPath: `inset(calc(100% - ${semanticTokens.groupInputUnderlineStrokewidthSelected}) 0 0 0)`,

    // Animation for focus OUT
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
    // Animation for focus IN
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
    // This is if the user clicks the field again while it's already focused
    borderBottomColor: semanticTokens.groupInputUnderlineStrokeSelectedPressed,
  },
  ':focus-within': {
    outline: '2px solid transparent',
  },
});

const useRootStyles = makeStyles({
  small: {
    minHeight: fieldHeights.small,
    // Todo: Font sizes will likely be moved to extension tokens
    fontSize: `calc(${semanticTokens.groupInputFontsize} / 7 * 6)`,
    lineHeight: `calc(${semanticTokens.groupInputLineheight} / 5 * 4)`,
  },
  medium: {
    // included in rootBaseStyles
  },
  large: {
    minHeight: fieldHeights.large,
    // Todo: Font sizes will likely be moved to extension tokens
    fontSize: `calc(${semanticTokens.groupInputFontsize} / 7 * 8)`,
    lineHeight: `calc(${semanticTokens.groupInputLineheight} / 10 * 11)`,
    gap: `calc(${semanticTokens.groupInputGap} * 1.5)`,
  },
  outline: {
    // included in rootBaseStyles
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeHover),
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeSelected),
      borderBottomColor: semanticTokens.groupInputUnderlineStrokePressed,
    },
  },
  underline: {
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    borderRadius: '0', // corners look strange if rounded
    // border is specified in rootBaseStyles, but we only want a bottom border here
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
    // Make the focus underline (::after) match the width of the bottom border
    '::after': {
      left: 0,
      right: 0,
    },
  },
  underlineInteractive: {
    ':hover': {
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      borderBottomColor: semanticTokens.groupInputUnderlineStrokePressed,
    },
    '::after': {
      // remove rounded corners from focus underline
      borderRadius: '0',
    },
  },
  filled: {
    ...shorthands.borderColor(semanticTokens.strokeNeutralTransparent),
  },
  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(semanticTokens.strokeNeutralTransparent),
    },
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeInvalid),
    },
  },
  'filled-darker': {
    backgroundColor: semanticTokens.groupInputFilledDarkerBackground,
  },
  'filled-lighter': {
    backgroundColor: semanticTokens.groupInputBackground,
  },
  // This shadow appearance is deprecated and will be removed in a future release.
  'filled-darker-shadow': {
    backgroundColor: semanticTokens.groupInputFilledDarkerBackground,
    boxShadow: tokens.shadow2,
  },
  // This shadow appearance is deprecated and will be removed in a future release.
  'filled-lighter-shadow': {
    backgroundColor: semanticTokens.groupInputBackground,
    boxShadow: tokens.shadow2,
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: semanticTokens.groupInputBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupInputStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
    // remove the focus border
    '::after': {
      content: 'unset',
    },
    // remove the focus outline
    ':focus-within': {
      outlineStyle: 'none',
    },
  },
  smallWithContentBefore: {
    paddingLeft: horizontalPadding.root.small,
  },
  smallWithContentAfter: {
    paddingRight: horizontalPadding.root.small,
  },
  mediumWithContentBefore: {
    paddingLeft: horizontalPadding.root.medium,
  },
  mediumWithContentAfter: {
    paddingRight: horizontalPadding.root.medium,
  },
  largeWithContentBefore: {
    paddingLeft: horizontalPadding.root.large,
  },
  largeWithContentAfter: {
    paddingRight: horizontalPadding.root.large,
  },
});

const useInputClassName = makeResetStyles({
  alignSelf: 'stretch',
  boxSizing: 'border-box',
  flexGrow: 1,
  minWidth: 0, // required to make the input shrink to fit the wrapper
  borderStyle: 'none', // input itself never has a border (this is handled by inputWrapper)
  padding: `0 ${horizontalPadding.combined.medium}`,
  color: semanticTokens.groupInputForeground,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',

  '::placeholder': {
    color: semanticTokens.groupInputPlaceholderForeground,
    opacity: 1, // browser style override
  },

  outlineStyle: 'none', // disable default browser outline

  // Inherit typography styles from root
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
});

const useInputElementStyles = makeStyles({
  small: {
    paddingLeft: horizontalPadding.combined.small,
    paddingRight: horizontalPadding.combined.small,
  },
  medium: {
    // Included in useInputClassName
  },
  large: {
    paddingLeft: horizontalPadding.combined.large,
    paddingRight: horizontalPadding.combined.large,
  },
  smallWithContentBefore: {
    paddingLeft: horizontalPadding.input.small,
  },
  smallWithContentAfter: {
    paddingRight: horizontalPadding.input.small,
  },
  mediumWithContentBefore: {
    paddingLeft: horizontalPadding.input.medium,
  },
  mediumWithContentAfter: {
    paddingRight: horizontalPadding.input.medium,
  },
  largeWithContentBefore: {
    paddingLeft: horizontalPadding.input.large,
  },
  largeWithContentAfter: {
    paddingRight: horizontalPadding.input.large,
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

const useContentClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: semanticTokens.groupInputIconForeground,
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: semanticTokens.groupInputIconSize },
});

const useContentStyles = makeStyles({
  disabled: {
    color: semanticTokens.groupInputForegroundDisabled,
  },
  // Ensure resizable icons show up with the proper font size
  small: {
    '> svg': { fontSize: `calc(${semanticTokens.groupInputIconSize} * 0.75)` },
  },
  medium: {
    // included in useContentClassName
  },
  large: {
    '> svg': { fontSize: `calc(${semanticTokens.groupInputIconSize} * 1.25)` },
  },
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useSemanticInputStyles = (_state: unknown): InputState => {
  'use no memo';

  const state = _state as InputState;
  const { size, appearance } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    state.root.className,
    inputClassNames.root,
    useRootClassName(),
    rootStyles[size],
    state.contentBefore && rootStyles[`${size}WithContentBefore`],
    state.contentAfter && rootStyles[`${size}WithContentAfter`],
    rootStyles[appearance],
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    filled && rootStyles.filled,
    !disabled && invalid && rootStyles.invalid,
    disabled && rootStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  state.input.className = mergeClasses(
    state.input.className,
    inputClassNames.input,
    useInputClassName(),
    inputStyles[size],
    state.contentBefore && inputStyles[`${size}WithContentBefore`],
    state.contentAfter && inputStyles[`${size}WithContentAfter`],
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  const contentClasses = [useContentClassName(), disabled && contentStyles.disabled, contentStyles[size]];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      inputClassNames.contentBefore,
      ...contentClasses,
      getSlotClassNameProp_unstable(state.contentBefore),
    );
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      inputClassNames.contentAfter,
      ...contentClasses,
      getSlotClassNameProp_unstable(state.contentAfter),
    );
  }

  return state;
};
