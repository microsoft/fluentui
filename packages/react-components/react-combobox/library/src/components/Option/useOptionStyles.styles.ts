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
    borderRadius: `var(--991, var(--992, ${tokens.borderRadiusMedium}))`,
    color: `var(--993, var(--994, ${tokens.colorNeutralForeground1}))`,
    columnGap: `var(--995, var(--996, ${tokens.spacingHorizontalXS}))`,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: `var(--997, var(--998, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--999, var(--1000, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--1001, var(--1002, ${tokens.lineHeightBase300}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS}`,
    position: 'relative',

    ':hover': {
      backgroundColor: `var(--1003, var(--1004, ${tokens.colorNeutralBackground1Hover}))`,
      color: `var(--1005, var(--1006, ${tokens.colorNeutralForeground1Hover}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForeground1Hover),
    },

    ':active': {
      backgroundColor: `var(--1007, var(--1008, ${tokens.colorNeutralBackground1Pressed}))`,
      color: `var(--1009, var(--1010, ${tokens.colorNeutralForeground1Pressed}))`,
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
      borderRadius: `var(--1011, var(--1012, ${tokens.borderRadiusMedium}))`,

      top: '-2px',
      bottom: '-2px',
      left: '-2px',
      right: '-2px',
    },
  },

  disabled: {
    color: `var(--1013, var(--1014, ${tokens.colorNeutralForegroundDisabled}))`,

    ':hover': {
      backgroundColor: `var(--1015, var(--1016, ${tokens.colorTransparentBackground}))`,
      color: `var(--1017, var(--1018, ${tokens.colorNeutralForegroundDisabled}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    ':active': {
      backgroundColor: `var(--1019, var(--1020, ${tokens.colorTransparentBackground}))`,
      color: `var(--1021, var(--1022, ${tokens.colorNeutralForegroundDisabled}))`,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  selected: {},

  checkIcon: {
<<<<<<< HEAD
    flexShrink: 0,
    fontSize: `var(--ctrl-token-Option-1023, var(--semantic-token-Option-1024, ${tokens.fontSizeBase400}))`,
=======
    fontSize: `var(--1023, var(--1024, ${tokens.fontSizeBase400}))`,
>>>>>>> e5ce9d17b5 (fix:react-nav-preview: High contrast issues (#31704))
    // Shift icon(s) to the left to give text content extra spacing without needing an extra node
    // This is done instead of gap since the extra space only exists between icon > content, not icon > icon
    marginLeft: `calc(${tokens.spacingHorizontalXXS} * -1)`,
    marginRight: `var(--1025, var(--1026, ${tokens.spacingHorizontalXXS}))`,
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
    borderRadius: `var(--1027, var(--1028, ${tokens.borderRadiusSmall}))`,
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
    backgroundColor: `var(--1029, var(--1030, ${tokens.colorCompoundBrandBackground}))`,
    color: `var(--1031, var(--1032, ${tokens.colorNeutralForegroundInverted}))`,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
  },

  checkDisabled: {
    color: `var(--1033, var(--1034, ${tokens.colorNeutralForegroundDisabled}))`,

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
  'use no memo';

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
