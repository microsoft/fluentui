'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { LabelSlots, LabelState } from './Label.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
  icon: 'fui-Label__icon',
};

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: {
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  required: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: tokens.spacingHorizontalXS,
  },

  withIcon: {
    display: 'inline-flex',
    alignItems: 'center',
  },

  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },

  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },

  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
  },

  semibold: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

/**
 * Styles for the icon slot
 */
const useIconStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    marginRight: tokens.spacingHorizontalXS,
  },

  small: {
    fontSize: tokens.fontSizeBase200,
    height: tokens.fontSizeBase500,
    width: tokens.fontSizeBase500,
  },

  smallSemibold: {
    height: tokens.fontSizeBase400,
    width: tokens.fontSizeBase400,
  },

  medium: {
    fontSize: tokens.fontSizeBase400,
    height: tokens.fontSizeBase500,
    width: tokens.fontSizeBase500,
  },

  large: {
    fontSize: tokens.fontSizeBase500,
    height: tokens.fontSizeBase600,
    width: tokens.fontSizeBase600,
    borderRadius: tokens.borderRadiusLarge,
    marginRight: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    labelClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.weight === 'semibold' && styles.semibold,
    state.icon && styles.withIcon,
    state.root.className,
  );

  if (state.required) {
    // eslint-disable-next-line react-hooks/immutability
    state.required.className = mergeClasses(
      labelClassNames.required,
      styles.required,
      state.disabled && styles.disabled,
      state.required.className,
    );
  }

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(
      labelClassNames.icon,
      iconStyles.base,
      iconStyles[state.size],
      state.size === 'small' && state.weight === 'semibold' && iconStyles.smallSemibold,
      state.icon.className,
    );
  }

  return state;
};
