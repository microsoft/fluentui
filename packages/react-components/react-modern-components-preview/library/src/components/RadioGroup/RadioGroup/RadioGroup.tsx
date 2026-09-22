'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioGroupProps } from './RadioGroup.types';
import { renderRadioGroup } from './renderRadioGroup';
import { useRadioGroup } from './useRadioGroup';
import { useRadioGroupContextValues } from './useRadioGroupContextValues';
import { useRadioGroupStyles } from './useRadioGroupStyles.styles';

export const RadioGroup: ForwardRefComponent<RadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useRadioGroup(props, ref);
  const contextValues = useRadioGroupContextValues(state);

  useRadioGroupStyles(state);

  return renderRadioGroup(state, contextValues);
});

RadioGroup.displayName = 'RadioGroup';
