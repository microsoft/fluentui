import * as React from 'react';
import { useRadioGroup_unstable } from './useRadioGroup';
import { RadioGroupProps } from './RadioGroup.types';
import { renderRadioGroup_unstable } from './renderRadioGroup';
import { useRadioGroupStyles_unstable } from './useRadioGroupStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A RadioGroup component presents a set of options where only one option can be selected.
 */
export const RadioGroup: ForwardRefComponent<RadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useRadioGroup_unstable(props, ref);

  useRadioGroupStyles_unstable(state);
  return renderRadioGroup_unstable(state);
});

RadioGroup.displayName = 'RadioGroup';
