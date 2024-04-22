import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';
import { ButtonProps, ButtonState } from '@fluentui/react-button';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ReactNode } from 'react';

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
    altText: ReactNode;
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
