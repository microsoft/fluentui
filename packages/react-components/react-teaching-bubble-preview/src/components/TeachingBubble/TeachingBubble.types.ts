import type { PopoverState, PopoverProps } from '@fluentui/react-popover';

/**
 * Popover Props
 */
export type TeachingBubbleProps = Omit<PopoverProps, 'appearance'> & {
  /**
   * Enables user to dictate current page number via props
   */
  currentPage?: number;
  /**
   * Callback to notify a page change (can be used to update 'currentPage' externally).
   */
  onPageChange?: (index: number) => void;
  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: () => void;
  /**
   * The appearance property (extended from popover, but removed 'inverted').
   */
  appearance?: 'brand';
};

/**
 * Popover State
 */
export type TeachingBubbleState = Omit<PopoverState, 'appearance'> &
  Partial<Pick<TeachingBubbleProps, 'onPageChange' | 'onFinish' | 'appearance'>> &
  Required<Pick<TeachingBubbleProps, 'currentPage'>> & {
    /**
     * Total pages within a teaching bubble carousel.
     */
    totalPages: number;
    /**
     * Sets current page within a teaching bubble carousel.
     */
    setCurrentPage: (page: number) => void;
    /**
     * Sets total pages within a teaching bubble carousel.
     */
    setTotalPages: (pages: number) => void;
  };
