import * as React from 'react';
import type { ComponentPropsCompat, ShorthandPropsCompat, ObjectShorthandPropsCompat } from '@fluentui/react-utilities';

export type BadgeSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type BadgeAppearance = 'filled' | 'outline' | 'ghost' | 'tint';

export type BadgeShape = 'rounded' | 'square' | 'circular';

export type BadgeColors =
  | 'brand'
  | 'danger'
  | 'severe'
  | 'warning'
  | 'success'
  | 'important'
  | 'informative'
  | 'subtle';

export interface BadgeProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
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
  icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Position for Icon to be rendered
   * @defaultvalue before
   */
  iconPosition?: 'before' | 'after';
}

export interface BadgeState extends BadgeProps {
  /**
   * Ref to the root slot
   */
  ref: React.RefObject<HTMLElement>;
  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLSpanElement>>;
}
