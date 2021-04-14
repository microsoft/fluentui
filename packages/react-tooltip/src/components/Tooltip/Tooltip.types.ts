import * as React from 'react';
import { ComponentState } from '@fluentui/react-utilities';
import { TooltipProps } from '../../common/types';

export { TooltipProps };

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export type TooltipShorthandProps = 'arrow';

/**
 * Names of TooltipProps that have a default value in useTooltip
 * {@docCategory Tooltip}
 */
export type TooltipDefaultedProps = 'position' | 'align' | 'offset';

/**
 * {@docCategory Tooltip}
 */
export type TooltipState = ComponentState<
  React.Ref<HTMLElement>,
  TooltipProps & {
    visible: boolean;
  },
  TooltipShorthandProps,
  TooltipDefaultedProps
>;
