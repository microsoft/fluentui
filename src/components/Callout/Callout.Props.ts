import * as React from 'react';
import Callout from './Callout';

export interface ICalloutProps extends React.Props<Callout> {
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

export interface ILink {
  /**
   * Text to render for the link
   */
  name: string;

  /**
   * URL for the link
   */
  url: string;
}

export enum DirectionalHint {
  /**
   * Appear above the target element, with the left edges of the callout and target aligning
   */
  topLeftEdge,

  /**
   * Appear above the target element, with the centers of the callout and target aligning
   */
  topCenter,

  /**
   * Appear above the target element, with the right edges of the callout and target aligning
   */
  topRightEdge,

  /**
   * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
   */
  topAutoEdge,

  /**
   * Appear below the target element, with the left edges of the callout and target aligning
   */
  bottomLeftEdge,

  /**
   * Appear below the target element, with the centers of the callout and target aligning
   */
  bottomCenter,

  /**
   * Appear below the target element, with the right edges of the callout and target aligning
   */
  bottomRightEdge,

  /**
   * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
   */
  bottomAutoEdge,

  /**
   * Appear to the left of the target element, with the top edges of the callout and target aligning
   */
  leftTopEdge,

  /**
   * Appear to the left of the target element, with the centers of the callout and target aligning
   */
  leftCenter,

  /**
   * Appear to the left of the target element, with the bottom edges of the callout and target aligning
   */
  leftBottomEdge,

  /**
   * Appear to the right of the target element, with the top edges of the callout and target aligning
   */
  rightTopEdge,

  /**
   * Appear to the right of the target element, with the centers of the callout and target aligning
   */
  rightCenter,

  /**
   * Appear to the right of the target element, with the bottom edges of the callout and target aligning
   */
  rightBottomEdge
}