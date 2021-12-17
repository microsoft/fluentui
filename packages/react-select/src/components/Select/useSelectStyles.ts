import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import type { Theme } from '@fluentui/react-theme';
import type { SelectState } from './Select.types';

// TODO: (also from Input) use theme values once available
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

// TODO: borrowed from Input, also seems like animation should be included in the theme:
const motionDurations = {
  ultraFast: '0.05s',
  normal: '0.2s',
};
const motionCurves = {
  accelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  decelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
};

// TODO: borrowed this from Input, should be in the theme somewhere?
// Form fields with text values share the same size/appearance variants/font sizes
const backgroundColors = {
  filledLighter: (theme: Theme) => theme.colorNeutralBackground1,
  filledDarker: (theme: Theme) => theme.colorNeutralBackground3,
  transparent: (theme: Theme) => theme.colorTransparentBackground,
};

const useStyles = makeStyles({
  wrapper: theme => ({
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'nowrap',
    fontFamily: theme.fontFamilyBase,
    position: 'relative',

    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },

    '&::after': {
      backgroundImage: `linear-gradient(
        0deg,
        ${theme.colorCompoundBrandStroke} 0%,
        ${theme.colorCompoundBrandStroke} 50%,
        transparent 50%,
        transparent 100%
      )`,
      ...shorthands.borderRadius(0, 0, theme.borderRadiusMedium, theme.borderRadiusMedium),
      content: '""',
      height: theme.borderRadiusMedium,
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      transform: 'scaleX(0)',
      transition: `${motionDurations.ultraFast} transform ${motionCurves.accelerateMid}`,
    },

    '&:focus-within::after': {
      transform: 'scaleX(1)',
      transition: `${motionDurations.normal} transform ${motionCurves.decelerateMid}`,
    },
  }),
  select: theme => ({
    appearance: 'none',
    ...shorthands.border('1px', 'solid', 'transparent'),
    borderRadius: theme.borderRadiusMedium,
    boxShadow: 'none',
    color: theme.colorNeutralForeground1,
    flexGrow: '1',
    fontFamily: theme.fontFamilyBase,

    '&:focus': {
      outlineColor: 'transparent',
    },
  }),
  disabled: theme => ({
    backgroundColor: theme.colorTransparentBackground,
    color: theme.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',
  }),
  small: theme => ({
    height: fieldHeights.small,
    ...shorthands.padding('0', horizontalSpacing.sNudge),
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    height: fieldHeights.medium,
    ...shorthands.padding('0', horizontalSpacing.mNudge),
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    height: fieldHeights.large,
    ...shorthands.padding('0', horizontalSpacing.m),
    ...contentSizes[400](theme),
  }),
  outline: theme => ({
    backgroundColor: backgroundColors.filledLighter(theme),
    ...shorthands.border('1px', 'solid', theme.colorNeutralStroke1),
    borderBottomColor: theme.colorNeutralStrokeAccessible,
  }),
  underline: theme => ({
    backgroundColor: backgroundColors.transparent(theme),
    ...shorthands.borderBottom('1px', 'solid', theme.colorNeutralStrokeAccessible),
    borderRadius: 0,
  }),
  filledLighter: theme => ({
    backgroundColor: backgroundColors.filledLighter(theme),
  }),
  filledDarker: theme => ({
    backgroundColor: backgroundColors.filledDarker(theme),
  }),
  inline: {
    display: 'inline-flex',
  },
});

const useIconStyles = makeStyles({
  icon: theme => ({
    color: theme.colorNeutralStrokeAccessible,
    display: 'block',
    position: 'absolute',
    right: '0',
    pointerEvents: 'none',

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  }),
  small: {
    paddingRight: horizontalSpacing.sNudge,
    paddingLeft: horizontalSpacing.xxs,
  },
  medium: {
    paddingRight: horizontalSpacing.mNudge,
    paddingLeft: horizontalSpacing.xxs,
  },
  large: {
    paddingRight: horizontalSpacing.m,
    paddingLeft: horizontalSpacing.sNudge,
  },
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles = (state: SelectState): SelectState => {
  const {
    appearance,
    inline,
    size,
    select: { disabled },
  } = state;
  const selectStyles = useStyles();
  const iconStyles = useIconStyles();

  state.root.className = mergeClasses(selectStyles.wrapper, inline && selectStyles.inline, state.root.className);

  state.select.className = mergeClasses(
    selectStyles.select,
    selectStyles[size],
    selectStyles[appearance],
    disabled && selectStyles.disabled,
    state.select.className,
  );

  state.icon.className = mergeClasses(iconStyles.icon, iconStyles[size], state.icon.className);

  return state;
};
