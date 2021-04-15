import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { TooltipManager } from '@fluentui/react-tooltip-trigger';

/**
 * {@docCategory TooltipProvider}
 */
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

/**
 * {@docCategory TooltipProvider}
 */
export type TooltipProviderState = ComponentState<
  React.RefObject<HTMLElement>,
  TooltipProviderProps & {
    tooltipManager: TooltipManager;
    tooltipContainer: HTMLElement | undefined;
  }
>;
