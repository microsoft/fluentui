import { TooltipImperativeHandle } from './TooltipProps.types';

export type ShowTooltipArgs = {
  tooltip: TooltipImperativeHandle;
  trigger: HTMLElement;
  target: HTMLElement;
  showDelay: number;
  hideDelay: number;
  onlyIfTruncated?: boolean;
};

export type TooltipTriggerReason = 'focus' | 'pointer';

export interface TooltipManager {
  showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => void;
  hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => void;

  hideAll: () => void;

  onPointerEnterTooltip: (tooltipRoot: HTMLElement) => void;
  onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => void;
}
