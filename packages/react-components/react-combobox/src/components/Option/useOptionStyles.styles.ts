import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
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
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXS,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalS),
    position: 'relative',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForeground1Hover),
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForeground1Pressed,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForeground1Hover),
    },
  },

  active: {
    // taken from @fluentui/react-tabster
    // cannot use createFocusIndicatorStyle() directly, since we aren't using the :focus selector
    '::after': {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,

      ...shorthands.borderStyle('solid'),
      ...shorthands.borderWidth('2px'),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.borderColor(tokens.colorStrokeFocus2),

      top: '-2px',
      bottom: '-2px',
      left: '-2px',
      right: '-2px',
    },
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorNeutralForegroundDisabled,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    ':active': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorNeutralForegroundDisabled,
      [`& .${optionClassNames.checkIcon}`]: shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  selected: {},

  checkIcon: {
    fontSize: tokens.fontSizeBase400,
    // Shift icon(s) to the left to give text content extra spacing without needing an extra node
    // This is done instead of gap since the extra space only exists between icon > content, not icon > icon
    marginLeft: `calc(${tokens.spacingHorizontalXXS} * -1)`,
    marginRight: tokens.spacingHorizontalXXS,
    visibility: 'hidden',

    '& svg': {
      display: 'block',
    },
  },

  selectedCheck: {
    visibility: 'visible',
  },

  multiselectCheck: {
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeAccessible),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
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
    backgroundColor: tokens.colorCompoundBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
  },

  checkDisabled: {
    color: tokens.colorNeutralForegroundDisabled,

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
  const { active, disabled, focusVisible, multiselect, selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    optionClassNames.root,
    styles.root,
    active && focusVisible && styles.active,
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
