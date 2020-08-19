import { ColorTokenSet, RecursivePartial } from '../../types';

export type FlexTokens = RecursivePartial<
  ColorTokenSet & {
    /**
     * Defines the padding to be applied to the Flex contents relative to its border.
     */
    padding: string;
    /**
     * Defines the spacing between the children.
     */
    gap: string;
  }
>;

export type FlexItemTokens = RecursivePartial<
  ColorTokenSet & {
    /**
     * Defines how much to grow the FlexItem in proportion to its siblings.
     */
    grow: string;
    /**
     * Defines order of the FlexItem.
     */
    order: string;
    /**
     * Defines at what ratio should the FlexItem shrink to fit the available space.
     */
    shrink: string;
    /**
     * Defines the margin of the FlexItem.
     */
    gap: string;
  }
>;
