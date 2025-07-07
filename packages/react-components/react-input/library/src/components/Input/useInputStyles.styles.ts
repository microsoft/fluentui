import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InputSlots, InputState } from './Input.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

// TODO(sharing) should these be shared somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

// With no contentBefore or contentAfter, the input slot uses combined padding to increase its hit target.
// If there is contentBefore or contentAfter, then the root and input slots use their individual padding.
const horizontalPadding = {
  root: {
    small: tokens.spacingHorizontalSNudge,
    medium: tokens.spacingHorizontalMNudge,
    large: tokens.spacingHorizontalM,
  },
  input: {
    small: tokens.spacingHorizontalXXS,
    medium: tokens.spacingHorizontalXXS,
    large: tokens.spacingHorizontalSNudge,
  },
  combined: {
    small: tokens.spacingHorizontalS, // SNudge + XXS
    medium: tokens.spacingHorizontalM, // MNudge + XXS
    large: `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`,
  },
};

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: tokens.spacingHorizontalXXS,
  borderRadius: semanticTokens.cornerCtrlRest, // used for all but underline
  position: 'relative',
  boxSizing: 'border-box',
  verticalAlign: 'middle',

  // size: medium (default)
  minHeight: fieldHeights.medium,
  ...typographyStyles.body1,

  // appearance: outline (default)
  backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
  border: `1px solid ${semanticTokens.ctrlInputStrokeRest}`,
  borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeRest,

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
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${semanticTokens.ctrlInputBottomLineStrokeSelected}`,
    clipPath: 'inset(calc(100% - 2px) 0 0 0)',

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
    outline: '2px solid transparent',
  },
});

const useRootStyles = makeStyles({
  small: {
    minHeight: fieldHeights.small,
    ...typographyStyles.caption1,
  },
  medium: {
    // included in rootBaseStyles
  },
  large: {
    minHeight: fieldHeights.large,
    ...typographyStyles.body2,
    gap: tokens.spacingHorizontalSNudge,
  },
  outline: {
    // included in rootBaseStyles
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.borderColor(semanticTokens.ctrlInputStrokeHover),
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
      ':focus-within': {
        borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
      },
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      ...shorthands.borderColor(semanticTokens.ctrlInputStrokeSelected),
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokePressed,
    },
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
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
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeSelected,
    },
    '::after': {
      // remove rounded corners from focus underline
      borderRadius: '0',
    },
  },
  filled: {
    ...shorthands.borderColor(semanticTokens.ctrlFocusOuterStroke),
  },
  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(semanticTokens._ctrlFocusOuterStrokeInteractive),
    },
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(semanticTokens.ctrlInputBackgroundError),
    },
  },
  'filled-darker': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
  },
  'filled-lighter': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
  },
  // This shadow appearance is deprecated and will be removed in a future release.
  'filled-darker-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestDarker,
    boxShadow: tokens.shadow2,
  },
  // This shadow appearance is deprecated and will be removed in a future release.
  'filled-lighter-shadow': {
    backgroundColor: semanticTokens._ctrlInputBackgroundRestLighter,
    boxShadow: tokens.shadow2,
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
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
  color: semanticTokens.foregroundContentNeutralPrimary,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',

  '::placeholder': {
    color: semanticTokens._ctrlInputNeutralForegroundPlaceholder,
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
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    backgroundColor: tokens.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },
  },
});

const useContentClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: semanticTokens.foregroundCtrlIconOnNeutralRest, // "icon color" in design spec
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
});

const useContentStyles = makeStyles({
  disabled: {
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
  },
  // Ensure resizable icons show up with the proper font size
  small: {
    '> svg': { fontSize: '16px' },
  },
  medium: {
    // included in useContentClassName
  },
  large: {
    '> svg': { fontSize: '24px' },
  },
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles_unstable = (state: InputState): InputState => {
  'use no memo';

  const { size, appearance } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
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
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputClassNames.input,
    useInputClassName(),
    inputStyles[size],
    state.contentBefore && inputStyles[`${size}WithContentBefore`],
    state.contentAfter && inputStyles[`${size}WithContentAfter`],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  const contentClasses = [useContentClassName(), disabled && contentStyles.disabled, contentStyles[size]];
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
