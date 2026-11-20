'use client';

import type * as React from 'react';
import { useRadioGroupBase_unstable } from '@fluentui/react-radio';
import type { RadioGroupProps, RadioGroupState } from './RadioGroup.types';
import { toDataAttributeValue } from '../../utils';

export const useRadioGroup = (props: RadioGroupProps, ref: React.Ref<HTMLDivElement>): RadioGroupState => {
  const state = useRadioGroupBase_unstable(props, ref);
  return {
    ...state,
    root: {
      ...state.root,
      'data-disabled': toDataAttributeValue(state.disabled),
    },
  };
};
