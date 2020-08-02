import { ComponentProps, BaseSlots, SlotProps } from '@fluentui/react-compose';
import { Alignment } from '../Flex';
import { ColorPlateSet } from '@fluentui/react-theme-provider';

export interface FlexItemProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines how to align the Flexitem.
   */
  align?: Alignment;
  /**
   * Defines whether the Flexitem should take up 100% of the height of its parent.
   */
  fluid?: boolean;
  /**
   * Item can be pushed towards opposite side in the container’s direction.
   */
  push?: boolean;
  tokens?: FlexItemTokens;
}

export interface FlexItemState extends FlexItemProps {}

export interface FlexItemSlots extends BaseSlots {}

export type FlexItemSlotProps = SlotProps<FlexItemSlots, FlexItemProps, React.HTMLAttributes<HTMLElement>>;

export type FlexItemTokens = ColorPlateSet & {
  /**
   * Defines how much to grow the Flexitem in proportion to its siblings.
   */
  grow?: string;
  /**
   * Defines order of the Flexitem.
   */
  order?: string;
  /**
   * Defines at what ratio should the Flexitem shrink to fit the available space.
   */
  shrink?: string;
  /**
   * Defines margin of child.
   * NOTE: This is used for gap.
   */
  margin?: string;
};
