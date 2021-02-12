import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utils';
import { SizeValue } from '@fluentui/react-theme-provider/lib/compat/index';

export type BadgeStatus =
  | 'success'
  | 'warning'
  | 'severe'
  | 'accent'
  | 'danger'
  | 'important'
  | 'informative'
  | 'subtle';

export type BadgeVariant = 'filled' | 'outline' | 'ghost' | 'inverted' | 'tint';

export type BadgeShape = 'rounded' | 'square' | 'circular';

export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** A Badge can be sized. */
  size?: SizeValue;

  /** A Badge can have status styles variants */
  status?: BadgeStatus;

  /** A Badge can have different colors. */
  color?: string;

  /** A Badge can be square, circular or rounded */
  shape?: BadgeShape;

  /** A Badge can be filled, outline, ghost, inverted */
  variant?: BadgeVariant;

  /**
   * Icon slot
   */
  icon?: ShorthandProps<HTMLElement>;

  iconPosition?: 'before' | 'after';
}

export interface BadgeState extends BadgeProps {
  ref: React.MutableRefObject<HTMLElement>;
  icon?: ObjectShorthandProps<HTMLSpanElement>;
}
