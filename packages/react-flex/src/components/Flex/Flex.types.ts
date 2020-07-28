import { ComponentProps, BaseSlots, SlotProps } from '@fluentui/react-compose';

/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 */
export type Alignment = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch';

export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Defines if container should be inline element.
   */
  inline?: boolean;
  /**
   * Defines whether to render the children horizontally.
   */
  column?: boolean;
  /**
   * Sets vertical flow direction.
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
  /**
   * Defines strategy for distributing remaining space between items.
   */
  space?: ['around', 'between', 'evenly'];
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface FlexSlots extends BaseSlots {}

export type FlexSlotProps = SlotProps<FlexSlots, FlexProps, React.HTMLAttributes<HTMLElement>>;
