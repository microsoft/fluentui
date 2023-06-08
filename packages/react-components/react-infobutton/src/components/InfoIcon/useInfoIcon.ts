import * as React from 'react';
import { getNativeElementProps, mergeCallbacks, resolveShorthand } from '@fluentui/react-utilities';
import { Tooltip } from '@fluentui/react-tooltip';
import { infoIconMap } from '../utils/infoIconMap';
import type { InfoIconProps, InfoIconState } from './InfoIcon.types';
import type { TooltipProps } from '@fluentui/react-tooltip';

/**
 * Create the state required to render InfoIcon.
 *
 * The returned state can be modified with hooks such as useInfoIconStyles_unstable,
 * before being passed to renderInfoIcon_unstable.
 *
 * @param props - props from this instance of InfoIcon
 * @param ref - reference to root HTMLElement of InfoIcon
 */
export const useInfoIcon_unstable = (props: InfoIconProps, ref: React.Ref<HTMLElement>): InfoIconState => {
  const { size = 'medium', info } = props;
  const [open, setOpen] = React.useState(false);

  const tooltip = resolveShorthand(props.tooltip, {
    required: true,
    defaultProps: {
      content: info,
      positioning: 'above-start',
      relationship: 'label',
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
      children: infoIconMap[size],
      role: 'img',
      tabIndex: 0,
      ...props,
      ref,
    }),
    tooltip,
  };
};
