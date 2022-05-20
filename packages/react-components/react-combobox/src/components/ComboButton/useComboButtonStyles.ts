import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { ComboButtonSlots, ComboButtonState } from './ComboButton.types';

export const comboButtonClassNames: SlotClassNames<ComboButtonSlots> = {
  root: 'fui-ComboButton',
  content: 'fui-ComboButton__content',
  expandIcon: 'fui-ComboButton__expandIcon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
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
      transitionDuration: tokens.durationUltraFast,
      transitionDelay: tokens.curveAccelerateMid,
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: tokens.durationNormal,
      transitionDelay: tokens.curveDecelerateMid,
    },
    ':focus-within:active::after': {
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
  },

  content: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    boxSizing: 'border-box',
    columnGap: tokens.spacingHorizontalXXS,
    display: 'flex',
    flexWrap: 'nowrap',
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
    ...shorthands.padding('3px', tokens.spacingHorizontalSNudge),
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding('5px', tokens.spacingHorizontalMNudge),
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    ...shorthands.padding('7px', tokens.spacingHorizontalM),
  },

  // appearance variants
  outline: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
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
