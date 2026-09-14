'use client';

import { useRadioGroupContextValues as useRadioGroupContextValues_unstable } from '@fluentui/react-radio';
import type { RadioGroupContextValues, RadioGroupState } from './RadioGroup.types';

export const useRadioGroupContextValues = useRadioGroupContextValues_unstable as (
  state: RadioGroupState,
) => RadioGroupContextValues;
