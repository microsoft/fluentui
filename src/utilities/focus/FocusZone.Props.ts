import * as React from 'react';

export interface IFocusZoneProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Defines which arrows to react to.
   * @default FocusZoneDirection.bidriectional
   */
  direction?: FocusZoneDirection;

  /**
   * If set, will cycles to the beginning of the targets once the user navigates to the
   * next target while at the end, and to the end when navigate to the previous at the beginning.
   */
  isCircularNavigation?: boolean;

  /**
   * If provided, this callback will be executed on keypresses to determine if ther user
   * intends to navigate into the inner zone. Returning true will ask the first inner zone to
   * set focus.
   */
  isInnerZoneKeystroke?: (ev: React.KeyboardEvent) => boolean;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;
}

export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical,

  /** Only react to left/right arrows. */
  horizontal,

  /** React to all arrows. */
  bidirectional
}
