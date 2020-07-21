import { ComponentProps } from '@fluentui/react-compose';

export type Alignment =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'baseline'
  | 'stretch';

export interface FlexItemProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines how much to grow the Flexitem in proportion to its siblings.
   */
  grow?: boolean | number;
  /**
   * Defines at what ratio should the Flexitem shrink to fit the available space.
   */
  shrink?: boolean | number;
  /**
   * Defines how to align the Flexitem.
   */
  align?: Alignment;
  /**
   * Defines order of the Flexitem.
   */
  order?: number | string;
  /**
   * Defines whether the Flexitem should take up 100% of the height of its parent.
   */
  fluid?: boolean;
  /**
   * Item can be pushed towards opposite side in the container’s direction.
   */
  push?: boolean;
}
