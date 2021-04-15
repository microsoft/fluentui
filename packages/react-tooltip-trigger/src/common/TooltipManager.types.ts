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
  /**
   * Show the given tooltip.
   * Call this in response to a PointerEnter or Focus event on the trigger.
   *
   * @param args - {@see ShowTooltipArgs}
   * @param reason - Whether this was triggered by PointerEnter ('pointer') or Focus ('focus')
   */
  showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => void;

  /**
   * Hide the tooltip triggered by the given element.
   * Call this in response to a PointerLeave or Blur event on the trigger.
   *
   * @param trigger - The element that lost focus
   * @param reason - Whether this was triggered by PointerLeave ('pointer') or Blur ('focus')
   */
  hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => void;

  /**
   * Unconditionally hide any tooltip that's currently visible, without a delay.
   */
  hideAll: () => void;

  /**
   * Notify the manager that the pointer is inside the tooltip.
   */
  onPointerEnterTooltip: () => void;

  /**
   * Notify the manager that the pointer left the tooltip.
   */
  onPointerLeaveTooltip: () => void;
}

/**
 * The arguments to TooltipManager.showTooltip
 *
 * {@docCategory TooltipProvider}
 */
export type ShowTooltipArgs = {
  /**
   * The tooltip to show.
   */
  tooltip: TooltipImperativeHandle;

  /**
   * The element that triggered the tooltip.
   */
  trigger: HTMLElement;

  /**
   * The element for the tooltip to point to. If not defined, the trigger element will be used as the target.
   */
  target?: HTMLElement | null;

  /**
   * Delay before the tooltip is shown, in milliseconds
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds
   *
   * @defaultvalue 250
   */
  hideDelay?: number;

  /**
   * Only show the tooltip if the target element's children are truncated (overflowing).
   */
  onlyIfTruncated?: boolean;
};

/**
 * The source of the event that caused the tooltip to be shown or hidden
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipTriggerReason = 'focus' | 'pointer';
