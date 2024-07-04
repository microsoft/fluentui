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
    backgroundColor: `var(--ctrl-token-TagPickerButton-2181, var(--semantic-token-TagPickerButton-2182, ${tokens.colorTransparentBackground}))`,
    border: 'none',
    boxSizing: 'border-box',
    color: `var(--ctrl-token-TagPickerButton-2183, var(--semantic-token-TagPickerButton-2184, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--ctrl-token-TagPickerButton-2185, var(--semantic-token-TagPickerButton-2186, ${tokens.spacingHorizontalXXS}))`,
    cursor: 'pointer',
    fontFamily: `var(--ctrl-token-TagPickerButton-2187, var(--semantic-token-TagPickerButton-2188, ${tokens.fontFamilyBase}))`,
    textAlign: 'left',
    flexGrow: 1,

    '&:focus': {
      outlineStyle: 'none',
    },
  },

  placeholder: {
    color: `var(--ctrl-token-TagPickerButton-2189, var(--semantic-token-TagPickerButton-2190, ${tokens.colorNeutralForeground4}))`,
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
    columnGap: `var(--ctrl-token-TagPickerButton-2191, var(--semantic-token-TagPickerButton-2192, ${tokens.spacingHorizontalSNudge}))`,
    ...typographyStyles.body2,
    padding: `7px ${
      tokens.spacingHorizontalM
    } 7px ${`calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`}`,
  },

  // appearance variants
  outline: {
    backgroundColor: `var(--ctrl-token-TagPickerButton-2193, var(--semantic-token-TagPickerButton-2194, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-TagPickerButton-2195, var(--semantic-token-TagPickerButton-2196, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-TagPickerButton-2197, var(--semantic-token-TagPickerButton-2198, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-TagPickerButton-2199, var(--semantic-token-TagPickerButton-2200, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-TagPickerButton-2201, var(--semantic-token-TagPickerButton-2202, ${tokens.colorTransparentBackground}))`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-TagPickerButton-2203, var(--semantic-token-TagPickerButton-2204, ${tokens.colorNeutralBackground1}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-TagPickerButton-2205, var(--semantic-token-TagPickerButton-2206, ${tokens.colorNeutralBackground3}))`,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--ctrl-token-TagPickerButton-2207, var(--semantic-token-TagPickerButton-2208, ${tokens.colorPaletteRedBorder2}))`,
    },
  },
  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-TagPickerButton-2209, var(--semantic-token-TagPickerButton-2210, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  disabledText: {
    color: `var(--ctrl-token-TagPickerButton-2211, var(--semantic-token-TagPickerButton-2212, ${tokens.colorNeutralForegroundDisabled}))`,
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
