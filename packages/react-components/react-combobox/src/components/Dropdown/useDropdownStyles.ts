import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { DropdownSlots, DropdownState } from './Dropdown.types';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  button: 'fui-Dropdown__button',
  expandIcon: 'fui-Dropdown__expandIcon',
  listbox: 'fui-Dropdown__listbox',
};

/**
 * Styles for Dropdown
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThin, 'solid', 'transparent'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    display: 'inline-block',
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

  listboxCollapsed: {
    display: 'none',
  },

  button: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.border('0'),
    boxSizing: 'border-box',
    columnGap: tokens.spacingHorizontalXXS,
    display: 'grid',
    fontFamily: tokens.fontFamilyBase,
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: tokens.colorNeutralForeground4,
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
  'filled-lighter': {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
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
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  const { appearance, open, placeholderVisible, size } = state;
  const styles = useStyles();
  const iconStyles = useIconStyles();

  state.root.className = mergeClasses(dropdownClassNames.root, styles.root, styles[appearance], state.root.className);

  state.button.className = mergeClasses(
    dropdownClassNames.button,
    styles.button,
    styles[size],
    placeholderVisible && styles.placeholder,
    state.button.className,
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      dropdownClassNames.listbox,
      styles.listbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      dropdownClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      state.expandIcon.className,
    );
  }

  return state;
};
