import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Badge}
 */
export type BadgeSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

/**
 * {@docCategory Badge}
 */
export type BadgeAppearance = 'filled' | 'outline' | 'ghost' | 'tint';

/**
 * {@docCategory Badge}
 */
export type BadgeShape = 'rounded' | 'square' | 'circular';

/**
 * {@docCategory Badge}
 */
export type BadgeColors =
  | 'brand'
  | 'danger'
  | 'severe'
  | 'warning'
  | 'success'
  | 'important'
  | 'informative'
  | 'subtle';

/**
 * {@docCategory Badge}
 */
export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * A Badge can be sized.
   * @defaultvalue medium
   */
  size?: BadgeSize;

  /**
   * A Badge can be square, circular or rounded
   * @defaultvalue circular
   */
  shape?: BadgeShape;

  /**
   * A Badge can be filled, outline, ghost, inverted
   * @defaultvalue filled
   */
  appearance?: BadgeAppearance;

  /**
   * A Badge has a preset of colors
   * @defaultvalue filled
   */
  color?: BadgeColors;

  /**
   * Icon slot
   */
  icon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Position for Icon to be rendered
   * @defaultvalue before
   */
  iconPosition?: 'before' | 'after';
}

/**
 * {@docCategory Badge}
 */
export interface BadgeState extends BadgeProps {
  /**
   * Ref to the root slot
   */
  ref: React.RefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
}
