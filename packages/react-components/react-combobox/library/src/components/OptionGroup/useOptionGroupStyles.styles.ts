import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionGroupSlots, OptionGroupState } from './OptionGroup.types';

export const optionGroupClassNames: SlotClassNames<OptionGroupSlots> = {
  root: 'fui-OptionGroup',
  label: 'fui-OptionGroup__label',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: `var(--ctrl-token-OptionGroup-1035, var(--semantic-token-OptionGroup-1036, ${tokens.spacingHorizontalXXS}))`,

    '&:not(:last-child)::after': {
      content: '""',
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
      display: 'block',
      paddingBottom: `var(--ctrl-token-OptionGroup-1037, var(--semantic-token-OptionGroup-1038, ${tokens.spacingHorizontalXS}))`,
      margin: `0 ${`calc(${tokens.spacingHorizontalXS} * -1)`} ${tokens.spacingVerticalXS}`,
    },
  },

  label: {
    borderRadius: `var(--ctrl-token-OptionGroup-1039, var(--semantic-token-OptionGroup-1040, ${tokens.borderRadiusMedium}))`,
    color: `var(--ctrl-token-OptionGroup-1041, var(--semantic-token-OptionGroup-1042, ${tokens.colorNeutralForeground3}))`,
    display: 'block',
    fontSize: `var(--ctrl-token-OptionGroup-1043, var(--semantic-token-OptionGroup-1044, ${tokens.fontSizeBase200}))`,
    fontWeight: `var(--ctrl-token-OptionGroup-1045, var(--semantic-token-OptionGroup-1046, ${tokens.fontWeightSemibold}))`,
    lineHeight: `var(--ctrl-token-OptionGroup-1047, var(--semantic-token-OptionGroup-1048, ${tokens.lineHeightBase200}))`,
    padding: `${tokens.spacingHorizontalS} ${tokens.spacingHorizontalSNudge}`,
  },
});

/**
 * Apply styling to the OptionGroup slots based on the state
 */
export const useOptionGroupStyles_unstable = (state: OptionGroupState): OptionGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(optionGroupClassNames.root, styles.root, state.root.className);

  if (state.label) {
    state.label.className = mergeClasses(optionGroupClassNames.label, styles.label, state.label.className);
  }

  return state;
};
