import * as React from 'react';
import { TooltipHostBase } from './TooltipHost.base';
import { TooltipDelay, ITooltipProps } from './Tooltip.types';
import { ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipHost {
  /**
   * Shows the tooltip.
   */
  show: () => void;

  /**
   * Dismisses the tooltip.
   */
  dismiss: () => void;
}

/**
 * {@docCategory Tooltip}
 */
export enum TooltipOverflowMode {
  /** Only show tooltip if parent DOM element is overflowing */
  Parent,

  /**
   * Only show tooltip if tooltip host's content is overflowing.
   * Note that this does not check the children for overflow, only the TooltipHost root.
   */
  Self,
}

/**
 * TooltipHost props. Note that native props (such as `id`, `className`, and `aria-` props) are
 * passed through to the Tooltip itself, rather than being used on the host element.
 * {@docCategory Tooltip}
 */
export interface ITooltipHostProps extends React.HTMLAttributes<HTMLDivElement | TooltipHostBase> {
  /**
   * Optional callback to access the ITooltipHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITooltipHost>;

  /**
   * Additional properties to pass through for Callout.
   */
  calloutProps?: ICalloutProps;

  /**
   * Number of milliseconds to delay closing the tooltip, so that the user has time to hover over
   * the tooltip and interact with it. Hovering over the tooltip will count as hovering over the
   * host, so that the tooltip will stay open if the user is actively interacting with it.
   */
  closeDelay?: number;

  /**
   * Content to display in the Tooltip.
   */
  content?: string | JSX.Element | JSX.Element[];

  /**
   * Length of delay before showing the tooltip on hover.
   * @defaultvalue TooltipDelay.medium
   */
  delay?: TooltipDelay;

  /**
   * How the tooltip should be anchored to its `targetElement`.
   * @defaultvalue DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used.
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * Class name to apply to tooltip host.
   */
  hostClassName?: string;

  /**
   * Class name to apply to the *tooltip itself*, not the host.
   * To apply a class to the host, use `hostClassName` or `styles.root`.
   */
  className?: string;

  /**
   * If this is unset (the default), the tooltip is always shown even if there's no overflow.
   *
   * If set, only show the tooltip if the specified element (`Self` or `Parent`) has overflow.
   * When set to `Parent`, the parent element is also used as the tooltip's target element.
   *
   * Note that even with `Self` mode, the TooltipHost *does not* check whether any children have overflow.
   */
  overflowMode?: TooltipOverflowMode;

  /**
   * Whether or not to mark the TooltipHost root element as described by the tooltip.
   * If not specified, the caller should pass an `id` to the TooltipHost (to be passed through to
   * the Tooltip) and mark the appropriate element as `aria-describedby` the `id`.
   * @defaultvalue true
   */
  setAriaDescribedBy?: boolean;

  /**
   * Additional properties to pass through for Tooltip.
   */
  tooltipProps?: ITooltipProps;

  /**
   * Optional ID to pass through to the tooltip (not used on the host itself).
   * Auto-generated if not provided.
   */
  id?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITooltipHostStyleProps, ITooltipHostStyles>;

  /**
   * Theme provided by higher-order component.
   */
  theme?: ITheme;

  /**
   * Notifies when tooltip becomes visible or hidden, whatever the trigger was.
   */
  onTooltipToggle?(isTooltipVisible: boolean): void;
}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipHostStyleProps {
  theme: ITheme;
  className?: string;
}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipHostStyles {
  /**
   * Style for the host wrapper element.
   */
  root: IStyle;
}
