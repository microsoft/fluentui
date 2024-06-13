import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InputSlots, InputState } from './Input.types';

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
    small: `var(--ctrl-token-Input-1161, var(--semantic-token-Input-1162, ${tokens.spacingHorizontalSNudge}))`,
    medium: `var(--ctrl-token-Input-1163, var(--semantic-token-Input-1164, ${tokens.spacingHorizontalMNudge}))`,
    large: `var(--ctrl-token-Input-1165, var(--semantic-token-Input-1166, ${tokens.spacingHorizontalM}))`,
  },
  input: {
    small: `var(--ctrl-token-Input-1167, var(--semantic-token-Input-1168, ${tokens.spacingHorizontalXXS}))`,
    medium: `var(--ctrl-token-Input-1169, var(--semantic-token-Input-1170, ${tokens.spacingHorizontalXXS}))`,
    large: `var(--ctrl-token-Input-1171, var(--semantic-token-Input-1172, ${tokens.spacingHorizontalSNudge}))`,
  },
  combined: {
    small: `var(--ctrl-token-Input-1173, var(--semantic-token-Input-1174, ${tokens.spacingHorizontalS}))`, // SNudge + XXS
    medium: `var(--ctrl-token-Input-1175, var(--semantic-token-Input-1176, ${tokens.spacingHorizontalM}))`, // MNudge + XXS
    large: `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`,
  },
};

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: `var(--ctrl-token-Input-1177, var(--semantic-token-Input-1178, ${tokens.spacingHorizontalXXS}))`,
  borderRadius: `var(--ctrl-token-Input-1179, var(--semantic-token-Input-1180, ${tokens.borderRadiusMedium}))`, // used for all but underline
  position: 'relative',
  boxSizing: 'border-box',

  // size: medium (default)
  minHeight: fieldHeights.medium,
  ...typographyStyles.body1,

  // appearance: outline (default)
  backgroundColor: `var(--ctrl-token-Input-1181, var(--semantic-token-Input-1182, ${tokens.colorNeutralBackground1}))`,
  border: `1px solid ${tokens.colorNeutralStroke1}`,
  borderBottomColor: `var(--ctrl-token-Input-1183, var(--semantic-token-Input-1184, ${tokens.colorNeutralStrokeAccessible}))`,

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
    borderBottomLeftRadius: `var(--ctrl-token-Input-1185, var(--semantic-token-Input-1186, ${tokens.borderRadiusMedium}))`,
    borderBottomRightRadius: `var(--ctrl-token-Input-1187, var(--semantic-token-Input-1188, ${tokens.borderRadiusMedium}))`,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
    clipPath: 'inset(calc(100% - 2px) 0 0 0)',

    // Animation for focus OUT
    transform: 'scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: `var(--ctrl-token-Input-1189, var(--semantic-token-Input-1190, ${tokens.durationUltraFast}))`,
    transitionDelay: `var(--ctrl-token-Input-1191, var(--semantic-token-Input-1192, ${tokens.curveAccelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },
  ':focus-within::after': {
    // Animation for focus IN
    transform: 'scaleX(1)',
    transitionProperty: 'transform',
    transitionDuration: `var(--ctrl-token-Input-1193, var(--semantic-token-Input-1194, ${tokens.durationNormal}))`,
    transitionDelay: `var(--ctrl-token-Input-1195, var(--semantic-token-Input-1196, ${tokens.curveDecelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },
  ':focus-within:active::after': {
    // This is if the user clicks the field again while it's already focused
    borderBottomColor: `var(--ctrl-token-Input-1197, var(--semantic-token-Input-1198, ${tokens.colorCompoundBrandStrokePressed}))`,
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
    gap: `var(--ctrl-token-Input-1199, var(--semantic-token-Input-1200, ${tokens.spacingHorizontalSNudge}))`,
  },
  outline: {
    // included in rootBaseStyles
  },
  outlineInteractive: {
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-Input-1201, var(--semantic-token-Input-1202, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-Input-1203, var(--semantic-token-Input-1204, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-Input-1205, var(--semantic-token-Input-1206, ${tokens.colorTransparentBackground}))`,
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
      borderBottomColor: `var(--ctrl-token-Input-1207, var(--semantic-token-Input-1208, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      borderBottomColor: `var(--ctrl-token-Input-1209, var(--semantic-token-Input-1210, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    },
    '::after': {
      // remove rounded corners from focus underline
      borderRadius: '0',
    },
  },
  filled: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-Input-1211, var(--semantic-token-Input-1212, ${tokens.colorNeutralBackground3}))`,
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-Input-1213, var(--semantic-token-Input-1214, ${tokens.colorNeutralBackground1}))`,
  },
  'filled-darker-shadow': {
    backgroundColor: `var(--ctrl-token-Input-1215, var(--semantic-token-Input-1216, ${tokens.colorNeutralBackground3}))`,
    boxShadow: `var(--ctrl-token-Input-1217, var(--semantic-token-Input-1218, ${tokens.shadow2}))`,
  },
  'filled-lighter-shadow': {
    backgroundColor: `var(--ctrl-token-Input-1219, var(--semantic-token-Input-1220, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--ctrl-token-Input-1221, var(--semantic-token-Input-1222, ${tokens.shadow2}))`,
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-Input-1223, var(--semantic-token-Input-1224, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
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
  color: `var(--ctrl-token-Input-1225, var(--semantic-token-Input-1226, ${tokens.colorNeutralForeground1}))`,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',

  '::placeholder': {
    color: `var(--ctrl-token-Input-1227, var(--semantic-token-Input-1228, ${tokens.colorNeutralForeground4}))`,
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
    color: `var(--ctrl-token-Input-1229, var(--semantic-token-Input-1230, ${tokens.colorNeutralForegroundDisabled}))`,
    backgroundColor: `var(--ctrl-token-Input-1231, var(--semantic-token-Input-1232, ${tokens.colorTransparentBackground}))`,
    cursor: 'not-allowed',
    '::placeholder': {
      color: `var(--ctrl-token-Input-1233, var(--semantic-token-Input-1234, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
});

const useContentClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: `var(--ctrl-token-Input-1235, var(--semantic-token-Input-1236, ${tokens.colorNeutralForeground3}))`, // "icon color" in design spec
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
});

const useContentStyles = makeStyles({
  disabled: {
    color: `var(--ctrl-token-Input-1237, var(--semantic-token-Input-1238, ${tokens.colorNeutralForegroundDisabled}))`,
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
