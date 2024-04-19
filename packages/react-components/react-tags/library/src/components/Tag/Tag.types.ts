import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagAppearance, TagShape, TagSize } from '../../utils/types';
import { TagAvatarContextValues, UseTagAvatarContextValuesOptions } from '../../utils/useTagAvatarContextValues';

export type TagContextValues = TagAvatarContextValues;

export type TagSlots = {
  root: NonNullable<Slot<'button', 'span'>>;

  /**
   * Slot for a visual element, usually an avatar
   */
  media?: Slot<'span'>;

  /**
   * Slot for an icon
   */
  icon?: Slot<'span'>;

  /**
   * Main text for the Tag. Children of the root slot are automatically rendered here
   */
  primaryText: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  secondaryText?: Slot<'span'>;

  /**
   * Slot for the dismiss icon
   */
  dismissIcon?: Slot<'span'>;
};

/**
 * Tag Props
 */
export type TagProps<Value = string> = ComponentProps<Partial<TagSlots>> & {
  /**
   * A Tag can have filled, outlined or brand experience.
   *
   * @default 'filled'
   */
  appearance?: TagAppearance;

  /**
   * A Tag can show that it cannot be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * A Tag can be dismissible
   *
   * @default false
   */
  dismissible?: boolean;

  /**
   * A Tag can have rounded or circular shape.
   *
   * @default 'round'
   */
  shape?: TagShape;

  /**
   * A Tag has three sizes.
   *
   * @default 'medium'
   */
  size?: TagSize;

  /**
   * Unique value identifying the tag within a TagGroup
   */
  value?: Value;
};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots> &
  Required<Pick<TagProps, 'appearance' | 'disabled' | 'dismissible' | 'shape' | 'size'>> &
  UseTagAvatarContextValuesOptions;
