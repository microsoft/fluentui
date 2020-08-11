import { ComponentProps, BaseSlots, SlotProps } from '@fluentui/react-compose';
import { Alignment } from '../Flex/Flex.types';
import { ColorTokenSet } from '@fluentui/react-theme-provider';

export interface FlexItemProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines how to align the FlexItem.
   */
  align?: Alignment;
  /**
   * Defines whether the FlexItem should take up 100% of the height of its parent.
   */
  fluid?: boolean;
  /**
   * Item can be pushed towards the opposite side in the container’s direction.
   */
  push?: boolean;
  /**
   * Defines the set of tokens that are used for style customizations.
   */
  tokens?: FlexItemTokens;
}

export interface FlexItemState extends FlexItemProps {}

export interface FlexItemSlots extends BaseSlots {}

export type FlexItemSlotProps = SlotProps<FlexItemSlots, FlexItemProps, React.HTMLAttributes<HTMLElement>>;

export type FlexItemTokens = ColorTokenSet & {
  /**
   * Defines how much to grow the FlexItem in proportion to its siblings.
   */
  grow?: string;
  /**
   * Defines order of the FlexItem.
   */
  order?: string;
  /**
   * Defines at what ratio should the FlexItem shrink to fit the available space.
   */
  shrink?: string;
  /**
   * Defines the margin of the FlexItem.
   */
  gap?: string;
};
