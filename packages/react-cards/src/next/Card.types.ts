import * as React from 'react';
import { BaseSlots, SlotProps } from '@fluentui/react-compose';
import { ComponentProps } from '@fluentui/react-utils';
import { ColorTokens, SizeValue } from '@fluentui/react-theme-provider/lib/compat/index';

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * {@docCategory Card}
 */
export type CardProps = ComponentProps &
  React.HTMLAttributes<HTMLDivElement> & {
    /** A card can be compact, without any padding inside. */
    compact?: boolean;

    /** A card will used horizontal layout. */
    horizontal?: boolean;

    /** Centers content in a card. */
    centered?: boolean;

    /** A card can be sized. */
    size?: SizeValue;

    /** A card can take up the width and height of its container. */
    block?: boolean;

    /** A card can show that it cannot be interacted with. */
    disabled?: boolean;

    /** A card can be hiding part of the content and expand on hover/focus. */
    expandable?: boolean;

    /** A card can have elevation styles. */
    // TODO: Should we remove? It's not accounted for in design spec and a card is elevated by default.
    // elevated?: boolean;

    /** A card can have inverted background styles. */
    inverted?: boolean;

    /** A card can have ghost styles. */
    ghost?: boolean;

    /** A card can show that it is currently selected or not. */
    // TODO: This should probably have a `defaultSelected` property at the same time.
    selected?: boolean;
  };

/**
 * {@docCategory Card}
 */
export interface CardState extends CardProps {
  ref: React.RefObject<HTMLDivElement>;
}

/**
 * {@docCategory Card}
 */
export interface CardSlots extends BaseSlots {}

/**
 * {@docCategory Card}
 */
export type CardSlotProps = SlotProps<CardSlots, CardProps, React.HTMLAttributes<HTMLDivElement>>;

type SizeRelatedTokens = {
  borderRadius?: string;
  height?: string;
  margin?: string;
  padding?: string;
  width?: string;
};

type StateChangeRelatedTokens = {
  borderWidth?: string;
  boxShadow?: string;
  cursor?: string;
};

/**
 * {@docCategory Card}
 */
export type CardTokens = ColorTokens &
  SizeRelatedTokens &
  StateChangeRelatedTokens & {
    borderStyle?: string;
    minHeight?: string;
    minWidth?: string;

    /* sizing */
    size?: {
      smallest?: SizeRelatedTokens;
      smaller?: SizeRelatedTokens;
      small?: SizeRelatedTokens;
      medium?: SizeRelatedTokens;
      large?: SizeRelatedTokens;
      larger?: SizeRelatedTokens;
      largest?: SizeRelatedTokens;
    };

    disabled?: StateChangeRelatedTokens;
    hovered?: StateChangeRelatedTokens;
    pressed?: StateChangeRelatedTokens;
    selected?: StateChangeRelatedTokens;
  };

/**
 * {@docCategory Card}
 */
export type CardVariants<TTokens = CardTokens> = {
  root?: TTokens;
  onClick?: TTokens;
  compact?: TTokens;
  block?: TTokens;
};
