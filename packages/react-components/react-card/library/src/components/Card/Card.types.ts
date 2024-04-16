import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Card selected event type
 *
 * This event is fired when a selectable card changes its selection state.
 */
export type CardOnSelectionChangeEvent = React.MouseEvent | React.KeyboardEvent | React.ChangeEvent;

/**
 * Data sent from the selection events on a selectable card.
 */
export type CardOnSelectData = {
  selected: boolean;
};

/**
 * Data shared between card components
 */
export interface CardContextValue {
  selectableA11yProps: {
    referenceId?: string;
    setReferenceId: (referenceId: string) => void;
    referenceLabel?: string;
    setReferenceLabel: (referenceLabel: string) => void;
  };
}

/**
 * Slots available in the Card component.
 */
export type CardSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Floating action that can be rendered on the top-right of a card. Often used together with
   * `selected`, `defaultSelected`, and `onSelectionChange` props
   */
  floatingAction?: Slot<'div'>;

  /**
   * The internal checkbox element that renders when the card is selectable.
   */
  checkbox?: Slot<'input'>;
};

/**
 * Card component props.
 */
export type CardProps = ComponentProps<CardSlots> & {
  /**
   * Sets the appearance of the card.
   *
   * `filled`
   * The card will have a shadow, border and background color.
   *
   * `filled-alternative`
   * This appearance is similar to `filled`, but the background color will be a little darker.
   *
   * `outline`
   * This appearance is similar to `filled`, but the background color will be transparent and no shadow applied.
   *
   * `subtle`
   * This appearance is similar to `filled-alternative`, but no border is applied.
   *
   * @default 'filled'
   */
  appearance?: 'filled' | 'filled-alternative' | 'outline' | 'subtle';

  /**
   * Sets the focus behavior for the card.
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
   * Defines whether the card is initially in a selected state when rendered.
   *
   * @default false
   */
  defaultSelected?: boolean;

  /**
   * Callback to be called when the selected state value changes.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onSelectionChange?: (event: CardOnSelectionChangeEvent, data: CardOnSelectData) => void;
};

/**
 * State used in rendering Card.
 */
export type CardState = ComponentState<CardSlots> &
  CardContextValue &
  Required<
    Pick<CardProps, 'appearance' | 'orientation' | 'size'> & {
      /**
       * Represents a card that contains interactive events (MouseEvents) or is a button/a tag.
       *
       * @default false
       */
      interactive: boolean;

      /**
       * Represents a selectable card.
       *
       * @default false
       */
      selectable: boolean;

      /**
       * Defines whether the card is currently selected.
       *
       * @default false
       */
      selected: boolean;

      /**
       * Defines whether the card internal checkbox is currently focused.
       *
       * @default false
       */
      selectFocused: boolean;
    }
  >;
