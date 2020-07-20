export interface FlexItemProps {
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
  align: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end';
  /**
   * Defines order of the Flexitem.
   */
  order?: number | string;
  /**
   * Defines whether the Flexitem should take up 100% of the height of its parent.
   */
  fluid?: boolean;
}
