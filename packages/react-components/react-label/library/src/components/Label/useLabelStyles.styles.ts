import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { LabelSlots, LabelState } from './Label.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: {
    fontFamily: `var(--1239, var(--1240, ${tokens.fontFamilyBase}))`,
    color: `var(--1241, var(--1242, ${tokens.colorNeutralForeground1}))`,
  },

  disabled: {
    color: `var(--1243, var(--1244, ${tokens.colorNeutralForegroundDisabled}))`,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  required: {
    color: `var(--1245, var(--1246, ${tokens.colorPaletteRedForeground3}))`,
    paddingLeft: `var(--1247, var(--1248, ${tokens.spacingHorizontalXS}))`,
  },

  small: {
    fontSize: `var(--1249, var(--1250, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--1251, var(--1252, ${tokens.lineHeightBase200}))`,
  },

  medium: {
    fontSize: `var(--1253, var(--1254, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--1255, var(--1256, ${tokens.lineHeightBase300}))`,
  },

  large: {
    fontSize: `var(--1257, var(--1258, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--1259, var(--1260, ${tokens.lineHeightBase400}))`,
    fontWeight: `var(--1261, var(--1262, ${tokens.fontWeightSemibold}))`,
  },

  semibold: {
    fontWeight: `var(--1263, var(--1264, ${tokens.fontWeightSemibold}))`,
  },
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    labelClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.weight === 'semibold' && styles.semibold,
    state.root.className,
  );

  if (state.required) {
    state.required.className = mergeClasses(
      labelClassNames.required,
      styles.required,
      state.disabled && styles.disabled,
      state.required.className,
    );
  }

  return state;
};
