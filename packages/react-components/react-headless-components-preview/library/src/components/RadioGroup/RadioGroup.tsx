'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioGroupProps } from './RadioGroup.types';

import { useRadioGroup } from './useRadioGroup';
import { renderRadioGroup } from './renderRadioGroup';
import { useRadioGroupContextValues } from './useRadioGroupContextValues';

/**
 * A radio group component for selecting one option.
 */
export const RadioGroup: ForwardRefComponent<RadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useRadioGroup(props, ref);
  const contextValues = useRadioGroupContextValues(state);

  return renderRadioGroup(state, contextValues);
});

RadioGroup.displayName = 'RadioGroup';
