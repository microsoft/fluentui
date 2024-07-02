import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconSizes } from '../../utils/internalTokens';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  input: 'fui-Combobox__input',
  expandIcon: 'fui-Combobox__expandIcon',
  clearIcon: 'fui-Combobox__clearIcon',
  listbox: 'fui-Combobox__listbox',
};

// Matches internal heights for Select and Input, but there are no theme variables for these
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

/**
 * Styles for Combobox
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    borderRadius: `var(--ctrl-token-Combobox-847, var(--semantic-token-Combobox-848, ${tokens.borderRadiusMedium}))`,
    boxSizing: 'border-box',
    columnGap: `var(--ctrl-token-Combobox-849, var(--semantic-token-Combobox-850, ${tokens.spacingHorizontalXXS}))`,
    display: 'inline-grid',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    minWidth: '250px',
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
      borderBottomLeftRadius: `var(--ctrl-token-Combobox-851, var(--semantic-token-Combobox-852, ${tokens.borderRadiusMedium}))`,
      borderBottomRightRadius: `var(--ctrl-token-Combobox-853, var(--semantic-token-Combobox-854, ${tokens.borderRadiusMedium}))`,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Combobox-855, var(--semantic-token-Combobox-856, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--ctrl-token-Combobox-857, var(--semantic-token-Combobox-858, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Combobox-859, var(--semantic-token-Combobox-860, ${tokens.durationNormal}))`,
      transitionDelay: `var(--ctrl-token-Combobox-861, var(--semantic-token-Combobox-862, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: `var(--ctrl-token-Combobox-863, var(--semantic-token-Combobox-864, ${tokens.colorCompoundBrandStrokePressed}))`,
    },
  },

  listbox: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: `var(--ctrl-token-Combobox-865, var(--semantic-token-Combobox-866, ${tokens.borderRadiusMedium}))`,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
  // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
  inlineListbox: {
    zIndex: 1,
  },

  // size variants
  small: {
    height: fieldHeights.small,
    paddingRight: `var(--ctrl-token-Combobox-867, var(--semantic-token-Combobox-868, ${tokens.spacingHorizontalSNudge}))`,
  },
  medium: {
    height: fieldHeights.medium,
    paddingRight: `var(--ctrl-token-Combobox-869, var(--semantic-token-Combobox-870, ${tokens.spacingHorizontalMNudge}))`,
  },
  large: {
    columnGap: `var(--ctrl-token-Combobox-871, var(--semantic-token-Combobox-872, ${tokens.spacingHorizontalSNudge}))`,
    height: fieldHeights.large,
    paddingRight: `var(--ctrl-token-Combobox-873, var(--semantic-token-Combobox-874, ${tokens.spacingHorizontalM}))`,
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--ctrl-token-Combobox-875, var(--semantic-token-Combobox-876, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-Combobox-877, var(--semantic-token-Combobox-878, ${tokens.colorNeutralStrokeAccessible}))`,
  },

  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-Combobox-879, var(--semantic-token-Combobox-880, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-Combobox-881, var(--semantic-token-Combobox-882, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-Combobox-883, var(--semantic-token-Combobox-884, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-Combobox-885, var(--semantic-token-Combobox-886, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-Combobox-887, var(--semantic-token-Combobox-888, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--ctrl-token-Combobox-889, var(--semantic-token-Combobox-890, ${tokens.colorPaletteRedBorder2}))`,
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-Combobox-891, var(--semantic-token-Combobox-892, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
});

const useInputStyles = makeStyles({
  input: {
    alignSelf: 'stretch',
    backgroundColor: `var(--ctrl-token-Combobox-893, var(--semantic-token-Combobox-894, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    color: `var(--ctrl-token-Combobox-895, var(--semantic-token-Combobox-896, ${tokens.colorNeutralForeground1}))`,
    fontFamily: `var(--ctrl-token-Combobox-897, var(--semantic-token-Combobox-898, ${tokens.fontFamilyBase}))`,

    '&:focus': {
      outlineStyle: 'none',
    },

    '&::placeholder': {
      color: `var(--ctrl-token-Combobox-899, var(--semantic-token-Combobox-900, ${tokens.colorNeutralForeground4}))`,
      opacity: 1,
    },
  },

  // size variants
  small: {
    ...typographyStyles.caption1,
    padding: `0 0 0 ${`calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  medium: {
    ...typographyStyles.body1,
    padding: `0 0 0 ${`calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  large: {
    ...typographyStyles.body2,
    padding: `0 0 0 ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
  },
  disabled: {
    color: `var(--ctrl-token-Combobox-901, var(--semantic-token-Combobox-902, ${tokens.colorNeutralForegroundDisabled}))`,
    backgroundColor: `var(--ctrl-token-Combobox-903, var(--semantic-token-Combobox-904, ${tokens.colorTransparentBackground}))`,
    cursor: 'not-allowed',
    '::placeholder': {
      color: `var(--ctrl-token-Combobox-905, var(--semantic-token-Combobox-906, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: `var(--ctrl-token-Combobox-907, var(--semantic-token-Combobox-908, ${tokens.colorNeutralStrokeAccessible}))`,
    cursor: 'pointer',
    display: 'block',
    fontSize: `var(--ctrl-token-Combobox-909, var(--semantic-token-Combobox-910, ${tokens.fontSizeBase500}))`,

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  hidden: {
    display: 'none',
  },
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute',
  },

  // icon size variants
  small: {
    fontSize: iconSizes.small,
    marginLeft: `var(--ctrl-token-Combobox-911, var(--semantic-token-Combobox-912, ${tokens.spacingHorizontalXXS}))`,
  },
  medium: {
    fontSize: iconSizes.medium,
    marginLeft: `var(--ctrl-token-Combobox-913, var(--semantic-token-Combobox-914, ${tokens.spacingHorizontalXXS}))`,
  },
  large: {
    fontSize: iconSizes.large,
    marginLeft: `var(--ctrl-token-Combobox-915, var(--semantic-token-Combobox-916, ${tokens.spacingHorizontalSNudge}))`,
  },
  disabled: {
    color: `var(--ctrl-token-Combobox-917, var(--semantic-token-Combobox-918, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
  },
});

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  'use no memo';

  const { appearance, open, size, showClearIcon } = state;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const disabled = state.input.disabled;
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    comboboxClassNames.root,
    styles.root,
    styles[appearance],
    styles[size],
    !disabled && appearance === 'outline' && styles.outlineInteractive,
    invalid && appearance !== 'underline' && styles.invalid,
    invalid && appearance === 'underline' && styles.invalidUnderline,
    disabled && styles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    comboboxClassNames.input,
    inputStyles.input,
    inputStyles[size],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  if (state.listbox) {
    state.listbox.className = mergeClasses(
      comboboxClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inlineListbox,
      !open && styles.listboxCollapsed,
      state.listbox.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      comboboxClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      showClearIcon && iconStyles.visuallyHidden,
      state.expandIcon.className,
    );
  }

  if (state.clearIcon) {
    state.clearIcon.className = mergeClasses(
      comboboxClassNames.clearIcon,
      iconStyles.icon,
      iconStyles[size],
      disabled && iconStyles.disabled,
      !showClearIcon && iconStyles.hidden,
      state.clearIcon.className,
    );
  }

  return state;
};
