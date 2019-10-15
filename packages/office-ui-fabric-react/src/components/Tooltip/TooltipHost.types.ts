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

  /** Only show tooltip if tooltip host's content is overflowing */
  Self
}

/**
 * Tooltip component props.
 * {@docCategory Tooltip}
 */
export interface ITooltipHostProps extends React.HTMLAttributes<HTMLDivElement | TooltipHostBase> {
  /**
   * Optional callback to access the ITooltipHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITooltipHost>;

  /**
   * Additional properties to pass through for Callout, reference detail properties in ICalloutProps
   */
  calloutProps?: ICalloutProps;

  /**
   * Optionally a number of milliseconds to delay closing the tooltip, so that
   * the user has time to hover over the tooltip and interact with it. Hovering
   * over the tooltip will count as hovering over the host, so that the tooltip
   * will stay open if the user is actively interacting with it.
   */
  closeDelay?: number;

  /**
   *  Content to be passed to the tooltip
   */
  content?: string | JSX.Element | JSX.Element[];

  /**
   * Length of delay
   * @defaultvalue medium
   */
  delay?: TooltipDelay;

  /**
   * Indicator of how the tooltip should be anchored to its targetElement.
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * Optional class name to apply to tooltip host.
   */
  hostClassName?: string;

  /**
   * Only show if there is overflow. If set, the tooltip hosts observes  and only shows the tooltip if this element has overflow.
   * It also uses the parent as target element for the tooltip.
   */
  overflowMode?: TooltipOverflowMode;

  /**
   * Whether or not to mark the container as described by the tooltip.
   * If not specified, the caller should mark as element as described by the tooltip id.
   */
  setAriaDescribedBy?: boolean;

  /**
   * Additional properties to pass through for Tooltip, reference detail properties in ITooltipProps
   */
  tooltipProps?: ITooltipProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITooltipHostStyleProps, ITooltipHostStyles>;

  /**
   * Theme provided by High-Order Component.
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
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept optional classNames for the host wrapper
   */
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
