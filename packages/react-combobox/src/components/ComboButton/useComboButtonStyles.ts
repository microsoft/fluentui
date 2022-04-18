import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ComboButtonSlots, ComboButtonState } from './ComboButton.types';

export const comboButtonClassNames: SlotClassNames<ComboButtonSlots> = {
  root: 'fui-ComboButton',
  content: 'fui-ComboButton__content',
  expandIcon: 'fui-ComboButton__expandIcon',
};

/*
 * TODO: a number of spacing and animation values are shared with other form controls.
 * We should probably find a way to share these values between form controls in the theme.
 */

const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};

const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

const motionDurations = {
  ultraFast: '0.05s',
  normal: '0.2s',
};

const motionCurves = {
  accelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  decelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
};

/* end of shared values */

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  // TODO: add themed styles
  root: {
    ...shorthands.border('1px', 'solid', 'transparent'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    position: 'relative',

    // windows high contrast mode focus indicator
    ':focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },

    // bottom focus border, shared with Input, Select, and SpinButton
    '::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',
      height: `max(2px, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
      ...shorthands.borderBottom('2px', 'solid', tokens.colorCompoundBrandStroke),
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.ultraFast,
      transitionDelay: motionCurves.accelerateMid,
    },
    ':focus-within:after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: motionDurations.normal,
      transitionDelay: motionCurves.decelerateMid,
    },
    ':focus-within:active:after': {
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
  },

  content: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    boxSizing: 'border-box',
    columnGap: horizontalSpacing.xxs,
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  // size variants
  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding('3px', horizontalSpacing.sNudge),
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding('5px', horizontalSpacing.mNudge),
  },
  large: {
    columnGap: horizontalSpacing.sNudge,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    ...shorthands.padding('7px', horizontalSpacing.m),
  },

  // appearance variants
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    color: 'red',
  },
  underline: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    ...shorthands.borderRadius(0),
  },
  filledLighter: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filledDarker: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    fontSize: tokens.fontSizeBase500,

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },

  // icon size variants
  small: {
    fontSize: iconSizes.small,
  },
  medium: {
    fontSize: iconSizes.medium,
  },
  large: {
    fontSize: iconSizes.large,
  },
});

/**
 * Apply styling to the ComboButton slots based on the state
 */
export const useComboButtonStyles_unstable = (state: ComboButtonState): ComboButtonState => {
  const { appearance, size } = state;
  const styles = useStyles();
  const iconStyles = useIconStyles();

  state.root.className = mergeClasses(
    comboButtonClassNames.root,
    styles.root,
    styles[appearance],
    state.root.className,
  );
  state.content.className = mergeClasses(
    comboButtonClassNames.content,
    styles.content,
    styles[size],
    state.content.className,
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      comboButtonClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      state.expandIcon.className,
    );
  }

  return state;
};
