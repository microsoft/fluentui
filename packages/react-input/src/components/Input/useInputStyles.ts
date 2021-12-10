import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import type { InputState } from './Input.types';
import type { Theme } from '@fluentui/react-theme';

export const inputClassName = 'fui-Input';

// TODO(sharing) use theme values once available
const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};
const motionDurations = {
  ultraFast: '0.05s',
  normal: '0.2s',
};
const motionCurves = {
  accelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  decelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
};
const contentSizes = {
  // TODO(sharing) shouldn't these be in the theme?
  body1: (theme: Theme) => ({
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
  }),
  caption1: (theme: Theme) => ({
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
  }),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  400: (theme: Theme) => ({
    fontSize: theme.fontSizeBase400,
    lineHeight: theme.lineHeightBase400,
  }),
};
// TODO(sharing) should these be shared somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

const useRootStyles = makeStyles({
  base: theme => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    ...shorthands.gap(horizontalSpacing.xxs),
    fontFamily: theme.fontFamilyBase,
    ...shorthands.borderRadius(theme.borderRadiusMedium), // used for all but underline
    position: 'relative',
    boxSizing: 'border-box',

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
      // max() ensures the focus border still shows up even if someone sets theme.borderRadiusMedium to 0.
      height: `max(2px, ${theme.borderRadiusMedium})`,
      borderBottomLeftRadius: theme.borderRadiusMedium,
      borderBottomRightRadius: theme.borderRadiusMedium,

      // Flat 2px border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      // (This could be done without trimming using `background: linear-gradient(...)`, but using
      // borderBottom makes it easier for people to override the color if needed.)
      ...shorthands.borderBottom('2px', 'solid', theme.colorCompoundBrandStroke),
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',

      // Animation for focus OUT
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.ultraFast,
      transitionDelay: motionCurves.accelerateMid,
    },
    ':focus-within:after': {
      // Animation for focus IN
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.normal,
      transitionDelay: motionCurves.decelerateMid,
    },
    ':focus-within:active:after': {
      // This is if the user clicks the field again while it's already focused
      borderBottomColor: theme.colorCompoundBrandStrokePressed,
    },
  }),
  small: theme => ({
    minHeight: fieldHeights.small,
    ...shorthands.padding('0', horizontalSpacing.sNudge),
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    minHeight: fieldHeights.medium,
    ...shorthands.padding('0', horizontalSpacing.mNudge),
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    minHeight: fieldHeights.large,
    ...shorthands.padding('0', horizontalSpacing.m),
    ...contentSizes[400](theme),
    ...shorthands.gap(horizontalSpacing.sNudge),
  }),
  inline: {
    display: 'inline-flex',
  },
  outline: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', theme.colorNeutralStroke1),
    borderBottomColor: theme.colorNeutralStrokeAccessible,
    ':hover': {
      ...shorthands.borderColor(theme.colorNeutralStroke1Hover),
      borderBottomColor: theme.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      ...shorthands.borderColor(theme.colorNeutralStroke1Pressed),
      borderBottomColor: theme.colorNeutralStrokeAccessiblePressed,
    },
  }),
  underline: theme => ({
    backgroundColor: theme.colorTransparentBackground,
    ...shorthands.borderRadius(0), // corners look strange if rounded
    ...shorthands.borderBottom('1px', 'solid', theme.colorNeutralStrokeAccessible),
    ':hover': {
      borderBottomColor: theme.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      borderBottomColor: theme.colorNeutralStrokeAccessiblePressed,
    },
    ':after': shorthands.borderRadius(0), // remove rounded corners from focus underline
  }),
  filled: theme => ({
    boxShadow: theme.shadow2, // optional shadow for filled appearances
    ...shorthands.border('1px', 'solid', theme.colorTransparentStroke),
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      // also handles pressed border color (:active)
      ...shorthands.borderColor(theme.colorTransparentStrokeInteractive),
    },
  }),
  filledDarker: theme => ({
    backgroundColor: theme.colorNeutralBackground3,
  }),
  filledLighter: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
  }),
  disabled: theme => ({
    cursor: 'not-allowed',
    ...shorthands.border('1px', 'solid', theme.colorNeutralStrokeDisabled),
    ...shorthands.borderRadius(theme.borderRadiusMedium), // because underline doesn't usually have a radius
  }),
});

const useInputElementStyles = makeStyles({
  base: theme => ({
    boxSizing: 'border-box',
    flexGrow: 1,
    ...shorthands.borderStyle('none'), // input itself never has a border (this is handled by inputWrapper)
    ...shorthands.padding('0', horizontalSpacing.xxs),
    color: theme.colorNeutralForeground1,
    // Use literal "transparent" (not from the theme) to always let the color from the root show through
    backgroundColor: 'transparent',

    '::placeholder': {
      color: theme.colorNeutralForeground4,
      opacity: 1, // browser style override
    },
    ':focus-visible': {
      outlineStyle: 'none', // disable default browser outline
    },
  }),
  small: theme => ({
    // This is set on root but doesn't inherit
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    ...contentSizes[400](theme),
    ...shorthands.padding('0', horizontalSpacing.sNudge),
  }),
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    backgroundColor: theme.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

const useContentStyles = makeStyles({
  base: theme => ({
    boxSizing: 'border-box',
    color: theme.colorNeutralForeground3, // "icon color" in design spec
    // special case styling for icons (most common case) to ensure they're centered vertically
    '> svg': { display: 'block' },
  }),
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles = (state: InputState): InputState => {
  const { size = 'medium', appearance = 'outline' } = state;
  const disabled = state.input.disabled;
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    inputClassName,
    rootStyles.base,
    rootStyles[size],
    rootStyles[appearance],
    state.inline && rootStyles.inline,
    filled && rootStyles.filled,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputStyles.base,
    inputStyles[size],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  const contentClasses = [contentStyles.base, disabled && contentStyles.disabled];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(...contentClasses, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(...contentClasses, state.contentAfter.className);
  }

  return state;
};
