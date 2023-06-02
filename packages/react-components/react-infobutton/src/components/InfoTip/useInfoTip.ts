import * as React from 'react';
import { getNativeElementProps, mergeCallbacks, resolveShorthand } from '@fluentui/react-utilities';
import { infoIconMap } from '../utils/InfoIcon';
import { Tooltip, TooltipProps } from '@fluentui/react-tooltip';
import type { InfoTipProps, InfoTipState } from './InfoTip.types';

/**
 * Create the state required to render InfoTip.
 *
 * The returned state can be modified with hooks such as useInfoTipStyles_unstable,
 * before being passed to renderInfoTip_unstable.
 *
 * @param props - props from this instance of InfoTip
 * @param ref - reference to root HTMLElement of InfoTip
 */
export const useInfoTip_unstable = (props: InfoTipProps, ref: React.Ref<HTMLElement>): InfoTipState => {
  const { size = 'medium', info } = props;
  const [open, setOpen] = React.useState(false);

  const tooltip = resolveShorthand(props.tooltip, {
    required: true,
    defaultProps: {
      content: info,
      positioning: 'above-start',
      relationship: 'description',
      withArrow: true,
    },
  });

  tooltip.onVisibleChange = mergeCallbacks(tooltip.onVisibleChange, (e, data) => {
    setOpen(data.visible);
  });

  return {
    open,
    size,

    components: {
      root: 'span',
      tooltip: Tooltip as React.FC<Partial<TooltipProps>>,
    },

    root: getNativeElementProps('span', {
      'aria-label': 'information',
      children: infoIconMap[size],
      role: 'image',
      tabIndex: 0,
      ...props,
      ref,
    }),
    tooltip,
  };
};
