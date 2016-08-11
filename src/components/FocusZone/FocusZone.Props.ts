import * as React from 'react';
import { FocusZone } from './FocusZone';

export interface IFocusZoneProps extends React.Props<FocusZone> {
  /**
   * Defines which arrows to react to.
   * @default FocusZoneDirection.bidriectional
   */
  direction?: FocusZoneDirection;

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean;

  /**
   * If set, will cycle to the beginning of the targets once the user navigates to the
   * next target while at the end, and to the end when navigate to the previous at the beginning.
   */
  isCircularNavigation?: boolean;

  /**
   * If provided, this callback will be executed on keypresses to determine if the user
   * intends to navigate into the inner zone. Returning true will ask the first inner zone to
   * set focus.
   */
  isInnerZoneKeystroke?: (ev: React.KeyboardEvent) => boolean;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent) => void;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

  /**
   * If provided, HTMLProps which will be mixed in onto the root element emitted by the FocusZone, before
   * other props are applied. This allows you to extend the root element with additional attributes, such as
   * data-automation-id needed for automation.
   */
  rootProps?: React.HTMLProps<HTMLDivElement>;
}

export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical,

  /** Only react to left/right arrows. */
  horizontal,

  /** React to all arrows. */
  bidirectional
}
