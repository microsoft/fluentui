import * as React from 'react';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type BadgeSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
};

export type BadgeCommons = {
  /**
   * A Badge can be filled, outline, ghost, inverted
   * @defaultvalue filled
   */
  appearance: 'filled' | 'ghost' | 'outline' | 'tint';

  /**
   * A Badge can be one of preset colors
   * @defaultvalue brand
   */
  color: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

  /**
   * A Badge can position the icon before or after the content.
   * @defaultvalue before
   */
  iconPosition: 'before' | 'after';

  /**
   * A Badge can be square, circular or rounded.
   * @defaultvalue circular
   */
  shape: 'circular' | 'rounded' | 'square';

  /**
   * A Badge can be on of several preset sizes.
   * @defaultvalue medium
   */
  size: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

export type BadgeProps = ComponentProps<Partial<BadgeSlots>> & Partial<BadgeCommons>;
export type BadgeState = ComponentState<BadgeSlots> & BadgeCommons;
