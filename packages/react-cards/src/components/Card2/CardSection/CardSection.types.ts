import * as React from 'react';
import { BaseSlots, ComponentProps, SlotProps } from '@fluentui/react-compose';
import { ColorTokenSet } from '@fluentui/theme';

/* eslint-disable @typescript-eslint/naming-convention */

export interface CardSectionProps extends ComponentProps, React.HTMLAttributes<HTMLDivElement> {
  /** A card section can be fitted, without any space above or below it. */
  fitted?: boolean;
}

export interface CardSectionState extends CardSectionProps {}

export interface CardSectionSlots extends BaseSlots {}

export type CardSectionSlotProps = SlotProps<CardSectionSlots, CardSectionProps, React.HTMLAttributes<HTMLDivElement>>;

export type CardSectionTokens = ColorTokenSet & {};
