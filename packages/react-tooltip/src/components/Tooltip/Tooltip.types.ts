import * as React from 'react';
import { Position, Alignment } from '@fluentui/react-positioning';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

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
   * The arrow that points to the target element. This will be rendered by default unless `noArrow` is specified.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * Imperative handle to show and hide the tooltip
   */
  componentRef?: React.Ref<TooltipImperativeHandle>;
}

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
}

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
