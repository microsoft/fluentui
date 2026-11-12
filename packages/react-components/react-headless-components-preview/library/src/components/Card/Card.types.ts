import type { CardBaseState } from '@fluentui/react-card';

export type {
  CardBaseProps as CardProps,
  CardSlots,
  CardContextValue,
  CardOnSelectionChangeEvent,
} from '@fluentui/react-card';

/**
 * Card component state
 */
export type CardState = CardBaseState & {
  root: {
    'data-selected'?: string;
    'data-disabled'?: string;
  };
};
