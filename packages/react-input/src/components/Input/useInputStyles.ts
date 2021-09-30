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
const borderRadius = (theme: Theme) => theme.borderRadiusMedium;
const backgroundColors = {
  /** for outline/filledLighter */
  filledLighter: (theme: Theme) => theme.colorNeutralBackground1,
  filledDarker: (theme: Theme) => theme.colorNeutralBackground3,
  /** for underline */
  transparent: (theme: Theme) => theme.colorTransparentBackground,
};

const useRootStyles = makeStyles({
  base: theme => ({
    display: 'flex',
    alignItems: 'stretch',
    flexWrap: 'no-wrap',
    fontFamily: theme.fontFamilyBase,
    boxSizing: 'border-box',
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
  }),
  small: theme => ({
    minHeight: fieldHeights.small,
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    minHeight: fieldHeights.medium, // minHeight not height in case of tall bookends
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    minHeight: fieldHeights.large,
    ...contentSizes[400](theme),
  }),
  inline: {
    display: 'inline-flex',
  },
  filled: theme => ({
    // optional shadow for filled appearances
    boxShadow: theme.shadowLevelShadow2,
    borderRadius: borderRadius(theme), // needed for shadow
  }),
  disabled: {
    cursor: 'not-allowed',
  },
});

const useInputElementStyles = makeStyles({
  base: theme => ({
    flexGrow: 1,
    border: 'none', // input itself never has a border (this is handled by inputWrapper)
    padding: `0 ${horizontalSpacing.xxs}`,
    color: theme.colorNeutralForeground1,

    '::placeholder': {
      color: theme.colorNeutralForeground4,
      opacity: 1, // browser style override
    },
    ':focus-visible': {
      outline: 'none', // disable default browser outline
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
    padding: `0 ${horizontalSpacing.sNudge}`,
  }),
  outline: theme => ({
    // This is set on inputWrapper but doesn't inherit
    background: backgroundColors.filledLighter(theme),
  }),
  underline: theme => ({
    background: backgroundColors.transparent(theme),
  }),
  filledLighter: theme => ({
    background: backgroundColors.filledLighter(theme),
  }),
  filledDarker: theme => ({
    background: backgroundColors.filledDarker(theme),
  }),
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    background: theme.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

const useInputWrapperStyles = makeStyles({
  base: theme => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
    gap: horizontalSpacing.xxs,

    // This may need to be conditionally applied to start/end corners when bookend styling is added
    borderRadius: borderRadius(theme),
  }),
  small: {
    padding: `0 ${horizontalSpacing.sNudge}`,
  },
  medium: {
    padding: `0 ${horizontalSpacing.mNudge}`,
  },
  large: {
    padding: `0 ${horizontalSpacing.m}`,
  },
  outline: theme => ({
    // Set this on inputWrapper rather than root since bookends will have separate background colors and borders
    background: backgroundColors.filledLighter(theme),
    border: `1px solid ${theme.colorNeutralStroke1}`,
    borderBottom: `1px solid ${theme.colorNeutralStrokeAccessible}`,
  }),
  underline: theme => ({
    backgroundColor: backgroundColors.transparent(theme),
    borderRadius: 0, // corners look strange if rounded
    borderBottom: `1px solid ${theme.colorNeutralStrokeAccessible}`,
  }),
  filledDarker: theme => ({
    background: backgroundColors.filledDarker(theme),
    border: `1px solid ${theme.colorTransparentStroke}`,
  }),
  filledLighter: theme => ({
    background: backgroundColors.filledLighter(theme),
    border: `1px solid ${theme.colorTransparentStroke}`,
  }),
  disabled: theme => ({
    border: `1px solid ${theme.colorNeutralStrokeDisabled}`,
    borderRadius: borderRadius(theme), // because underline doesn't usually have a radius
  }),
});

const useInsideStyles = makeStyles({
  base: theme => ({
    color: theme.colorNeutralForeground3, // "icon color" in design spec
    // special case styling for icons (most common case) to ensure they're centered vertically
    '> span > svg': { display: 'block' },
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
  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const inputWrapperStyles = useInputWrapperStyles();
  const insideStyles = useInsideStyles();

  const filled = appearance.startsWith('filled');

  state.root.className = mergeClasses(
    rootStyles.base,
    rootStyles[size],
    state.inline && rootStyles.inline,
    filled && rootStyles.filled,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputStyles.base,
    inputStyles[size],
    inputStyles[appearance],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  state.inputWrapper.className = mergeClasses(
    inputWrapperStyles.base,
    inputWrapperStyles[size],
    inputWrapperStyles[appearance],
    disabled && inputWrapperStyles.disabled,
    state.inputWrapper.className,
  );

  const insideClasses = [insideStyles.base, disabled && insideStyles.disabled];
  if (state.insideStart) {
    state.insideStart.className = mergeClasses(...insideClasses, state.insideStart.className);
  }
  if (state.insideEnd) {
    state.insideEnd.className = mergeClasses(...insideClasses, state.insideEnd.className);
  }

  return state;
};
