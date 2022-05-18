import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { horizontalSpacing } from '../../utils/internalTokens';
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
    rowGap: horizontalSpacing.xxs,

    '&:not(:last-child)::after': {
      content: '""',
      ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
      display: 'block',
      paddingBottom: horizontalSpacing.xs,
      marginBottom: horizontalSpacing.xs,
    },
  },

  label: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    color: tokens.colorNeutralForeground3,
    display: 'block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding(horizontalSpacing.s, horizontalSpacing.sNudge),
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
