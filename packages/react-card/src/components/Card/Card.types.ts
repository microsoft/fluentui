import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface CardCommons {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the cardShorthandProps array below
   * Any property that has a default value should be listed in CardDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Card Props
 */
export interface CardProps extends ComponentProps<CardSlots>, Partial<CardCommons> {}

/**
 * State used in rendering Card
 */
export interface CardState extends ComponentState<CardSlots>, CardCommons {}
