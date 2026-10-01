'use client';

import type * as React from 'react';
import { useRadioGroup as useRadioGroupBase } from '@fluentui/react-headless-components-preview/radio-group';
import type { RadioGroupProps, RadioGroupState } from './RadioGroup.types';

export const useRadioGroup = (props: RadioGroupProps, ref: React.Ref<HTMLDivElement>): RadioGroupState => {
  const { layout = 'vertical', ...rest } = props;
  const state = useRadioGroupBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-layout': layout,
    },
    layout,
  };
};
