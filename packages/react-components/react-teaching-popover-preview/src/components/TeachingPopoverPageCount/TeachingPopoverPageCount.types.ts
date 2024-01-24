import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverAppearance } from '../TeachingPopover/TeachingPopover.types';
import { PopoverState } from '@fluentui/react-popover';

export type TeachingPopoverPageCountSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div,
   * it may contain icons or text depending on TeachingPopoverPageCountStyle
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The element for each carousel page in 'icon' mode.
   */
  carouselIcon: NonNullable<Slot<'button'>>;

  /**
   * The element for each carousel page in 'icon' mode.
   */
  carouselSelectedIcon: NonNullable<Slot<'button'>>;
};

export type TeachingPopoverPageCountStyle = 'text' | 'icon';

export type TeachingPopoverPageCountState = ComponentState<TeachingPopoverPageCountSlots> & {
  /**
   * The current carousel page.
   */
  currentPage: number;
  /**
   * The total number of carousel pages, controlled by children within carousel itself.
   */
  totalPages: number;
  /**
   * Allows the carousel pagination to update the current page based on icon interaction.
   */
  setCurrentPage: (index: number) => void;
  /**
   * The style in which the page count is rendered.
   * Defaults to 'icon'
   */
  countStyle: TeachingPopoverPageCountStyle;
} & Pick<PopoverState, 'appearance'>;

// For localization or customization, users may want to modify this for their own purposes
export type TeachingPopoverPageCountChildRenderFunction = (currentPage: number, totalPages: number) => React.ReactNode;
export type TeachingPopoverPageCountRenderType = TeachingPopoverPageCountChildRenderFunction | React.ReactNode;

export type TeachingPopoverPageCountProps = ComponentProps<Partial<TeachingPopoverPageCountSlots>> &
  Required<Pick<TeachingPopoverPageCountState, 'currentPage' | 'totalPages' | 'setCurrentPage'>> &
  Partial<Pick<TeachingPopoverPageCountState, 'countStyle'>> & {
    children?: TeachingPopoverPageCountRenderType;
  };
