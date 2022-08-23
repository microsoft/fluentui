import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Card refs to the root element slot.
 */

export type CardRefElement = HTMLDivElement | HTMLButtonElement | HTMLAnchorElement;

/**
 * Card selected event type
 *
 * This event is fired when a selectable card changes its selection state.
 */

export type CardOnSelectEvent = React.MouseEvent | React.KeyboardEvent | React.ChangeEvent;

/**
 * Slots available in the Card component.
 */
export type CardSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div', 'a' | 'button'>;

  /**
   * Select element represents a checkbox.
   */
  select?: Slot<'div'>;
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
  onCardSelect?: (event: CardOnSelectEvent, selected: boolean) => void;
};

/**
 * State used in rendering Card.
 */
export type CardState = ComponentState<CardSlots> &
  Required<
    Pick<CardProps, 'appearance' | 'orientation' | 'size'> & {
      /**
       * Represents a card that contains interactive events (MouseEvents) or is a button/a tag.
       *
       * @default false
       */
      isInteractive: boolean;

      /**
       * Represents a selectable card.
       *
       * @default false
       */
      isSelectable: boolean;

      /**
       * Represents a selectable card that contains a slot for the select element.
       *
       * @default false
       */
      hasSelectSlot: boolean;

      /**
       * Defines whether the card is currently selected.
       *
       * @default false
       */
      isCardSelected: boolean;
    }
  >;
