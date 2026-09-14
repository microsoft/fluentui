import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '@fluentui/react-popover';
import type { ButtonProps, ButtonState } from '@fluentui/react-button';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';

export type TeachingPopoverCarouselFooterButtonSlots = {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * TeachingPopoverCarouselFooterButton Props
 */
export type TeachingPopoverCarouselFooterButtonProps = ComponentProps<TeachingPopoverCarouselFooterButtonSlots> &
  ButtonProps & {
    /**
     * Defines whether the button should be next or previous type - used for both styling and functionality.
     */
    navType: 'next' | 'prev';

    /**
     * The ReactNode provided to the button when it is on it's first (navType 'prev') or last (navType 'next') step
     */
    altText: React.ReactNode;
  };

/**
 * State used in rendering TeachingPopoverCarouselFooterButton
 */
export type TeachingPopoverCarouselFooterButtonState = ButtonState &
  ComponentState<TeachingPopoverCarouselFooterButtonSlots> &
  Pick<TeachingPopoverCarouselFooterButtonProps, 'navType' | 'altText'> & {
    /* Rename popover appearance to prevent conflict with button appearance */
    popoverAppearance: PopoverContextValue['appearance'];
  };

export type TeachingPopoverCarouselFooterButtonBaseProps = TeachingPopoverCarouselFooterButtonProps;

/**
 * Base state intentionally does not extend ButtonState — `useButton_unstable` is
 * only invoked from the styled hook, which derives the right `appearance` from
 * the popover context before calling it.
 */
export type TeachingPopoverCarouselFooterButtonBaseState = ComponentState<TeachingPopoverCarouselFooterButtonSlots> &
  Pick<TeachingPopoverCarouselFooterButtonProps, 'navType' | 'altText'>;
