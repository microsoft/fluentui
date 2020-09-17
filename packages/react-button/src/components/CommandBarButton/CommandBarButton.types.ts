import * as React from 'react';
import { SlotProps } from '@fluentui/react-compose';
import { ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonSlots } from '../Button/Button.types';

export interface CommandBarButtonProps extends ButtonProps {
  /**
   * Prop that
   */
  secondaryContent?: ShorthandProps;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandProps;
}

export interface CommandBarButtonState extends CommandBarButtonProps {}

export interface CommandBarButtonSlots extends ButtonSlots {
  secondaryContent?: React.ElementType;
  contentContainer?: React.ElementType;
}

export type CompoundButtonSlotProps = SlotProps<
  CommandBarButtonSlots,
  CommandBarButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
