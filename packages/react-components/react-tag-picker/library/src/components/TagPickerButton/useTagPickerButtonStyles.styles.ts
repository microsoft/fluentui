import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';

export const tagPickerButtonClassNames: SlotClassNames<TagPickerButtonSlots> = {
  root: 'fui-TagPickerButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  button: {
    alignItems: 'center',
    minHeight: '32px',
    backgroundColor: `var(--2181, var(--2182, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    boxSizing: 'border-box',
    color: `var(--2183, var(--2184, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--2185, var(--2186, ${tokens.spacingHorizontalXXS}))`,
    cursor: 'pointer',
    fontFamily: `var(--2187, var(--2188, ${tokens.fontFamilyBase}))`,
    textAlign: 'left',
    flexGrow: 1,

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: `var(--2189, var(--2190, ${tokens.colorNeutralForeground4}))`,
  },

  // size variants
  medium: {
    ...typographyStyles.caption1,
    padding: `3px ${
      tokens.spacingHorizontalSNudge
    } 3px ${`calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  large: {
    ...typographyStyles.body1,
    padding: `5px ${
      tokens.spacingHorizontalMNudge
    } 5px ${`calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`}`,
  },
  'extra-large': {
    columnGap: `var(--2191, var(--2192, ${tokens.spacingHorizontalSNudge}))`,
    ...typographyStyles.body2,
    padding: `7px ${
      tokens.spacingHorizontalM
    } 7px ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--2193, var(--2194, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--2195, var(--2196, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--2197, var(--2198, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--2199, var(--2200, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--2201, var(--2202, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--2203, var(--2204, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  'filled-darker': {
    backgroundColor: `var(--2205, var(--2206, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--2207, var(--2208, ${tokens.colorPaletteRedBorder2}))`,
    },
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2209, var(--2210, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  disabledText: {
    color: `var(--2211, var(--2212, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
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
});

/**
 * Apply styling to the PickerButton slots based on the state
 */
export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerButtonClassNames.root,
    styles.button,
    styles[state.size],
    state.hasSelectedOption && styles.visuallyHidden,
    state.root.className,
  );

  return state;
};
