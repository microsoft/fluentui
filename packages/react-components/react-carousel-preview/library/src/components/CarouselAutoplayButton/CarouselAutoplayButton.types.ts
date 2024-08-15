import * as React from 'react';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ButtonSlots, ToggleButtonProps, ToggleButtonState } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';

export type CarouselAutoplayButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

export type CarouselAutoplayChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The updated autoplay value.
   */
  autoplay: boolean;
};

/**
 * CarouselAutoplayButton Props
 */
export type CarouselAutoplayButtonProps = ToggleButtonProps &
  ComponentProps<CarouselAutoplayButtonSlots> & {
    /**
     * Controls whether autoplay will initialized as true or false
     * Default: true
     */
    defaultAutoplay?: boolean;

    /**
     * User controlled autoplay state
     */
    autoplay?: boolean;

    /**
     * Callback that informs the user when internal autoplay value has changed
     */
    onAutoplayChange?: EventHandler<CarouselAutoplayChangeData>;
  };

/**
 * State used in rendering CarouselAutoplayButton
 */
export type CarouselAutoplayButtonState = ToggleButtonState &
  ComponentState<CarouselAutoplayButtonSlots> &
  Pick<CarouselAutoplayButtonProps, 'autoplay'>;
