import * as React from 'react';
import Callout from './Callout';
import { ILink } from './interfaces';
import { DirectionalHint } from './interfaces';

export interface ICalloutProps extends React.Props<Callout> {
   /**
   * The title text for the callout.
   */
  title: string;

  /**
   * The subtext for the callout.
   */
  subText: string;

  /**
   *  A list of additional links to render in the callout.
   */
  links?: ILink[];

  /**
   * Element to anchor the callout to.
   */
  targetElement?: HTMLElement;

  /**
   * Indicator of how the callout should be anchored to its targetElement.
   * @default DirectionalHint.rightCenter
   */
  directionalHint?: DirectionalHint;

  /**
   * The gap space between the target element and the callout.
   * @default 20
   */
  gapSpace?: number;

  /**
   * The css className for the beak.
   * @default 'ms-Callout-beak'
   */
  beakStyle?: string;

  /**
   * The beak width of the selected beakStyle.
   * @default 28
   */
  beakWidth?: number;

  /**
   * Weather the beak should be visible.
   * @default true
   */
  isBeakVisible?: boolean;

  /**
   * CSS class to apply to the callout.
   * @default null
   */
  className?: string;
}