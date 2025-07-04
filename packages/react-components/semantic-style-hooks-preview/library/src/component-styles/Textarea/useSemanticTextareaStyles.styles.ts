import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { textareaClassNames, type TextareaState } from '@fluentui/react-textarea';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// Maintaining the correct corner radius:
// Use the whole border-radius as the height and only put radii on the bottom corners.
// (Otherwise the radius would be automatically reduced to fit available space.)
// max() ensures the focus border still shows up even if someone sets tokens.borderRadiusMedium to 0.
const inputBottomFocusBorderStroke = `max(${semanticTokens.ctrlInputBottomLineStrokeWidthSelected}, ${semanticTokens.cornerCtrlRest})`;

/**
 * Styles for the root(wrapper) slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    position: 'relative',
    // Padding needed so the focus indicator does not overlap the resize handle, this should match focus indicator size.
    padding: `0 0 ${semanticTokens.ctrlInputBottomLineStrokeWidthSelected} 0`,
    margin: '0',
    borderRadius: semanticTokens.cornerCtrlRest,
    verticalAlign: 'top',
    backgroundColor: semanticTokens.ctrlInputBackgroundRest,
    ':focus-within': {
      backgroundColor: semanticTokens.ctrlInputBackgroundSelected,
    },
  },

  disabled: {
    backgroundColor: semanticTokens.ctrlInputBackgroundDisabled,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeCtrlOnNeutralDisabled}`,

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

      height: inputBottomFocusBorderStroke,
      borderBottomLeftRadius: semanticTokens.cornerCtrlRest,
      borderBottomRightRadius: semanticTokens.cornerCtrlRest,

      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      borderBottom: `${semanticTokens.ctrlInputBottomLineStrokeWidthSelected} solid ${semanticTokens.ctrlInputBottomLineStrokeSelected}`,
      clipPath: `inset(calc(100% - ${semanticTokens.ctrlInputBottomLineStrokeWidthSelected}) 0 0 0)`,

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
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
    },
    ':focus-within': {
      outlineWidth: semanticTokens.ctrlFocusOuterStrokeWidth,
      outlineStyle: 'solid',
      outlineColor: semanticTokens.nullColor,
    },
  },

  filled: {
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlFocusOuterStroke}`,
    ':hover,:focus-within': {
      ...shorthands.borderColor(semanticTokens._ctrlFocusOuterStrokeInteractive),
    },
  },
  'filled-darker': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    ':focus-within': {
      backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    },
  },
  'filled-lighter': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    ':focus-within': {
      backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    },
  },
  'filled-darker-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlFocusInnerStroke}`,
    boxShadow: tokens.shadow2,
    ':focus-within': {
      backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    },
  },
  'filled-lighter-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens._ctrlFocusOuterStrokeInteractive}`,
    boxShadow: tokens.shadow2,
    ':focus-within': {
      backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    },
  },

  outline: {
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokeRest}`,
    borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeRest,
  },
  outlineInteractive: {
    ':hover': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokeHover}`,
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
      ':focus-within': {
        borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
      },
    },

    ':active': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokePressed}`,
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokePressed,
    },

    ':focus-within': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokeSelected}`,
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(semanticTokens.ctrlInputBackgroundError),
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
    color: semanticTokens.foregroundContentNeutralPrimary,
    flexGrow: 1,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    height: '100%',

    '::placeholder': {
      color: semanticTokens._ctrlInputNeutralForegroundPlaceholder,
      opacity: 1,
    },

    '::selection': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorNeutralBackgroundInverted,
    },

    outlineStyle: 'none', // disable default browser outline
  },

  disabled: {
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',
    '::placeholder': {
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },
  },

  // The padding style adds both content and regular padding (from design spec), this is because the handle is not
  // affected by changing the padding of the root.
  small: {
    minHeight: '40px',
    padding: `${tokens.spacingVerticalXS} calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
    maxHeight: '200px',
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
  medium: {
    minHeight: '52px',
    padding: `${tokens.spacingVerticalSNudge} calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
    maxHeight: '260px',
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },
  large: {
    minHeight: '64px',
    padding: `${tokens.spacingVerticalS} calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalXXS})`,
    maxHeight: '320px',
    fontSize: semanticTokens.textGlobalBody2FontSize,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
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
