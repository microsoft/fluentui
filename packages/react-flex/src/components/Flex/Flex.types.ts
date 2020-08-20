import * as React from 'react';
import { ComponentProps, BaseSlots, SlotProps } from '@fluentui/react-compose';
import { ColorTokenSet } from '@fluentui/react-theme-provider';

/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 */
export type Alignment = 'auto' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch';

export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Defines if container should be rendered as an inline block element or as a regular block element.
   */
  inline?: boolean;
  /**
   * Sets vertical flow direction.
   */
  column?: boolean;
  /**
   * Defines whether the content inside of `Flex` wraps when trying to extend beyond its boundaries.
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
   * Defines whether to render the children in the opposite direction.
   */
  reverse?: boolean;
  /**
   * Defines whether the children should not shrink to fit the available space.
   */
  disableShrink?: boolean;
  /**
   * Defines whether the container should take up 100% of the height of its parent.
   */
  fluid?: boolean;
  /**
   * Defines the set of tokens that are used for style customizations.
   */
  tokens?: FlexTokens;
}

export interface FlexState extends FlexProps {}

export interface FlexSlots extends BaseSlots {}

export type FlexSlotProps = SlotProps<FlexSlots, FlexProps, React.HTMLAttributes<HTMLElement>>;

export type FlexTokens = ColorTokenSet & {
  /**
   * Defines the padding to be applied to the Flex contents relative to its border.
   */
  padding?: string;
  /**
   * Defines the spacing between the children.
   */
  gap?: string;
};
