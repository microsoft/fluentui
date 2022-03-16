import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';
import type { Theme } from '@fluentui/react-theme';

/**
 * @deprecated Use `selectClassNames.root` instead.
 */
export const selectClassName = 'fui-Select';
export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
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
// Form fields share the same size/appearance variants/font sizes
const backgroundColors = {
  /** for outline/filledLighter */
  filledLighter: (theme: Theme) => theme.colorNeutralBackground1,
  filledDarker: (theme: Theme) => theme.colorNeutralBackground3,
  /** for underline */
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

const useStyles = makeStyles({
  base: theme => ({
    padding: `0 ${horizontalSpacing.xxs}`,
    color: theme.colorNeutralForeground1,
    borderRadios: borderRadius,

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
    padding: `0 ${horizontalSpacing.sNudge}`,
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
    background: theme.colorTransparentBackground,
  }),
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const { size = 'medium', appearance = 'outline' } = state;
  const disabled = state.select.disabled;
  const selectStyles = useStyles();

  state.root.className = mergeClasses(selectClassNames.root, selectStyles.wrapper, state.root.className);

  state.select.className = mergeClasses(
    selectClassNames.select,
    selectStyles.base,
    selectStyles[size],
    selectStyles[appearance],
    disabled && selectStyles.disabled,
    state.select.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(selectClassNames.icon, state.icon.className);
  }

  return state;
};
