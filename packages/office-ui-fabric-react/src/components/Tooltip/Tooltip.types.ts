import * as React from 'react';
import { TooltipBase } from './Tooltip.base';
import { ICalloutProps } from '../../Callout';
import { IRenderFunction } from '../../Utilities';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Tooltip}
 */
export interface ITooltip {}

/**
 * Tooltip component props.
 * {@docCategory Tooltip}
 */
export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement | TooltipBase> {
  /**
   * Optional callback to access the ITooltip interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ITooltip>;

  /**
   * Properties to pass through for Callout, reference detail properties in ICalloutProps
   * @defaultvalue isBeakVisible: true, beakWidth: 16, gapSpace: 0, setInitialFocus: true, doNotLayer: false
   */
  calloutProps?: ICalloutProps;

  /**
   *  Content to be passed to the tooltip
   */
  content?: string | JSX.Element | JSX.Element[];

  /**
   *  Render function to populate content area
   */
  onRenderContent?: IRenderFunction<ITooltipProps>;

  /**
   * Length of delay. Can be set to zero if you do not want a delay.
   * @defaultvalue medium
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
   * Indicator of how the tooltip should be anchored to its targetElement.
   * @defaultvalue DirectionalHint.topCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * Theme to apply to the component.
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
  medium = 1,
  long = 2
}

/**
 * {@docCategory Tooltip}
 */
export interface ITooltipStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
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
