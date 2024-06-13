import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from '@fluentui/react-aria';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { OptionSlots, OptionState } from './Option.types';

export const optionClassNames: SlotClassNames<OptionSlots> = {
  root: 'fui-Option',
  checkIcon: 'fui-Option__checkIcon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    borderRadius: `var(--ctrl-token-Option-991, var(--semantic-token-Option-992, ${tokens.borderRadiusMedium}))`,
    color: `var(--ctrl-token-Option-993, var(--semantic-token-Option-994, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--ctrl-token-Option-995, var(--semantic-token-Option-996, ${tokens.spacingHorizontalXS}))`,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: `var(--ctrl-token-Option-997, var(--semantic-token-Option-998, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--ctrl-token-Option-999, var(--semantic-token-Option-1000, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-Option-1001, var(--semantic-token-Option-1002, ${tokens.lineHeightBase300}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS}`,
    position: 'relative',

    ':hover': {
      backgroundColor: `var(--ctrl-token-Option-1003, var(--semantic-token-Option-1004, ${tokens.colorNeutralBackground1Hover}))`,
      color: `var(--ctrl-token-Option-1005, var(--semantic-token-Option-1006, ${tokens.colorNeutralForeground1Hover}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForeground1Hover),
    },

    ':active': {
      backgroundColor: `var(--ctrl-token-Option-1007, var(--semantic-token-Option-1008, ${tokens.colorNeutralBackground1Pressed}))`,
      color: `var(--ctrl-token-Option-1009, var(--semantic-token-Option-1010, ${tokens.colorNeutralForeground1Pressed}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForeground1Hover),
    },
  },

  active: {
    [`[${ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE}]::after`]: {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,

      border: `2px solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-Option-1011, var(--semantic-token-Option-1012, ${tokens.borderRadiusMedium}))`,

      top: '-2px',
      bottom: '-2px',
      left: '-2px',
      right: '-2px',
    },
  },

  disabled: {
    color: `var(--ctrl-token-Option-1013, var(--semantic-token-Option-1014, ${tokens.colorNeutralForegroundDisabled}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-Option-1015, var(--semantic-token-Option-1016, ${tokens.colorTransparentBackground}))`,
      color: `var(--ctrl-token-Option-1017, var(--semantic-token-Option-1018, ${tokens.colorNeutralForegroundDisabled}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    ':active': {
      backgroundColor: `var(--ctrl-token-Option-1019, var(--semantic-token-Option-1020, ${tokens.colorTransparentBackground}))`,
      color: `var(--ctrl-token-Option-1021, var(--semantic-token-Option-1022, ${tokens.colorNeutralForegroundDisabled}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  selected: {},

  checkIcon: {
    fontSize: `var(--ctrl-token-Option-1023, var(--semantic-token-Option-1024, ${tokens.fontSizeBase400}))`,
    // Shift icon(s) to the left to give text content extra spacing without needing an extra node
    // This is done instead of gap since the extra space only exists between icon > content, not icon > icon
    marginLeft: `calc(${tokens.spacingHorizontalXXS} * -1)`,
    marginRight: `var(--ctrl-token-Option-1025, var(--semantic-token-Option-1026, ${tokens.spacingHorizontalXXS}))`,
    visibility: 'hidden',

    '& svg': {
      display: 'block',
    },
  },

  selectedCheck: {
    visibility: 'visible',
  },

  multiselectCheck: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: `var(--ctrl-token-Option-1027, var(--semantic-token-Option-1028, ${tokens.borderRadiusSmall}))`,
    boxSizing: 'border-box',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fill: 'currentColor',
    fontSize: '12px',
    height: '16px',
    width: '16px',
    visibility: 'visible',
  },

  selectedMultiselectCheck: {
    backgroundColor: `var(--ctrl-token-Option-1029, var(--semantic-token-Option-1030, ${tokens.colorCompoundBrandBackground}))`,
    color: `var(--ctrl-token-Option-1031, var(--semantic-token-Option-1032, ${tokens.colorNeutralForegroundInverted}))`,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
  },

  checkDisabled: {
    color: `var(--ctrl-token-Option-1033, var(--semantic-token-Option-1034, ${tokens.colorNeutralForegroundDisabled}))`,

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
  multiselectCheckDisabled: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
});

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles_unstable = (state: OptionState): OptionState => {
  const { disabled, multiselect, selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    optionClassNames.root,
    styles.root,
    styles.active,
    disabled && styles.disabled,
    selected && styles.selected,
    state.root.className,
  );

  if (state.checkIcon) {
    state.checkIcon.className = mergeClasses(
      optionClassNames.checkIcon,
      styles.checkIcon,
      multiselect && styles.multiselectCheck,
      selected && styles.selectedCheck,
      selected && multiselect && styles.selectedMultiselectCheck,
      disabled && styles.checkDisabled,
      disabled && multiselect && styles.multiselectCheckDisabled,
      state.checkIcon.className,
    );
  }

  return state;
};
