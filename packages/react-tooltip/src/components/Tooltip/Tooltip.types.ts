import * as React from 'react';
import { Position, Alignment } from '@fluentui/react-positioning';
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
  children: React.ReactElement<TooltipTriggerProps> | ((props: TooltipTriggerProps) => React.ReactNode);

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

  /**
   * Ref to the tooltip's imperative API to show or hide programatically.
   */
  componentRef?: React.Ref<TooltipImperativeApi>;

  /**
   * Callback when the tooltip is triggered, for example from a PointerEnter or Focus event.
   * The tooltip can be canceled by setting data.preventShow = true. This can be used to only
   * show the tooltip when text is truncated, for example.
   *
   * @param event - The event that triggered the tooltip.
   * @param data - Extra arguments for onBeforeShow.
   */
  onBeforeShow?: (
    event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    data: OnBeforeShowTooltipData,
  ) => void;

  /**
   * Callback when the tooltip becomes visible, after the showDelay has elapsed.
   *
   * @param data - Extra arguments for onShow.
   */
  onShow?: (data: OnShowTooltipData) => void;

  /**
   * Callback when the tooltip is hidden, after the hideDelay has elapsed.
   */
  onHide?: () => void;
}

/**
 * Imperative interface to show or hide the tooltip programatically.
 */
export interface TooltipImperativeApi {
  /**
   * Immediately show the tooltip pointing to the given target element.
   *
   * This will hide any other currently visible tooltip.
   *
   * @param target - The element that the tooltip should point to. Typically the element that triggered the tooltip.
   */
  show: (target: HTMLElement) => void;

  /**
   * Immediately hide the tooltip.
   */
  hide: () => void;
}

/**
 * The properties that are added to the trigger of the Tooltip
 * {@docCategory Tooltip}
 */
export type TooltipTriggerProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;

/**
 * Data for the Tooltip's onBeforeShow event.
 */
export interface OnBeforeShowTooltipData {
  /**
   * The element that the tooltip will point to. By default, this is the element that triggered the tooltip
   * (event.currentTarget). It can be changed by the onBeforeShow handler to have the tooltip point to another element.
   */
  target: HTMLElement;

  /**
   * Set preventShow to true to cancel showing the tooltip.
   */
  preventShow?: boolean;
}

/**
 * Data for the Tooltip's onShow event.
 */
export interface OnShowTooltipData {
  /**
   * The element that the tooltip is pointing to.
   */
  readonly target: HTMLElement;
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
   * Whether the tooltip is currently displayed.
   */
  readonly visible: boolean;

  /**
   * Whether the tooltip should be rendered to the DOM.
   *
   * Normally the tooltip will only be rendered when visible. However, if
   * triggerAriaAttribute is labelledby or describedby, the tooltip will
   * always be rendered even when hidden so that those aria attributes
   * to always refer to a valid DOM element.
   */
  shouldRenderTooltip: boolean;

  /**
   * Ref to the arrow element
   */
  arrowRef?: React.Ref<HTMLDivElement>;

  /**
   * CSS class for the arrow element
   */
  arrowClassName?: string;
}
