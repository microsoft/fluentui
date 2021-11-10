import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { SelectState } from './Select.types';
import type { Theme } from '@fluentui/react-theme';

const contentSizes = {
  // TODO: borrowed this from Input, should be in the theme somewhere?
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
// TODO: borrowed this from Input (Select has the same size in design comps)
// Should be in the theme somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};
const borderRadius = (theme: Theme) => theme.borderRadiusMedium;

// TODO: borrowed this from Input, should be in the theme somewhere?
// Form fields with text values share the same size/appearance variants/font sizes
const backgroundColors = {
  filledLighter: (theme: Theme) => theme.colorNeutralBackground1,
  filledDarker: (theme: Theme) => theme.colorNeutralBackground3,
  transparent: (theme: Theme) => theme.colorTransparentBackground,
};

const useRootStyles = makeStyles({
  base: theme => ({
    fontFamily: theme.fontFamilyBase,
    boxSizing: 'border-box',
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
  }),
});

const useSelectElementStyles = makeStyles({
  base: theme => ({
    appearance: 'none',
    color: theme.colorNeutralForeground1,
    borderRadius: borderRadius,

    ':focus-visible': {
      outline: '2px solid transparent',
    },
  }),
  small: theme => ({
    height: fieldHeights.small,
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    height: fieldHeights.medium,
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    height: fieldHeights.large,
    ...contentSizes[400](theme),
  }),
  outline: theme => ({
    // This is set on selectWrapper but doesn't inherit
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
    background: theme.colorNeutralBackgroundDisabled,
  }),
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles = (state: SelectState): SelectState => {
  const { size = 'medium', appearance = 'outline' } = state;
  const disabled = state.select.disabled;
  const rootStyles = useRootStyles();
  const selectStyles = useSelectElementStyles();

  state.root.className = mergeClasses(rootStyles.base, state.root.className);

  state.select.className = mergeClasses(
    selectStyles.base,
    selectStyles[size],
    selectStyles[appearance],
    disabled && selectStyles.disabled,
    state.select.className,
  );

  return state;
};
