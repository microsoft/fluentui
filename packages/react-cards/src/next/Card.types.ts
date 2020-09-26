import * as React from 'react';
import { BaseSlots, SlotProps } from '@fluentui/react-compose';
import { ComponentProps } from '@fluentui/react-compose/lib/next/index';
import { ColorTokenSet, SizeValue } from '@fluentui/theme';

/* eslint-disable @typescript-eslint/naming-convention */

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
    fluid?: boolean;

    /** A card can show that it cannot be interacted with. */
    disabled?: boolean;

    /** A card can be hiding part of the content and expand on hover/focus. */
    expandable?: boolean;

    /** A card can have elevation styles. */
    // TODO: Should we remove? It's not accounted for in design spec and a card is elevated by default.
    // elevated?: boolean;

    /** A card can have inverted background styles. */
    inverted?: boolean;

    /** A card can have quiet styles. */
    // TODO: Is this the correct name? Appears as ghost in design spec.
    quiet?: boolean;

    /** A card can show that it is currently selected or not. */
    // TODO: This should probably have a `defaultSelected` property at the same time.
    selected?: boolean;
  };

export interface CardState extends CardProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

export interface CardSlots extends BaseSlots {}

export type CardSlotProps = SlotProps<CardSlots, CardProps, React.HTMLAttributes<HTMLDivElement>>;

export type CardTokens = ColorTokenSet & {};
