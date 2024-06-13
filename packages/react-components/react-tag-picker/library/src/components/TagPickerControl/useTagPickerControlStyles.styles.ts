import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type {
  TagPickerControlInternalSlots,
  TagPickerControlSlots,
  TagPickerControlState,
} from './TagPickerControl.types';

export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots & TagPickerControlInternalSlots> = {
  root: 'fui-TagPickerControl',
  expandIcon: 'fui-TagPickerControl__expandIcon',
  secondaryAction: 'fui-TagPickerControl__secondaryAction',
  aside: 'fui-TagPickerControl__aside',
};

export const tagPickerControlAsideWidthToken = '--fui-TagPickerControl-aside-width' as const;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    borderRadius: `var(--ctrl-token-TagPickerControl-2213, var(--semantic-token-TagPickerControl-2214, ${tokens.borderRadiusMedium}))`,
    paddingRight: `calc(${tokens.spacingHorizontalM} + var(${tagPickerControlAsideWidthToken}, 0px))`,
    paddingLeft: `var(--ctrl-token-TagPickerControl-2215, var(--semantic-token-TagPickerControl-2216, ${tokens.spacingHorizontalM}))`,
    alignItems: 'center',
    columnGap: `var(--ctrl-token-TagPickerControl-2217, var(--semantic-token-TagPickerControl-2218, ${tokens.spacingHorizontalXXS}))`,
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: '250px',
    position: 'relative',
    flexWrap: 'wrap',

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
      borderBottomLeftRadius: `var(--ctrl-token-TagPickerControl-2219, var(--semantic-token-TagPickerControl-2220, ${tokens.borderRadiusMedium}))`,
      borderBottomRightRadius: `var(--ctrl-token-TagPickerControl-2221, var(--semantic-token-TagPickerControl-2222, ${tokens.borderRadiusMedium}))`,
      borderBottom: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}`,
      clipPath: 'inset(calc(100% - 2px) 0 0 0)',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-TagPickerControl-2223, var(--semantic-token-TagPickerControl-2224, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--ctrl-token-TagPickerControl-2225, var(--semantic-token-TagPickerControl-2226, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-TagPickerControl-2227, var(--semantic-token-TagPickerControl-2228, ${tokens.durationNormal}))`,
      transitionDelay: `var(--ctrl-token-TagPickerControl-2229, var(--semantic-token-TagPickerControl-2230, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
    ':focus-within:active::after': {
      borderBottomColor: `var(--ctrl-token-TagPickerControl-2231, var(--semantic-token-TagPickerControl-2232, ${tokens.colorCompoundBrandStrokePressed}))`,
    },
  },

  listbox: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: `var(--ctrl-token-TagPickerControl-2233, var(--semantic-token-TagPickerControl-2234, ${tokens.borderRadiusMedium}))`,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  listboxCollapsed: {
    display: 'none',
  },

  // size variants
  medium: {
    minHeight: '32px',
  },
  large: {
    minHeight: '40px',
  },
  'extra-large': {
    minHeight: '44px',
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--ctrl-token-TagPickerControl-2235, var(--semantic-token-TagPickerControl-2236, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-TagPickerControl-2237, var(--semantic-token-TagPickerControl-2238, ${tokens.colorNeutralStrokeAccessible}))`,
  },

  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-TagPickerControl-2239, var(--semantic-token-TagPickerControl-2240, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-TagPickerControl-2241, var(--semantic-token-TagPickerControl-2242, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-TagPickerControl-2243, var(--semantic-token-TagPickerControl-2244, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-TagPickerControl-2245, var(--semantic-token-TagPickerControl-2246, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-TagPickerControl-2247, var(--semantic-token-TagPickerControl-2248, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--ctrl-token-TagPickerControl-2249, var(--semantic-token-TagPickerControl-2250, ${tokens.colorPaletteRedBorder2}))`,
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-TagPickerControl-2251, var(--semantic-token-TagPickerControl-2252, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
});

const useAsideStyles = makeStyles({
  root: {
    display: 'grid',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: `var(--ctrl-token-TagPickerControl-2253, var(--semantic-token-TagPickerControl-2254, ${tokens.spacingHorizontalM}))`,
    gridTemplateColumns: 'repeat(2, auto)',
    gridTemplateRows: 'minmax(32px, auto) 1fr',
    height: '100%',
    cursor: 'text',
  },
  // size variants
  medium: {
    minHeight: '32px',
  },
  large: {
    minHeight: '40px',
  },
  'extra-large': {
    minHeight: '44px',
  },
});

export const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: `var(--ctrl-token-TagPickerControl-2255, var(--semantic-token-TagPickerControl-2256, ${tokens.colorNeutralStrokeAccessible}))`,
    cursor: 'pointer',
    display: 'block',
    fontSize: `var(--ctrl-token-TagPickerControl-2257, var(--semantic-token-TagPickerControl-2258, ${tokens.fontSizeBase500}))`,
    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  // icon size variants
  medium: {
    fontSize: iconSizes.small,
    marginLeft: `var(--ctrl-token-TagPickerControl-2259, var(--semantic-token-TagPickerControl-2260, ${tokens.spacingHorizontalXXS}))`,
  },
  large: {
    fontSize: iconSizes.medium,
    marginLeft: `var(--ctrl-token-TagPickerControl-2261, var(--semantic-token-TagPickerControl-2262, ${tokens.spacingHorizontalXXS}))`,
  },
  'extra-large': {
    fontSize: iconSizes.large,
    marginLeft: `var(--ctrl-token-TagPickerControl-2263, var(--semantic-token-TagPickerControl-2264, ${tokens.spacingHorizontalSNudge}))`,
  },
  disabled: {
    color: `var(--ctrl-token-TagPickerControl-2265, var(--semantic-token-TagPickerControl-2266, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
  },
});

/**
 * Apply styling to the PickerControl slots based on the state
 */
export const useTagPickerControlStyles_unstable = (state: TagPickerControlState): TagPickerControlState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const asideStyles = useAsideStyles();
  state.root.className = mergeClasses(
    tagPickerControlClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    !state.disabled && state.appearance === 'outline' && styles.outlineInteractive,
    state.invalid && state.appearance !== 'underline' && styles.invalid,
    state.invalid && state.appearance === 'underline' && styles.invalidUnderline,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.aside) {
    state.aside.className = mergeClasses(
      tagPickerControlClassNames.aside,
      asideStyles.root,
      asideStyles[state.size],
      state.aside.className,
    );
  }

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      tagPickerControlClassNames.expandIcon,
      iconStyles.icon,
      iconStyles[state.size],
      state.disabled && iconStyles.disabled,
      state.expandIcon.className,
    );
  }

  if (state.secondaryAction) {
    state.secondaryAction.className = mergeClasses(
      tagPickerControlClassNames.secondaryAction,
      state.secondaryAction.className,
    );
  }

  return state;
};
