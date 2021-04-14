import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Tooltip}
 */
export interface TooltipImperativeHandle {
  /**
   * Show the tooltip, pointing to the target element
   */
  show: (target: HTMLElement) => void;

  /**
   * Hide the tooltip
   */
  hide: () => void;

  /**
   * Get the root element of the tooltip
   */
  getRoot: () => HTMLElement;
}

/**
 * {@docCategory Tooltip}
 */
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue above
   */
  position?: 'above' | 'below' | 'before' | 'after';

  /**
   * How to align the tooltip along the edge of the target element.
   *
   * @defaultvalue center
   */
  align?: 'top' | 'bottom' | 'start' | 'end' | 'center';

  /**
   * Color variant with a subtle look
   */
  subtle?: boolean;

  /**
   * Do not render an arrow pointing to the target element
   */
  noArrow?: boolean;

  /**
   * Distance between the tooltip and the target element, in pixels
   *
   * @defaultvalue 4
   */
  offset?: number;

  /**
   * The arrow that points to the target element. This will be rendered by default unless `noArrow` is specified.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * Imperative handle to show and hide the tooltip
   */
  componentRef?: React.Ref<TooltipImperativeHandle>;
}

/**
 * {@docCategory TooltipProvider}
 */
export type TooltipContext = {
  manager: TooltipManager | undefined;
  portalRoot: HTMLElement;
  Tooltip: React.FC<TooltipProps & React.RefAttributes<HTMLElement>>;
};

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

  onPointerEnterTooltip: (tooltipRoot: HTMLElement) => void;
  onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => void;

  hideAll: () => void;
}
