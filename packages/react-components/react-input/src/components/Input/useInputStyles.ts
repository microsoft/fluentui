import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { InputSlots, InputState } from './Input.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

// TODO(sharing) use theme values once available
const contentSizes = {
  // TODO: This 400 style is not in the typography styles.
  // May need a design change
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
    ...shorthands.gap(tokens.spacingHorizontalXXS),
    fontFamily: tokens.fontFamilyBase,
    ...shorthands.borderRadius(tokens.borderRadiusMedium), // used for all but underline
    position: 'relative',
    boxSizing: 'border-box',
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
      height: `max(2px, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,

      // Flat 2px border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      ...shorthands.borderBottom('2px', 'solid', tokens.colorCompoundBrandStroke),
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
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
    ':focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },
  small: {
    minHeight: fieldHeights.small,
    ...shorthands.padding('0', tokens.spacingHorizontalSNudge),
    ...typographyStyles.caption1,
  },
  medium: {
    minHeight: fieldHeights.medium,
    ...shorthands.padding('0', tokens.spacingHorizontalMNudge),
    ...typographyStyles.body1,
  },
  large: {
    minHeight: fieldHeights.large,
    ...shorthands.padding('0', tokens.spacingHorizontalM),
    ...contentSizes[400],
    ...shorthands.gap(tokens.spacingHorizontalSNudge),
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
    '::after': shorthands.borderRadius(0), // remove rounded corners from focus underline
  },
  filled: {
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
  },
  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  'filled-lighter': {
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
    ...shorthands.padding('0', tokens.spacingHorizontalXXS),
    color: tokens.colorNeutralForeground1,
    // Use literal "transparent" (not from the theme) to always let the color from the root show through
    backgroundColor: 'transparent',

    '::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1, // browser style override
    },

    outlineStyle: 'none', // disable default browser outline
  },
  small: {
    // This is set on root but doesn't inherit
    ...typographyStyles.caption1,
  },
  medium: {
    ...typographyStyles.body1,
  },
  large: {
    ...contentSizes[400],
    ...shorthands.padding('0', tokens.spacingHorizontalSNudge),
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
