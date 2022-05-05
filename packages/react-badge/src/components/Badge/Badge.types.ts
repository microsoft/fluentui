import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BadgeSlots = {
  root: Slot<'div'>;
  icon?: Slot<'span'>;
};

// react has a non-standard `color` attribute in its types
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a4ab0fa432320e70da9e51c8ae2e47377f65804b/types/react/index.d.ts#L1868
export type BadgeProps = Omit<ComponentProps<BadgeSlots>, 'color'> & {
  /**
   * A Badge can be filled, outline, ghost, inverted
   * @defaultvalue filled
   */
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint';

  /**
   * A Badge can be one of preset colors
   * @defaultvalue brand
   */
  color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

  /**
   * A Badge can position the icon before or after the content.
   * @defaultvalue before
   */
  iconPosition?: 'before' | 'after';

  /**
   * A Badge can be square, circular or rounded.
   * @defaultvalue circular
   */
  shape?: 'circular' | 'rounded' | 'square';

  /**
   * A Badge can be on of several preset sizes.
   * @defaultvalue medium
   */
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

export type BadgeState = ComponentState<BadgeSlots> &
  Required<Pick<BadgeProps, 'appearance' | 'color' | 'iconPosition' | 'shape' | 'size'>>;
