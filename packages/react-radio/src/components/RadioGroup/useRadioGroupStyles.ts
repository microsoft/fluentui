import { makeStyles, mergeClasses } from '@griffel/react';
import { RadioGroupSlots, RadioGroupState } from './RadioGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `radioGroupClassNames.root` instead.
 */
export const radioGroupClassName = 'fui-RadioGroup';
export const radioGroupClassNames: SlotClassNames<RadioGroupSlots> = {
  root: 'fui-RadioGroup',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    radioGroupClassNames.root,
    styles.root,
    state.layout === 'vertical' && styles.vertical,
    state.root.className,
  );
};
