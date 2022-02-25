import { makeStyles, mergeClasses } from '@griffel/react';
import { RadioGroupState } from './RadioGroup.types';

export const radioGroupClassName = 'fui-RadioGroup';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  horizontal: {
    flexDirection: 'row',
  },
});

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    radioGroupClassName,
    styles.root,
    state.layout !== 'vertical' && styles.horizontal,
    state.root.className,
  );
};
