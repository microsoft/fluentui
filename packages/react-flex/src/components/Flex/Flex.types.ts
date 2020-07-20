import * as React from 'react';

/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 */
export type Alignment =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'baseline'
  | 'stretch';

export interface FlexProps {
  /**
   * Defines how to render the Stack.
   */
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Defines if container should be inline element.
   */
  inline?: boolean;
  /**
   * Defines whether to render the children horizontally.
   */
  horizontal: boolean;
  /**
   * Defines whether the children should wrap onto multiple rows or columns when they are
   * about to overflow the size of the container.
   */
  wrap?: boolean;
  /**
   * Defines how to align the children horizontally (along the x-axis).
   */
  horizontalAlign?: Alignment;
  /**
   * Defines how to align the children vertically (along the y-axis).
   */
  verticalAlign?: Alignment;
  /**
   * Defines the inner padding of the container.
   */
  padding?: number | string;
  /**
   * Defines whether to render the children in the opposite direction.
   */
  reversed?: boolean;
  /**
   * Defines the spacing between the children.
   */
  gap?: number | string;
  /**
   * Defines whether the children should not shrink to fit the available space.
   */
  disableShrink?: boolean;
  /**
   * Defines whether the container should take up 100% of the height of its parent.
   */
  fluid?: boolean;
}
