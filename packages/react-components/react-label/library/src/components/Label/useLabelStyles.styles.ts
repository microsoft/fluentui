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
    fontFamily: `var(--ctrl-token-Label-1239, var(--semantic-token-Label-1240, ${tokens.fontFamilyBase}))`,
    color: `var(--ctrl-token-Label-1241, var(--semantic-token-Label-1242, ${tokens.colorNeutralForeground1}))`,
  },

  disabled: {
    color: `var(--ctrl-token-Label-1243, var(--semantic-token-Label-1244, ${tokens.colorNeutralForegroundDisabled}))`,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  required: {
    color: `var(--ctrl-token-Label-1245, var(--semantic-token-Label-1246, ${tokens.colorPaletteRedForeground3}))`,
    paddingLeft: `var(--ctrl-token-Label-1247, var(--semantic-token-Label-1248, ${tokens.spacingHorizontalXS}))`,
  },

  small: {
    fontSize: `var(--ctrl-token-Label-1249, var(--semantic-token-Label-1250, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--ctrl-token-Label-1251, var(--semantic-token-Label-1252, ${tokens.lineHeightBase200}))`,
  },

  medium: {
    fontSize: `var(--ctrl-token-Label-1253, var(--semantic-token-Label-1254, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-Label-1255, var(--semantic-token-Label-1256, ${tokens.lineHeightBase300}))`,
  },

  large: {
    fontSize: `var(--ctrl-token-Label-1257, var(--semantic-token-Label-1258, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--ctrl-token-Label-1259, var(--semantic-token-Label-1260, ${tokens.lineHeightBase400}))`,
    fontWeight: `var(--ctrl-token-Label-1261, var(--semantic-token-Label-1262, ${tokens.fontWeightSemibold}))`,
  },

  semibold: {
    fontWeight: `var(--ctrl-token-Label-1263, var(--semantic-token-Label-1264, ${tokens.fontWeightSemibold}))`,
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
