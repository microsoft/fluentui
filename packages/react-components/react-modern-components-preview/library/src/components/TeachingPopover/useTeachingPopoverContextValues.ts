'use client';

import { useTeachingPopoverContextValues as useTeachingPopoverContextValuesBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

export const useTeachingPopoverContextValues = (state: TeachingPopoverState): TeachingPopoverContextValues => {
  const contextValues = useTeachingPopoverContextValuesBase(state);
  return {
    ...contextValues,
    basePopover: {
      ...contextValues.basePopover,
      appearance: state.appearance,
      size: state.size,
    },
  };
};
