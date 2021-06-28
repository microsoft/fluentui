import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

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
    size?: 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

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
  ref: React.RefObject<HTMLElement>;
}
