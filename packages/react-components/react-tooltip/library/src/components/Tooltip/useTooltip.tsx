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
  'use no memo'; // justified: compiler would optimize useTooltip_unstable — manual opt-out to preserve runtime behavior

  const { appearance = 'normal', ...baseProps } = props;

  const state = useTooltipBase_unstable(baseProps);

  return {
    appearance,
    ...state,
  };
};
