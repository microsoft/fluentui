'use client';

import { useTooltip as useTooltipBase } from '@fluentui/react-headless-components-preview/tooltip';
import type { TooltipProps, TooltipState } from './Tooltip.types';

/**
 * Create the state required to render Tooltip.
 */
export const useTooltip = (props: TooltipProps): TooltipState => {
  const { appearance = 'normal', ...rest } = props;
  const state = useTooltipBase(rest);

  return {
    ...state,
    content: {
      ...state.content,
      'data-appearance': appearance,
    },
    appearance,
  };
};
