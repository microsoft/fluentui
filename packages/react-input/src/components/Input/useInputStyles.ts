import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { InputState } from './Input.types';
import type { Theme } from '@fluentui/react-theme';

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
  body1: (theme: Theme) => ({
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
  }),
  caption1: (theme: Theme) => ({
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
  }),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  400: (theme: Theme) => ({
    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
};
// TODO(sharing) should these be shared somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};
const borderRadius = (theme: Theme) => theme.global.borderRadius.medium;
const backgroundColors = {
  /** for outline/filledLighter */
  filledLighter: (theme: Theme) => theme.alias.color.neutral.neutralBackground1,
  filledDarker: (theme: Theme) => theme.alias.color.neutral.neutralBackground3,
  /** for underline */
  transparent: (theme: Theme) => theme.alias.color.neutral.transparentBackground,
};

const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    alignItems: 'stretch',
    minHeight: fieldHeights.medium, // minHeight not height in case of tall bookends
    fontFamily: theme.global.type.fontFamilies.base,
    ...contentSizes.body1(theme),
    boxSizing: 'border-box',
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
  }),
  rootSmall: theme => ({
    minHeight: fieldHeights.small,
    ...contentSizes.caption1(theme),
  }),
  rootLarge: theme => ({
    minHeight: fieldHeights.large,
    ...contentSizes[400](theme),
  }),
  rootInline: {
    display: 'inline-flex',
  },
  rootFilled: theme => ({
    // optional shadow for filled appearances
    boxShadow: theme.alias.shadow.shadow2,
    borderRadius: borderRadius(theme), // needed for shadow
  }),
  rootDisabled: {
    cursor: 'not-allowed',
  },
  input: theme => ({
    flexGrow: 1,
    border: 'none', // input itself never has a border (this is handled by inputWrapper)
    // TODO(design) is this what "Left/Right Padding in content" means? why do we need it?
    padding: `0 ${horizontalSpacing.xxs}`,
    color: theme.alias.color.neutral.neutralForeground1,
    // These are set on root or inputWrapper but don't inherit
    ...contentSizes.body1(theme),
    background: backgroundColors.filledLighter(theme), // for outline/filledLighter

    '::placeholder': {
      color: theme.alias.color.neutral.neutralForeground4, // for outline/underline/filledLighter
    },
    ':focus-visible': {
      outline: 'none', // disable default browser outline
    },
  }),
  inputSmall: theme => ({
    ...contentSizes.caption1(theme),
  }),
  inputLarge: theme => ({
    ...contentSizes[400](theme),
    // TODO(design) is this what "Left/Right Padding in content" means? why do we need it?
    padding: `0 ${horizontalSpacing.sNudge}`,
  }),
  inputFilledDarker: theme => ({
    backgroundColor: backgroundColors.filledDarker(theme),
  }),
  inputUnderline: theme => ({
    backgroundColor: backgroundColors.transparent(theme),
  }),
  inputDisabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    backgroundColor: theme.alias.color.neutral.transparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  }),
  inputWrapper: theme => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: horizontalSpacing.xxs,
    padding: `0 ${horizontalSpacing.mNudge}`,

    // Set this on inputWrapper rather than root since bookends will have separate background colors and borders
    background: backgroundColors.filledLighter(theme), // for outline/filledLighter

    // This may need to be conditionally applied to start/end corners when bookend styling is added
    borderRadius: borderRadius(theme),
  }),
  inputWrapperSmall: {
    padding: `0 ${horizontalSpacing.sNudge}`,
  },
  inputWrapperLarge: {
    padding: `0 ${horizontalSpacing.m}`,
  },
  inputWrapperFilled: theme => ({
    // This is set on inputWrapper since bookends have different borders.
    // Don't set it in the main inputWrapper style to avoid override issues for underline appearance.
    border: `1px solid ${theme.alias.color.neutral.transparentStroke}`,
  }),
  inputWrapperFilledDarker: theme => ({
    backgroundColor: backgroundColors.filledDarker(theme),
  }),
  inputWrapperUnderline: theme => ({
    backgroundColor: backgroundColors.transparent(theme),
    border: 'none', // set later
    borderRadius: 0, // corners look strange if rounded
  }),
  inputWrapperOutline: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStroke1}`,
  }),
  /** bottom border for underline/outline appearances */
  inputWrapperBorderBottom: theme => ({
    borderBottom: `1px solid ${theme.alias.color.neutral.neutralStrokeAccessible}`,
  }),
  inputWrapperDisabled: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeDisabled}`,
    borderRadius: borderRadius(theme), // because underline doesn't usually have a radius
  }),
  inside: theme => ({
    color: theme.alias.color.neutral.neutralForeground3, // "icon color" in design spec
    // special case styling for icons (most common case) to ensure they're centered vertically
    '> span > svg': { display: 'block' },
  }),
  insideDisabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles = (state: InputState): InputState => {
  const { size, appearance = 'outline' } = state;
  const small = size === 'small';
  const large = size === 'large';
  const underline = appearance === 'underline';
  const outline = appearance === 'outline';
  const filledDarker = appearance === 'filledDarker';
  const filledLighter = appearance === 'filledLighter';
  const disabled = state.input.disabled;

  const styles = useStyles();

  state.root.className = mergeClasses(
    styles.root,
    small && styles.rootSmall,
    large && styles.rootLarge,
    state.inline && styles.rootInline,
    (filledDarker || filledLighter) && styles.rootFilled,
    disabled && styles.rootDisabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    styles.input,
    small && styles.inputSmall,
    large && styles.inputLarge,
    filledDarker && styles.inputFilledDarker,
    underline && styles.inputUnderline,
    disabled && styles.inputDisabled,
    state.input.className,
  );

  state.inputWrapper.className = mergeClasses(
    styles.inputWrapper,
    small && styles.inputWrapperSmall,
    large && styles.inputWrapperLarge,
    (filledDarker || filledLighter) && styles.inputWrapperFilled,
    filledDarker && styles.inputWrapperFilledDarker,
    underline && styles.inputWrapperUnderline,
    outline && styles.inputWrapperOutline,
    (outline || underline) && styles.inputWrapperBorderBottom,
    disabled && styles.inputWrapperDisabled,
    state.inputWrapper.className,
  );

  const insideStyles = [styles.inside, disabled && styles.insideDisabled];
  if (state.insideStart) {
    state.insideStart.className = mergeClasses(...insideStyles, state.insideStart.className);
  }
  if (state.insideEnd) {
    state.insideEnd.className = mergeClasses(...insideStyles, state.insideEnd.className);
  }

  return state;
};
