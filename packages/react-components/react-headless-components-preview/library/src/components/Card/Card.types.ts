import type { CardBaseProps, CardBaseState } from '@fluentui/react-card';

export type { CardSlots, CardContextValue, CardOnSelectionChangeEvent } from '@fluentui/react-card';

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
export type CardState = CardBaseState & {
  root: {
    /**
     * Present when selected; omitted otherwise.
     */
    'data-selected'?: string;
    'data-disabled'?: string;
  };
};
