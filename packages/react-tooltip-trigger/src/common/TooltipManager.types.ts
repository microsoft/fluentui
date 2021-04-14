import { TooltipImperativeHandle } from './TooltipProps.types';

/**
 * The tooltip manager is responsible for managing the visibiltiy of the tooltips,
 * including ensuring that only one tooltip is visible at once, and handling the
 * delay to show or hide a tooltip.
 *
 * This imperative interface is used by TooltipTrigger to show and hide its tooltip
 * based on events on the trigger element.
 *
 * {@docCategory TooltipProvider}
 */
export interface TooltipManager {
  showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => void;
  hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => void;

  hideAll: () => void;

  onPointerEnterTooltip: (tooltipRoot: HTMLElement) => void;
  onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => void;
}

/**
 * The arguments to TooltipManager.showTooltip
 *
 * {@docCategory TooltipProvider}
 */
export type ShowTooltipArgs = {
  tooltip: TooltipImperativeHandle;
  trigger: HTMLElement;
  target?: HTMLElement | null;
  showDelay?: number;
  hideDelay?: number;
  onlyIfTruncated?: boolean;
};

/**
 * The source of the event that caused the tooltip to be shown or hidden
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipTriggerReason = 'focus' | 'pointer';
