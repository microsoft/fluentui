import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  input: 'fui-Combobox__input',
  expandIcon: 'fui-Combobox__expandIcon',
  listbox: 'fui-Combobox__listbox',
};

/**
 * Styles for Combobox
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', 'transparent'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    columnGap: tokens.spacingHorizontalXXS,
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    minWidth: '160px',
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

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
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
      borderBottomColor: tokens.colorCompoundBrandStrokePressed,
    },
  },

  listbox: {},

  // size variants
  small: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  medium: {
    paddingRight: tokens.spacingHorizontalMNudge,
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalM,
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
  'filled-lighter': {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const useInputStyles = makeStyles({
  input: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    fontFamily: tokens.fontFamilyBase,

    '&:focus': {
      outlineStyle: 'none',
    },

    '&::placeholder': {
      color: tokens.colorNeutralForeground4,
      opacity: 1,
    },
  },

  // size variants
  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding('3px', 0, '3px', tokens.spacingHorizontalSNudge),
  },
  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding('5px', 0, '5px', tokens.spacingHorizontalMNudge),
  },
  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    ...shorthands.padding('7px', 0, '7px', tokens.spacingHorizontalM),
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: tokens.colorNeutralStrokeAccessible,
    display: 'block',
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
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const { appearance, size } = state;
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    comboboxClassNames.root,
    styles.root,
    styles[appearance],
    styles[size],
    state.root.className,
  );
  state.listbox.className = mergeClasses(comboboxClassNames.listbox, styles.listbox, state.listbox.className);
  state.input.className = mergeClasses(
    comboboxClassNames.input,
    inputStyles.input,
    inputStyles[size],
    state.input.className,
  );

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      comboboxClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      state.expandIcon.className,
    );
  }

  return state;
};
