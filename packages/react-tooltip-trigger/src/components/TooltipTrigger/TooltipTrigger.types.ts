import * as React from 'react';
import { RequiredProps, ResolvedShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { tooltipTriggerShorthandProps } from './useTooltipTrigger';
import { TooltipImperativeHandle, TooltipProps } from '../../common/TooltipProps.types';
import { TooltipManager } from '../../common/TooltipManager.types';

/**
 * {@docCategory TooltipTrigger}
 */
export interface TooltipTriggerProps
  extends Pick<TooltipProps, 'position' | 'align' | 'subtle' | 'noArrow' | 'offset'> {
  /**
   * The child of TooltipTrigger is the element that triggers the tooltip. It will
   * have additional properties added, including events and aria properties.
   * Alternatively, children can be a render function that takes the props and adds
   * them to the appropriate elements.
   */
  children:
    | React.ReactElement<React.HTMLAttributes<HTMLElement>>
    | ((props: TooltipTriggerChildProps) => React.ReactNode);

  /**
   * The content of the tooltip.
   */
  tooltip: ShorthandProps<TooltipProps>;

  /**
   * Determines whether the tooltip is being used as the trigger's label or description.
   * This determines whether to set aria-describedby or aria-labelledby on the trigger element.
   *
   * @defaultvalue description
   */
  type?: 'description' | 'label';

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

  /**
   * A ref to an element that the tooltip should be anchored to.
   *
   * If not specified, the tooltip will point to the same element that triggered it, which is the common use case.
   */
  targetRef?: React.RefObject<HTMLElement>;
}

/**
 * The props that are added to the child of the TooltipTrigger
 */
export type TooltipTriggerChildProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby'
>;

/**
 * Names of the shorthand properties in TooltipTriggerProps
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerShorthandProps = typeof tooltipTriggerShorthandProps[number];

/**
 * Names of TooltipTriggerProps that have a default value in useTooltipTrigger
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerDefaultedProps = 'showDelay' | 'hideDelay';

/**
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerState = RequiredProps<
  ResolvedShorthandProps<
    TooltipTriggerProps & {
      manager: TooltipManager | undefined;
      portalRoot: HTMLElement;
      tooltipRef: React.MutableRefObject<TooltipImperativeHandle | null>;
    },
    TooltipTriggerShorthandProps
  >,
  TooltipTriggerDefaultedProps
>;
