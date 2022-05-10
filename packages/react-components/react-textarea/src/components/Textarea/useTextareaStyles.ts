import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TextareaSlots, TextareaState } from './Textarea.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const textareaClassNames: SlotClassNames<TextareaSlots> = {
  root: 'fui-Textarea',
  textarea: 'fui-Textarea__textarea',
};

const textareaHeight = {
  small: '24px',
  medium: '32px',
  large: '40px',
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
    ...shorthands.padding('0', '0', tokens.strokeWidthThick, '0'),
    ...shorthands.margin('0'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  disabled: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeDisabled),
    [`& > textarea`]: {
      cursor: 'not-allowed',
      '::placeholder': {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },

  interactive: {
    // This is all for the bottom focus border.
    // It's supposed to be 2px flat all the way across and match the radius of the field's corners.
    ':after': {
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
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,

      // Flat 2px border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      ...shorthands.borderBottom(tokens.strokeWidthThick, 'solid', tokens.colorCompoundBrandStroke),
      clipPath: `inset(calc(100% - ${tokens.strokeWidthThick}) 0 0 0)`,

      // Animation for focus OUT
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,
    },
    ':focus-within:after': {
      // Animation for focus IN
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,
    },
    ':focus-within:active:after': {
      // This is if the user clicks the field again while it's already focused
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
    ':focus-within': {
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },

  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStrokeInteractive),
  },

  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStrokeInteractive),
  },

  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },

    ':active': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },

    ':focus-within': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
      borderBottomColor: tokens.colorCompoundBrandStroke,
    },
  },
});

/**
 * Styles for the textarea slot
 */
const useTextareaStyles = makeStyles({
  base: {
    ...shorthands.borderStyle('none'),
    ...shorthands.margin('0'),
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground1,
    flexGrow: 1,

    '::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1,
    },

    '::selection': {
      color: tokens.colorNeutralForegroundInverted,
      backgroundColor: tokens.colorNeutralBackgroundInverted,
    },

    ':focus-visible': {
      outlineStyle: 'none', // disable default browser outline
    },
  },

  // The padding style adds both content and regular padding (from design spec), this is because the handle is not
  // affected by changing the padding of the root.
  small: {
    height: textareaHeight.small,
    ...shorthands.padding(
      '0',
      `calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
      '0',
      `calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
    ),
    ...typographyStyles.caption1,
  },
  medium: {
    height: textareaHeight.medium,
    ...shorthands.padding('0', `calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`),
    ...typographyStyles.body1,
  },
  large: {
    height: textareaHeight.large,
    ...shorthands.padding('0', `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalXXS})`),
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
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
  const disabled = state.textarea.disabled;
  const { size, appearance, resize } = state;

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    textareaClassNames.root,
    rootStyles.base,
    rootStyles[appearance],
    disabled && rootStyles.disabled,
    !disabled && rootStyles.interactive,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    state.root.className,
  );

  const textareaStyles = useTextareaStyles();
  const textareaResizeStyles = useTextareaResizeStyles();
  state.textarea.className = mergeClasses(
    textareaClassNames.textarea,
    textareaStyles.base,
    textareaStyles[size],
    textareaResizeStyles[resize],
    state.textarea.className,
  );

  return state;
};
