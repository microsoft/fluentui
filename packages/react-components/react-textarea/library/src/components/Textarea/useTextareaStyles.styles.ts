import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextareaSlots, TextareaState } from './Textarea.types';

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
    padding: `0 0 ${tokens.strokeWidthThick} 0`,
    margin: '0',
    borderRadius: `var(--ctrl-token-Textarea-2709, var(--semantic-token-Textarea-2710, ${tokens.borderRadiusMedium}))`,
  },

  disabled: {
    backgroundColor: `var(--ctrl-token-Textarea-2711, var(--semantic-token-Textarea-2712, ${tokens.colorTransparentBackground}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,

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
      height: `max(${tokens.strokeWidthThick}, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: `var(--ctrl-token-Textarea-2713, var(--semantic-token-Textarea-2714, ${tokens.borderRadiusMedium}))`,
      borderBottomRightRadius: `var(--ctrl-token-Textarea-2715, var(--semantic-token-Textarea-2716, ${tokens.borderRadiusMedium}))`,

      // Flat 2px border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: `inset(calc(100% - ${tokens.strokeWidthThick}) 0 0 0)`,

      // Animation for focus OUT
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Textarea-2717, var(--semantic-token-Textarea-2718, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--ctrl-token-Textarea-2719, var(--semantic-token-Textarea-2720, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      // Animation for focus IN
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Textarea-2721, var(--semantic-token-Textarea-2722, ${tokens.durationNormal}))`,
      transitionDelay: `var(--ctrl-token-Textarea-2723, var(--semantic-token-Textarea-2724, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      // This is if the user clicks the field again while it's already focused
      borderBottomColor: `var(--ctrl-token-Textarea-2725, var(--semantic-token-Textarea-2726, ${tokens.colorCompoundBrandStrokePressed}))`,
    },
    ':focus-within': {
      outlineWidth: `var(--ctrl-token-Textarea-2727, var(--semantic-token-Textarea-2728, ${tokens.strokeWidthThick}))`,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },

  filled: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    ':hover,:focus-within': {
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-Textarea-2729, var(--semantic-token-Textarea-2730, ${tokens.colorNeutralBackground3}))`,
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-Textarea-2731, var(--semantic-token-Textarea-2732, ${tokens.colorNeutralBackground1}))`,
  },
  'filled-darker-shadow': {
    backgroundColor: `var(--ctrl-token-Textarea-2733, var(--semantic-token-Textarea-2734, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStrokeInteractive}`,
    boxShadow: `var(--ctrl-token-Textarea-2735, var(--semantic-token-Textarea-2736, ${tokens.shadow2}))`,
  },
  'filled-lighter-shadow': {
    backgroundColor: `var(--ctrl-token-Textarea-2737, var(--semantic-token-Textarea-2738, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStrokeInteractive}`,
    boxShadow: `var(--ctrl-token-Textarea-2739, var(--semantic-token-Textarea-2740, ${tokens.shadow2}))`,
  },

  outline: {
    backgroundColor: `var(--ctrl-token-Textarea-2741, var(--semantic-token-Textarea-2742, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-Textarea-2743, var(--semantic-token-Textarea-2744, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    ':hover': {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1Hover}`,
      borderBottomColor: `var(--ctrl-token-Textarea-2745, var(--semantic-token-Textarea-2746, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },

    ':active': {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1Pressed}`,
      borderBottomColor: `var(--ctrl-token-Textarea-2747, var(--semantic-token-Textarea-2748, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    },

    ':focus-within': {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
      borderBottomColor: `var(--ctrl-token-Textarea-2749, var(--semantic-token-Textarea-2750, ${tokens.colorCompoundBrandStroke}))`,
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
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
    color: `var(--ctrl-token-Textarea-2751, var(--semantic-token-Textarea-2752, ${tokens.colorNeutralForeground1}))`,
    flexGrow: 1,
    fontFamily: `var(--ctrl-token-Textarea-2753, var(--semantic-token-Textarea-2754, ${tokens.fontFamilyBase}))`,
    height: '100%',

    '::placeholder': {
      color: `var(--ctrl-token-Textarea-2755, var(--semantic-token-Textarea-2756, ${tokens.colorNeutralForeground4}))`,
      opacity: 1,
    },

    '::selection': {
      color: `var(--ctrl-token-Textarea-2757, var(--semantic-token-Textarea-2758, ${tokens.colorNeutralForegroundInverted}))`,
      backgroundColor: `var(--ctrl-token-Textarea-2759, var(--semantic-token-Textarea-2760, ${tokens.colorNeutralBackgroundInverted}))`,
    },

    outlineStyle: 'none', // disable default browser outline
  },

  disabled: {
    color: `var(--ctrl-token-Textarea-2761, var(--semantic-token-Textarea-2762, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
    '::placeholder': {
      color: `var(--ctrl-token-Textarea-2763, var(--semantic-token-Textarea-2764, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },

  // The padding style adds both content and regular padding (from design spec), this is because the handle is not
  // affected by changing the padding of the root.
  small: {
    minHeight: '40px',
    padding: `${tokens.spacingVerticalXS} calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
    maxHeight: '200px',
    ...typographyStyles.caption1,
  },
  medium: {
    minHeight: '52px',
    padding: `${tokens.spacingVerticalSNudge} calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
    maxHeight: '260px',
    ...typographyStyles.body1,
  },
  large: {
    minHeight: '64px',
    padding: `${tokens.spacingVerticalS} calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalXXS})`,
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
