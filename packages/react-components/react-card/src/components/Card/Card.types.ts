import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Slots available in the Card component.
 */
export type CardSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;
};

/**
 * Card component props.
 */
export type CardProps = ComponentProps<CardSlots> & {
  appearance?: 'filled' | 'filled-alternative' | 'outline' | 'subtle';

  /**
   * Sets the focus behavior for the card. If `true`, the card will use the `noTab` focus behavior.
   *
   * `off`
   * The card will not focusable.
   *
   * `no-tab`
   * This behaviour traps the focus inside of the Card when pressing the Enter key and will only release focus when
   * pressing the Escape key.
   *
   * `tab-exit`
   * This behaviour traps the focus inside of the Card when pressing the Enter key but will release focus when pressing
   * the Tab key on the last inner element.
   *
   * `tab-only`
   * This behaviour will cycle through all elements inside of the Card when pressing the Tab key and then release focus
   * after the last inner element.
   *
   * @default 'off'
   */
  focusMode?: 'off' | 'no-tab' | 'tab-exit' | 'tab-only';

  /**
   * Defines the orientation of the card.
   *
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Controls the card's border radius and padding between inner elements.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering Card.
 */
export type CardState = ComponentState<CardSlots> & Required<Pick<CardProps, 'appearance' | 'orientation' | 'size'>>;
