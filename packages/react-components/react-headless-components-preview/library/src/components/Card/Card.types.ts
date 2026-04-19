import type {
  CardSlots as CardBaseSlots,
  CardBaseProps,
  CardBaseState,
  CardContextValue as CardBaseContextValue,
  CardOnSelectionChangeEvent as CardBaseOnSelectionChangeEvent,
} from '@fluentui/react-card';

/**
 * Card component slots
 */
export type CardSlots = CardBaseSlots;

/**
 * Card component props
 *
 * Note: `focusMode` is intentionally omitted in the headless package because
 * its tabster groupper-style Tab-trap semantics (limited / limited-trap-focus
 * / unlimited) cannot be expressed with the WICG `focusgroup` polyfill that
 * the headless components rely on. Consumers can implement equivalent
 * behavior themselves on top of the rendered DOM.
 */
export type CardProps = Omit<CardBaseProps, 'focusMode'>;

/**
 * Card component state
 */
export type CardState = CardBaseState;

/**
 * Context value provided by Card to its sub-components.
 */
export type CardContextValue = CardBaseContextValue;

/**
 * Card selected event type.
 */
export type CardOnSelectionChangeEvent = CardBaseOnSelectionChangeEvent;
