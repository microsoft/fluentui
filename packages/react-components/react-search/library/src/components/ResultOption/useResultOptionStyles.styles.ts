'use client';

import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from '@fluentui/react-aria';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { ResultOptionSlots, ResultOptionState } from './ResultOption.types';

export const resultOptionClassNames: SlotClassNames<ResultOptionSlots> = {
  root: 'fui-ResultOption',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    columnGap: tokens.spacingHorizontalXS,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS}`,
    position: 'relative',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },

  active: {
    [`[${ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE}]::after`]: {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,

      border: `2px solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,

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
    },

    ':active': {
      backgroundColor: tokens.colorTransparentBackground,
      color: tokens.colorNeutralForegroundDisabled,
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  selected: {},
});

export const useResultOptionStyles_unstable = (state: ResultOptionState): ResultOptionState => {
  'use no memo';

  const { disabled, selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    resultOptionClassNames.root,
    styles.root,
    styles.active,
    disabled && styles.disabled,
    selected && styles.selected,
    state.root.className,
  );

  return state;
};
