import type {
  CardProps as CardBaseProps,
  CardState as CardBaseState,
} from '@fluentui/react-headless-components-preview/card';
export type {
  CardContextValue,
  CardOnSelectionChangeEvent,
  CardSlots,
} from '@fluentui/react-headless-components-preview/card';

export type CardProps = CardBaseProps & {
  /** @default 'filled' */
  appearance?: 'filled' | 'filled-alternative' | 'outline' | 'subtle';
  /** @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type CardState = CardBaseState & {
  appearance: NonNullable<CardProps['appearance']>;
  orientation: NonNullable<CardProps['orientation']>;
  size: NonNullable<CardProps['size']>;
  root: CardBaseState['root'] & {
    'data-appearance': NonNullable<CardProps['appearance']>;
    'data-has-floating-action'?: '';
    'data-interactive'?: '';
    'data-orientation': NonNullable<CardProps['orientation']>;
    'data-select-focused'?: '';
    'data-selectable'?: '';
    'data-size': NonNullable<CardProps['size']>;
  };
};
