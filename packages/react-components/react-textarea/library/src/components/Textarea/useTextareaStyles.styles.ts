import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextareaSlots, TextareaState } from './Textarea.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const textareaClassNames: SlotClassNames<TextareaSlots> = {
  root: 'fui-Textarea',
  textarea: 'fui-Textarea__textarea',
};

/**
 * Styles for the root(wrapper) slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    position: 'relative',
    // Padding needed so the focus indicator does not overlap the resize handle, this should match focus indicator size.
    padding: `0 0 ${semanticTokens._cornerCtrlRestTextAreaThick} 0`,
    margin: '0',
    borderRadius: semanticTokens._cornerCtrlRestTextAreaMedium,
    verticalAlign: 'top',
  },

  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
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

      // Maintaining the correct corner radius:
      // Use the whole border-radius as the height and only put radii on the bottom corners.
      // (Otherwise the radius would be automatically reduced to fit available space.)
      // max() ensures the focus border still shows up even if someone sets tokens.borderRadiusMedium to 0.
      height: `max(${semanticTokens._cornerCtrlRestTextAreaThick}, ${semanticTokens._cornerCtrlRestTextAreaMedium})`,
      borderBottomLeftRadius: semanticTokens._cornerCtrlRestTextAreaMedium,
      borderBottomRightRadius: semanticTokens._cornerCtrlRestTextAreaMedium,

      // Flat 2px border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      borderBottom: `${semanticTokens._cornerCtrlRestTextAreaThick} solid ${semanticTokens.ctrlInputBottomLineStrokeRest}`,
      clipPath: `inset(calc(100% - ${semanticTokens._cornerCtrlRestTextAreaThick}) 0 0 0)`,

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
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokePressed,
    },
    ':focus-within': {
      outlineWidth: semanticTokens._cornerCtrlRestTextAreaThick,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },

  filled: {
    border: `${semanticTokens.strokeWidthDefault} solid ${tokens.colorTransparentStroke}`,
    ':hover,:focus-within': {
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  'filled-darker': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
  },
  'filled-lighter': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
  },
  'filled-darker-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlFocusInnerStroke}`,
    boxShadow: tokens.shadow2,
  },
  'filled-lighter-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    border: `${semanticTokens.strokeWidthDefault} solid ${tokens.colorTransparentStrokeInteractive}`,
    boxShadow: tokens.shadow2,
  },

  outline: {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokeRest}`,
    borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
  },
  outlineInteractive: {
    ':hover': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokeHover}`,
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
    },

    ':active': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokePressed}`,
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed, // TODO
    },

    ':focus-within': {
      border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.ctrlInputStrokePressed}`,
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
      color: tokens.colorNeutralForeground4, // TODO
      opacity: 1,
    },

    '::selection': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorNeutralBackgroundInverted, // TODO
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
    padding: `${tokens.spacingVerticalXS} calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`, // TODO
    maxHeight: '200px',
    ...typographyStyles.caption1,
  },
  medium: {
    minHeight: '52px',
    padding: `${tokens.spacingVerticalSNudge} calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`, // TODO
    maxHeight: '260px',
    ...typographyStyles.body1,
  },
  large: {
    minHeight: '64px',
    padding: `${tokens.spacingVerticalS} calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalXXS})`, // TODO
    maxHeight: '320px',
    ...typographyStyles.body2,
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
export const useTextareaStyles_unstable = (state: TextareaState): TextareaState => {
  'use no memo';

  const { size, appearance, resize } = state;
  const disabled = state.textarea.disabled;
  const invalid = `${state.textarea['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    textareaClassNames.root,
    rootStyles.base,
    disabled && rootStyles.disabled,
    !disabled && filled && rootStyles.filled,
    !disabled && rootStyles[appearance],
    !disabled && rootStyles.interactive,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && invalid && rootStyles.invalid,
    state.root.className,
  );

  const textareaStyles = useTextareaStyles();
  const textareaResizeStyles = useTextareaResizeStyles();
  state.textarea.className = mergeClasses(
    textareaClassNames.textarea,
    textareaStyles.base,
    textareaStyles[size],
    textareaResizeStyles[resize],
    disabled && textareaStyles.disabled,
    state.textarea.className,
  );

  return state;
};
