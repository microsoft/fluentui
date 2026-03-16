'use client';

import type { TooltipProps, TooltipState } from './Tooltip.types';
import { useTooltipBase_unstable } from './useTooltipBase';

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles_unstable,
 * before being passed to renderTooltip_unstable.
 *
 * @param props - props from this instance of Tooltip
 */
export const useTooltip_unstable = (props: TooltipProps): TooltipState => {
  'use no memo';

  const { appearance = 'normal' } = props;

  const state = useTooltipBase_unstable(props);

  return {
    appearance,
    ...state,
  };
};
