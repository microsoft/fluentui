import * as React from 'react';
import { SlotProps } from '@fluentui/react-compose';
import { ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonSlots } from '../Button/Button.types';

export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryText?: ShorthandProps;

  /**
   * Container that wraps the children and secondaryText slots.
   */
  contentWrapper?: ShorthandProps;
}

export interface CompoundButtonState extends CompoundButtonProps {}

export interface CompoundButtonSlots extends ButtonSlots {
  secondaryText?: React.ElementType;
  contentWrapper?: React.ElementType;
}

export type CompoundButtonSlotProps = SlotProps<
  CompoundButtonSlots,
  CompoundButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
