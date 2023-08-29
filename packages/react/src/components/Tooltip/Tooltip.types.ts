import * as React from 'react';
import { TooltipBase } from './Tooltip.base';
import { DirectionalHint } from '../../common/DirectionalHint';
import type { ICalloutProps } from '../../Callout';
import type { IRenderFunction, IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle, ITheme } from '../../Styling';

/**
 * {@docCategory Tooltip}
 */
export interface ITooltip {}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement | TooltipBase>, 'content'> {
  /**
   * Optional callback to access the ITooltip interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITooltip>;

  /**
   * Properties to pass through for Callout.
   * @defaultvalue `{ isBeakVisible: true, beakWidth: 16, gapSpace: 0, setInitialFocus: true, doNotLayer: false }`
   */
  calloutProps?: ICalloutProps;

  /**
   * Content to be passed to the tooltip
   */
  content?: string | JSX.Element | JSX.Element[];

  /**
   * Render function to populate tooltip content.
   */
  onRenderContent?: IRenderFunction<ITooltipProps>;

  /**
   * Length of delay. Set to `TooltipDelay.zero` if you do not want a delay.
   * @defaultvalue TooltipDelay.medium
   */
  delay?: TooltipDelay;

  /**
   * Max width of tooltip
   * @defaultvalue 364px
   */
  maxWidth?: string | null;

  /**
   * Element to anchor the Tooltip to.
   */
  targetElement?: HTMLElement;

  /**
   * How the tooltip should be anchored to its `targetElement`.
   * @defaultvalue DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * Theme provided by higher-order component.
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITooltipStyleProps, ITooltipStyles>;
}

/**
 * {@docCategory Tooltip}
 */
export enum TooltipDelay {
  zero = 0,
  /** 300 ms delay before showing the tooltip */
  medium = 1,
  /** 500 ms delay before showing the tooltip */
  long = 2,
}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipStyleProps {
  theme: ITheme;

  className?: string;

  /**
   * Delay before tooltip appears.
   * @deprecated Delay logic moved to TooltipHost vs relying on animation delay.
   */
  delay?: TooltipDelay;

  /**
   * Maximum width of tooltip.
   */
  maxWidth?: string;

  /**
   * The gap between the Callout and the target
   * @defaultvalue 0
   */
  gapSpace?: number;

  /**
   * The width of the Callout's beak
   * @defaultvalue 16
   */
  beakWidth?: number;
}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the content element.
   */
  content: IStyle;

  /**
   * Style for the subtext element.
   */
  subText: IStyle;
}
