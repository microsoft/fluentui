import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getBottomFocusIndicator } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { InputSlots, InputState } from './Input.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `inputClassNames.root` instead.
 */
export const inputClassName = 'fui-Input';
export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

// TODO(sharing) use theme values once available
const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};
const contentSizes = {
  // TODO(sharing) shouldn't these be in the theme?
  body1: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  caption1: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
};
// TODO(sharing) should these be shared somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    ...shorthands.gap(horizontalSpacing.xxs),
    fontFamily: tokens.fontFamilyBase,
    ...shorthands.borderRadius(tokens.borderRadiusMedium), // used for all but underline
    position: 'relative',
    boxSizing: 'border-box',
  },
  interactive: getBottomFocusIndicator({
    borderWidth: tokens.strokeWidthThick,
    borderRadius: tokens.borderRadiusMedium,
    borderColor: tokens.colorCompoundBrandStroke,
    pressedBorderColor: tokens.colorCompoundBrandStrokePressed,
    targetChild: 'input',
  }),
  small: {
    minHeight: fieldHeights.small,
    ...shorthands.padding('0', horizontalSpacing.sNudge),
    ...contentSizes.caption1,
  },
  medium: {
    minHeight: fieldHeights.medium,
    ...shorthands.padding('0', horizontalSpacing.mNudge),
    ...contentSizes.body1,
  },
  large: {
    minHeight: fieldHeights.large,
    ...shorthands.padding('0', horizontalSpacing.m),
    ...contentSizes[400],
    ...shorthands.gap(horizontalSpacing.sNudge),
  },
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderRadius(0), // corners look strange if rounded
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeAccessible),
  },
  underlineInteractive: {
    ':hover': {
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
    },
    ':after': shorthands.borderRadius(0), // remove rounded corners from focus underline
  },
  filled: {
    boxShadow: tokens.shadow2, // optional shadow for filled appearances
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
  },
  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeDisabled),
    ...shorthands.borderRadius(tokens.borderRadiusMedium), // because underline doesn't usually have a radius
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
});

const useInputElementStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    flexGrow: 1,
    minWidth: 0, // required to make the input shrink to fit the wrapper
    ...shorthands.borderStyle('none'), // input itself never has a border (this is handled by inputWrapper)
    ...shorthands.padding('0', horizontalSpacing.xxs),
    color: tokens.colorNeutralForeground1,
    // Use literal "transparent" (not from the theme) to always let the color from the root show through
    backgroundColor: 'transparent',

    '::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1, // browser style override
    },
    ':focus-visible': {
      outlineStyle: 'none', // disable default browser outline
    },
  },
  small: {
    // This is set on root but doesn't inherit
    ...contentSizes.caption1,
  },
  medium: {
    ...contentSizes.body1,
  },
  large: {
    ...contentSizes[400],
    ...shorthands.padding('0', horizontalSpacing.sNudge),
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    backgroundColor: tokens.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

const useContentStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground3, // "icon color" in design spec
    // special case styling for icons (most common case) to ensure they're centered vertically
    '> svg': { display: 'block' },
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
  // Ensure resizable icons show up with the proper font size
  small: {
    '> svg': { fontSize: '16px' },
  },
  medium: {
    '> svg': { fontSize: '20px' },
  },
  large: {
    '> svg': { fontSize: '24px' },
  },
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles_unstable = (state: InputState): InputState => {
  const { size, appearance } = state;
  const disabled = state.input.disabled;
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    inputClassNames.root,
    rootStyles.base,
    rootStyles[size],
    rootStyles[appearance],
    !disabled && rootStyles.interactive,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    filled && rootStyles.filled,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputClassNames.input,
    inputStyles.base,
    inputStyles[size],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  const contentClasses = [contentStyles.base, disabled && contentStyles.disabled, contentStyles[size]];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      inputClassNames.contentBefore,
      ...contentClasses,
      state.contentBefore.className,
    );
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      inputClassNames.contentAfter,
      ...contentClasses,
      state.contentAfter.className,
    );
  }

  return state;
};
