import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Checkbox } from '@fluentui/react-checkbox';
import * as React from 'react';

/**
 * Data sent from the selection events on a selectable card.
 */
export type CardOnSelectData = {
  selected: boolean;
};

/**
 * Slots available in the Card component.
 */
export type CardSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Checkbox slot used when `selectable` prop is enabled.
   */
  select?: Slot<typeof Checkbox>;
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

  /**
   * Enables selection of the card.
   *
   * @default false
   */
  selectable?: boolean;

  /**
   * Defines the controlled selected state of the card.
   *
   * @default false
   */
  selected?: boolean;

  /**
   * Defines whether the card is initially in a selected state or not when rendered.
   *
   * @default false
   */
  defaultSelected?: boolean;

  /**
   * Callback to be called when the selected state value changes.
   */
  onCardSelect?: (event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent, data: CardOnSelectData) => void;
};

/**
 * State used in rendering Card.
 */
export type CardState = ComponentState<CardSlots> &
  Required<Pick<CardProps, 'appearance' | 'focusMode' | 'orientation' | 'selectable' | 'selected' | 'size'>>;
