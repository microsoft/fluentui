import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselCard Props
 */
export type CarouselCardProps = ComponentProps<CarouselCardSlots> & {
  /**
   * Sets the focus behavior for the CarouselCard.
   *
   * `off`
   * The CarouselCard will not focusable.
   *
   * `no-tab`
   * This behaviour traps the focus inside of the CarouselCard when pressing the Enter key and will only release focus when
   * pressing the Escape key.
   *
   * `tab-exit`
   * This behaviour traps the focus inside of the CarouselCard when pressing the Enter key but will release focus when pressing
   * the Tab key on the last inner element.
   *
   * `tab-only`
   * This behaviour will cycle through all elements inside of the CarouselCard when pressing the Tab key and then release focus
   * after the last inner element.
   *
   * @default 'off'
   */
  focusMode?: 'off' | 'no-tab' | 'tab-exit' | 'tab-only';

  /**
   * Sets the card styling to be responsive based on content.
   */
  autoSize?: boolean;
};

/**
 * State used in rendering CarouselCard
 */
export type CarouselCardState = ComponentState<CarouselCardSlots> & Pick<CarouselCardProps, 'autoSize'>;
