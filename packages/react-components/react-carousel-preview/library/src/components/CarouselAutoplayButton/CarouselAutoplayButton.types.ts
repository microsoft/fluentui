import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ButtonSlots, ToggleButtonProps, ToggleButtonState } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type CarouselAutoplayButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

export type CarouselAutoplayChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The updated autoplay value.
   */
  checked: boolean;
};

export type CarouselAutoplayAriaLabelFunction = (autoplay: boolean) => string;

/**
 * CarouselAutoplayButton Props
 */
export type CarouselAutoplayButtonProps = ToggleButtonProps &
  ComponentProps<CarouselAutoplayButtonSlots> & {
    /**
     * Callback that informs the user when internal autoplay value has changed
     */
    onCheckedChange?: EventHandler<CarouselAutoplayChangeData>;
  };

/**
 * State used in rendering CarouselAutoplayButton
 */
export type CarouselAutoplayButtonState = ToggleButtonState & ComponentState<CarouselAutoplayButtonSlots>;
