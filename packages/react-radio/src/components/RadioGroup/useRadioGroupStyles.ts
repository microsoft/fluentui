import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { RadioGroupState } from './RadioGroup.types';

export const radioGroupClassName = 'fui-RadioGroup';
const labelClassName = 'fui-RadioGroup__label';

const useStyles = makeStyles({
  root: {
    ...shorthands.border(0),
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    display: 'flex',
    flexDirection: 'column',

    [`:disabled > .${labelClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  label: {
    ...shorthands.padding(0),
    flexBasis: '100%',
  },
});

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState): RadioGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    radioGroupClassName,
    styles.root,
    state.layout !== 'vertical' && styles.horizontal,
    state.root.className,
  );

  if (state.label) {
    state.label.className = mergeClasses(labelClassName, styles.label, state.label.className);
  }

  return state;
};
