import * as React from 'react';
import { Position, Alignment, PopperVirtualElement } from '@fluentui/react-positioning';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * Properties for the Tooltip component
 * {@docCategory Tooltip}
 */
export interface TooltipProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * The child is the element that triggers the Tooltip. It will have additional properties added,
   * including events and aria properties.
   * Alternatively, children can be a render function that takes the props and adds
   * them to the appropriate elements.
   */
  children?:
    | (React.ReactElement<React.HTMLAttributes<HTMLElement>> & { ref?: React.Ref<unknown> })
    | ((props: TooltipTriggerProps) => React.ReactNode)
    | null;

  /**
   * The content displayed inside the tooltip.
   */
  content: ShorthandPropsCompat<ComponentPropsCompat>;

  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue above
   */
  position?: Position;

  /**
   * How to align the tooltip along the edge of the target element.
   *
   * @defaultvalue center
   */
  align?: Alignment;

  /**
   * Optional. The target element that the tooltip uses for positioning.
   *
   * By default, the target is the tooltip's child element.
   */
  target?: HTMLElement | PopperVirtualElement | null;

  /**
   * Color variant with inverted colors
   *
   * @defaultvalue false
   */
  inverted?: boolean;

  /**
   * Render an arrow pointing to the target element
   *
   * @defaultvalue false
   */
  pointing?: boolean;

  /**
   * Distance between the tooltip and the target element, in pixels
   *
   * @defaultvalue 4
   */
  offset?: number;

  /**
   * Control the tooltip's visibility programatically.
   *
   * This can be used in conjunction with onVisibleChange to modify the tooltip's show and hide behavior.
   *
   * If not provided, the visibility will be controlled by the tooltip itself, based on hover and focus events on the
   * trigger (child) element.
   */
  visible?: boolean;

  /**
   * Notification when the visibility of the tooltip is changing
   */
  onVisibleChange?: (
    event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined,
    data: OnVisibleChangeData,
  ) => void;

  /**
   * Specifies which aria attribute to set on the trigger element.
   * * `label` - Set aria-label to the tooltip's content. Requires content to be a string; if not, uses `labelledby`.
   * * `labelledby` - Set aria-labelledby to the tooltip's id. The id is generated if not provided.
   * * `describedby` - Set aria-describedby to the tooltip's id. The id is generated if not provided.
   * * null - Do not set any aria attributes on the trigger element.
   *
   * @defaultvalue label
   */
  triggerAriaAttribute?: 'label' | 'labelledby' | 'describedby' | null;

  /**
   * Delay before the tooltip is shown, in milliseconds.
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds.
   *
   * @defaultvalue 250
   */
  hideDelay?: number;
}

/**
 * The properties that are added to the trigger of the Tooltip
 * {@docCategory Tooltip}
 */
export type TooltipTriggerProps = {
  ref?: React.Ref<never>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;

/**
 * Data for the Tooltip's onVisibleChange event.
 */
export interface OnVisibleChangeData {
  visible: boolean;
}

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export type TooltipShorthandProps = 'content';

/**
 * Names of TooltipProps that have a default value in useTooltip
 * {@docCategory Tooltip}
 */
export type TooltipDefaultedProps =
  | 'position'
  | 'align'
  | 'offset'
  | 'showDelay'
  | 'hideDelay'
  | 'content'
  | 'triggerAriaAttribute';

/**
 * State used in rendering Tooltip
 */
export interface TooltipState extends ComponentStateCompat<TooltipProps, TooltipShorthandProps, TooltipDefaultedProps> {
  /**
   * Ref to the root tooltip element.
   */
  ref: React.Ref<HTMLElement>;

  /**
   * Whether the tooltip should be rendered to the DOM.
   *
   * Normally the tooltip will only be rendered when visible. However, if
   * triggerAriaAttribute is labelledby or describedby, the tooltip will
   * always be rendered even when hidden so that those aria attributes
   * to always refer to a valid DOM element.
   */
  shouldRenderTooltip?: boolean;

  /**
   * Ref to the arrow element
   */
  arrowRef?: React.Ref<HTMLDivElement>;

  /**
   * CSS class for the arrow element
   */
  arrowClassName?: string;
}
