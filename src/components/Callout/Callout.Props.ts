import * as React from 'react';
import { Callout } from './Callout';
import { CalloutContent } from './CalloutContent';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IPositionProps } from '../../utilities/positioning';

export interface ICalloutProps extends React.Props<Callout|CalloutContent>, IPositionProps {
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
   * @default 16
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
   * Whether the beak should be visible.
   * @default true
   */
  isBeakVisible?: boolean;

  /**
   * CSS class to apply to the callout.
   * @default null
   */
  className?: string;

  /**
   * Optional callback when the layer content has mounted.
   */
  onLayerMounted?: () => void;

  /**
   * Callback when the Callout tries to close.
   */
  onDismiss?: (ev?: any) => void;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   */
  doNotLayer?: boolean;

  /**
   * If true then the callout will attempt to focus the first focusable element that it contains.
   * If it doesn't find an element, no focus will be set and the method will return false.
   * This means that it's the contents responsibility to either set focus or have
   * focusable items.
   * @returns True if focus was set, false if it was not.
   */
  setInitialFocus?: boolean;
}

export interface ILink {
  /**
   * Text to render for the link.
   */
  name: string;

  /**
   * URL for the link.
   */
  url: string;
}