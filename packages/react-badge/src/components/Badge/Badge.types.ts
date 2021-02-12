import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utils';
import { SizeValue } from '@fluentui/react-theme';

/**
 * {@docCategory Badge\}
 */
export type BadgeStatus =
  | 'success'
  | 'warning'
  | 'severe'
  | 'accent'
  | 'danger'
  | 'important'
  | 'informative'
  | 'subtle';

/**
 * {@docCategory Badge\}
 */
export type BadgeVariant = 'filled' | 'outline' | 'ghost' | 'inverted' | 'tint';

/**
 * {@docCategory Badge\}
 */
export type BadgeShape = 'rounded' | 'square' | 'circular';

/**
 * {@docCategory Badge\}
 */
export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * A Badge can be sized.
   */
  size?: SizeValue;

  /**
   * A Badge can have status styles variants
   */
  status?: BadgeStatus;

  /**
   * A Badge can have different colors.
   */
  color?: string;

  /**
   * A Badge can be square, circular or rounded
   */
  shape?: BadgeShape;

  /**
   * A Badge can be filled, outline, ghost, inverted
   */
  variant?: BadgeVariant;

  /**
   * Icon slot
   */
  icon?: ShorthandProps<HTMLElement>;

  /**
   * Position for Icon to be rendered
   */
  iconPosition?: 'before' | 'after';
}

/**
 * {@docCategory Badge\}
 */
export interface BadgeState extends BadgeProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<HTMLSpanElement>;
}
