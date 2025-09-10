/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';
import { RadioGroupContextValues, RadioGroupSlots, RadioGroupState } from './RadioGroup.types';

/**
 * Render the final JSX of RadioGroup
 */
export const renderRadioGroup_unstable = (
  state: RadioGroupState,
  contextValues: RadioGroupContextValues,
): JSXElement => {
  assertSlots<RadioGroupSlots>(state);

  return (
    <RadioGroupContext.Provider value={contextValues.radioGroup}>
      <state.root />
    </RadioGroupContext.Provider>
  );
};
