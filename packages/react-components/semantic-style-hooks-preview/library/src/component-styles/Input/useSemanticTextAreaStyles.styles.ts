'use client';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TextareaState } from '@fluentui/react-textarea';
import { textareaClassNames } from '@fluentui/react-textarea';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const largeHorizontalPadding = `calc(${semanticTokens.groupInputPaddingHorizontal} / 6 * 7)`;
const mediumHorizontalPadding = `${semanticTokens.groupInputPaddingHorizontal}`;
const smallHorizontalPadding = `calc(${semanticTokens.groupInputPaddingHorizontal} / 3 * 2)`;
/**
 * Styles for the root(wrapper) slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    position: 'relative',
    // Padding needed so the focus indicator does not overlap the resize handle, this should match focus indicator size.
    padding: `0 0 ${semanticTokens.groupInputUnderlineStrokewidthSelected} 0`,
    margin: '0',
    borderRadius: semanticTokens.groupInputCorner,
    verticalAlign: 'top',
  },

  disabled: {
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStrokeDisabled}`,

    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  interactive: {
    // This is all for the bottom focus border.
    // It's supposed to be 2px flat all the way across and match the radius of the field's corners.
    '::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',

      // Maintaining the correct corner radius:
      // Use the whole border-radius as the height and only put radii on the bottom corners.
      // (Otherwise the radius would be automatically reduced to fit available space.)
      // max() ensures the focus border still shows up even if someone sets tokens.borderRadiusMedium to 0.
      height: `max(${semanticTokens.groupInputUnderlineStrokewidthSelected}, ${semanticTokens.groupInputCorner})`,
      borderBottomLeftRadius: semanticTokens.groupInputCorner,
      borderBottomRightRadius: semanticTokens.groupInputCorner,

      // Flat 2px border:
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
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeSelected,
    },
    ':focus-within': {
      outlineWidth: semanticTokens.groupFocusOuterStrokewidth,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },

  filled: {
    border: `${semanticTokens.groupInputStroke} solid ${semanticTokens.strokeNeutralTransparent}`,
    ':hover,:focus-within': {
      ...shorthands.borderColor(semanticTokens.strokeNeutralTransparentHoverSelected),
    },
  },
  'filled-darker': {
    backgroundColor: semanticTokens.groupInputFilledDarkerBackground,
  },
  'filled-lighter': {
    backgroundColor: semanticTokens.groupInputBackground,
  },
  'filled-darker-shadow': {
    backgroundColor: semanticTokens.groupInputFilledDarkerBackground,
    border: `${semanticTokens.groupInputStroke} solid ${semanticTokens.strokeNeutralTransparent}`,
    boxShadow: tokens.shadow2,
  },
  'filled-lighter-shadow': {
    backgroundColor: semanticTokens.groupInputBackground,
    border: `${semanticTokens.groupInputStroke} solid ${semanticTokens.strokeNeutralTransparent}`,
    boxShadow: tokens.shadow2,
  },

  outline: {
    backgroundColor: semanticTokens.groupInputBackground,
    border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStroke}`,
    borderBottomColor: semanticTokens.groupInputUnderlineStroke,
  },
  outlineInteractive: {
    ':hover': {
      border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStrokeHover}`,
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeHover,
    },

    ':active': {
      border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStrokePressed}`,
      borderBottomColor: semanticTokens.groupInputUnderlineStrokePressed,
    },

    ':focus-within': {
      border: `${semanticTokens.groupInputStrokewidth} solid ${semanticTokens.groupInputStrokePressed}`,
      borderBottomColor: semanticTokens.groupInputUnderlineStrokeSelected,
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(semanticTokens.groupInputStrokeInvalid),
    },
  },
});

/**
 * Styles for the textarea slot
 */
const useTextareaStyles = makeStyles({
  base: {
    ...shorthands.borderStyle('none'),
    margin: '0',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    color: semanticTokens.groupInputForeground,
    flexGrow: 1,
    fontFamily: semanticTokens.groupInputFontfamily,
    fontWeight: semanticTokens.groupInputFontweight,
    height: '100%',

    '::placeholder': {
      color: semanticTokens.groupInputPlaceholderForeground,
      opacity: 1,
    },

    outlineStyle: 'none', // disable default browser outline
  },

  disabled: {
    color: semanticTokens.groupInputForegroundDisabled,
    cursor: 'not-allowed',
    '::placeholder': {
      color: semanticTokens.groupInputForegroundDisabled,
    },
  },

  // The padding style adds both content and regular padding (from design spec), this is because the handle is not
  // affected by changing the padding of the root.
  small: {
    minHeight: '40px',
    padding: `calc(${smallHorizontalPadding} / 2) ${smallHorizontalPadding}`,
    maxHeight: '200px',
    // Todo: We'll likely move font to extension or generic tokens
    fontSize: `calc(${semanticTokens.groupInputFontsize} / 7 * 6)`,
    lineHeight: `calc(${semanticTokens.groupInputLineheight} / 5 * 4)`,
  },
  medium: {
    minHeight: '52px',
    padding: `calc(${mediumHorizontalPadding} / 2) ${mediumHorizontalPadding}`,
    maxHeight: '260px',
    fontSize: semanticTokens.groupInputFontsize,
    lineHeight: semanticTokens.groupInputLineheight,
  },
  large: {
    minHeight: '64px',
    padding: `calc(1px + ${largeHorizontalPadding} / 2) ${largeHorizontalPadding}`,
    maxHeight: '320px',
    // Todo: We'll likely move font to extension or generic tokens
    fontSize: `calc(${semanticTokens.groupInputFontsize} / 7 * 8)`,
    lineHeight: `calc(${semanticTokens.groupInputLineheight} / 10 * 11)`,
  },
});

/**
 * Styles for the textarea's resize property
 */
const useTextareaResizeStyles = makeStyles({
  none: {
    resize: 'none',
  },
  both: {
    resize: 'both',
  },
  horizontal: {
    resize: 'horizontal',
  },
  vertical: {
    resize: 'vertical',
  },
});

/**
 * Apply styling to the Textarea slots based on the state
 */
export const useSemanticTextareaStyles = (_state: unknown): TextareaState => {
  'use no memo';

  const state = _state as TextareaState;
  const { size, appearance, resize } = state;
  const disabled = state.textarea.disabled;
  const invalid = `${state.textarea['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    state.root.className,
    textareaClassNames.root,
    rootStyles.base,
    disabled && rootStyles.disabled,
    !disabled && filled && rootStyles.filled,
    !disabled && rootStyles[appearance],
    !disabled && rootStyles.interactive,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && invalid && rootStyles.invalid,
    getSlotClassNameProp_unstable(state.root),
  );

  const textareaStyles = useTextareaStyles();
  const textareaResizeStyles = useTextareaResizeStyles();
  state.textarea.className = mergeClasses(
    state.textarea.className,
    textareaClassNames.textarea,
    textareaStyles.base,
    textareaStyles[size],
    textareaResizeStyles[resize],
    disabled && textareaStyles.disabled,
    getSlotClassNameProp_unstable(state.textarea),
  );

  return state;
};
