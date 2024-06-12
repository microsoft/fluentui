import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { DropdownSlots, DropdownState } from './Dropdown.types';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  button: 'fui-Dropdown__button',
  clearButton: 'fui-Dropdown__clearButton',
  expandIcon: 'fui-Dropdown__expandIcon',
  listbox: 'fui-Dropdown__listbox',
};

/**
 * Styles for Dropdown
 */
const useStyles = makeStyles({
  root: {
    borderRadius: `var(--919, var(--920, ${tokens.borderRadiusMedium}))`,
    boxSizing: 'border-box',
    display: 'inline-flex',
    minWidth: '250px',
    position: 'relative',
    verticalAlign: 'middle',

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
      height: `max(${tokens.strokeWidthThick}, ${tokens.borderRadiusMedium})`,
      borderBottomLeftRadius: `var(--921, var(--922, ${tokens.borderRadiusMedium}))`,
      borderBottomRightRadius: `var(--923, var(--924, ${tokens.borderRadiusMedium}))`,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--925, var(--926, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--927, var(--928, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--929, var(--930, ${tokens.durationNormal}))`,
      transitionDelay: `var(--931, var(--932, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: `var(--933, var(--934, ${tokens.colorCompoundBrandStrokePressed}))`,
    },

    '@supports selector(:has(*))': {
      [`:has(.${dropdownClassNames.clearButton}:focus)::after`]: {
        borderBottomColor: 'initial',
        transform: 'scaleX(0)',
      },
    },
  },

  listbox: {
    boxSizing: 'border-box',
    boxShadow: `${tokens.shadow16}`,
    borderRadius: `var(--935, var(--936, ${tokens.borderRadiusMedium}))`,
    maxHeight: '80vh',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: {
    zIndex: 1,
  },

  button: {
    alignItems: 'center',
    backgroundColor: `var(--937, var(--938, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    boxSizing: 'border-box',
    color: `var(--939, var(--940, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--941, var(--942, ${tokens.spacingHorizontalXXS}))`,
    cursor: 'pointer',
    display: 'grid',
    fontFamily: `var(--943, var(--944, ${tokens.fontFamilyBase}))`,
    gridTemplateColumns: '[content] 1fr [icon] auto [end]',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: `var(--945, var(--946, ${tokens.colorNeutralForeground4}))`,
  },

  // size variants
  small: {
    ...typographyStyles.caption1,
    padding: `3px ${
      tokens.spacingHorizontalSNudge
    } 3px ${`calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  medium: {
    ...typographyStyles.body1,
    padding: `5px ${
      tokens.spacingHorizontalMNudge
    } 5px ${`calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  large: {
    columnGap: `var(--947, var(--948, ${tokens.spacingHorizontalSNudge}))`,
    ...typographyStyles.body2,
    padding: `7px ${
      tokens.spacingHorizontalM
    } 7px ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--949, var(--950, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--951, var(--952, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--953, var(--954, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--955, var(--956, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--957, var(--958, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--959, var(--960, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  'filled-darker': {
    backgroundColor: `var(--961, var(--962, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--963, var(--964, ${tokens.colorPaletteRedBorder2}))`,
    },
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--965, var(--966, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  disabledText: {
    color: `var(--967, var(--968, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
  },

  hidden: {
    display: 'none',
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: `var(--969, var(--970, ${tokens.colorNeutralStrokeAccessible}))`,
    display: 'block',
    fontSize: `var(--971, var(--972, ${tokens.fontSizeBase500}))`,
    gridColumnStart: 'icon',
    gridColumnEnd: 'end',

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },

  // icon size variants
  small: {
    fontSize: iconSizes.small,
    marginLeft: `var(--973, var(--974, ${tokens.spacingHorizontalXXS}))`,
  },
  medium: {
    fontSize: iconSizes.medium,
    marginLeft: `var(--975, var(--976, ${tokens.spacingHorizontalXXS}))`,
  },
  large: {
    fontSize: iconSizes.large,
    marginLeft: `var(--977, var(--978, ${tokens.spacingHorizontalSNudge}))`,
  },

  disabled: {
    color: `var(--979, var(--980, ${tokens.colorNeutralForegroundDisabled}))`,
  },
});

const useBaseClearButtonStyle = makeResetStyles({
  alignSelf: 'center',
  backgroundColor: `var(--981, var(--982, ${tokens.colorTransparentBackground}))`,
  border: 'none',
  cursor: 'pointer',
  height: 'fit-content',
  margin: 0,
  marginRight: `var(--983, var(--984, ${tokens.spacingHorizontalMNudge}))`,
  padding: 0,
  position: 'relative',

  ...createFocusOutlineStyle(),
});

/**
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  'use no memo';

  const { appearance, open, placeholderVisible, showClearButton, size } = state;
  const invalid = `${state.button['aria-invalid']}` === 'true';
  const disabled = state.button.disabled;
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const clearButtonStyle = useBaseClearButtonStyle();

  state.root.className = mergeClasses(
    dropdownClassNames.root,
    styles.root,
    styles[appearance],
    !disabled && appearance === 'outline' && styles.outlineInteractive,
    invalid && appearance !== 'underline' && styles.invalid,
    invalid && appearance === 'underline' && styles.invalidUnderline,
    disabled && styles.disabled,
    state.root.className,
  );

  state.button.className = mergeClasses(
    dropdownClassNames.button,
    styles.button,
    styles[size],
    placeholderVisible && styles.placeholder,
    disabled && styles.disabledText,
    state.button.className,
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      dropdownClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      dropdownClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      showClearButton && styles.hidden,
      state.expandIcon.className,
    );
  }

  if (state.clearButton) {
    state.clearButton.className = mergeClasses(
      dropdownClassNames.clearButton,
      clearButtonStyle,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      !showClearButton && styles.hidden,
      state.clearButton.className,
    );
  }

  return state;
};
