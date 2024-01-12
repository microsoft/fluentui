import * as React from 'react';
import type { PopoverState, PopoverProps } from '@fluentui/react-popover';
import { TeachingPopoverContextValue } from '../../TeachingPopoverContext';

export type TeachingPopoverPageChangeData = { currentPage: number };

export type TeachingPopoverAppearance = 'brand' | undefined;

/**
 * TeachingPopover Props
 */
export type TeachingPopoverProps = Omit<PopoverProps, 'appearance'> & {
  /**
   * Enables user to dictate current page number via props
   */
  currentPage?: number;
  /**
   * Callback to notify a page change (can be used to update 'currentPage' externally).
   */
  // eslint-disable-next-line @fluentui/consistent-callback-type
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    data: TeachingPopoverPageChangeData,
  ) => void;
  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  // eslint-disable-next-line @fluentui/consistent-callback-type
  onFinish?: (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => void;
  /**
   * The appearance property (extended from popover, but removed 'inverted').
   */
  appearance?: TeachingPopoverAppearance;
};

export type TeachingPopoverContextValues = {
  teachingPopover: TeachingPopoverContextValue;
};

/**
 * TeachingPopover State
 */
export type TeachingPopoverState = Omit<PopoverState, 'appearance'> &
  Partial<Pick<TeachingPopoverProps, 'onPageChange' | 'onFinish' | 'appearance'>> &
  Required<Pick<TeachingPopoverProps, 'currentPage'>> & {
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
