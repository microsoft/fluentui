import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagAppearance, TagShape, TagSize } from '../../utils/types';
import { TagAvatarContextValues, UseTagAvatarContextValuesOptions } from '../../utils/useTagAvatarContextValues';

export type TagContextValues = TagAvatarContextValues;

export type TagSlots = {
  root: NonNullable<Slot<'button', 'span'>>;

  /**
   * Slot for an icon or other visual element
   */
  media?: Slot<'span'>;

  icon?: Slot<'span'>;

  /**
   * Main text for the Tag. Children of the root slot are automatically rendered here
   */
  primaryText: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  secondaryText?: Slot<'span'>;

  dismissIcon?: Slot<'span'>;
};

/**
 * Tag Props
 */
export type TagProps<Value = string> = ComponentProps<Partial<TagSlots>> & {
  // TODO add comments with default value

  appearance?: TagAppearance;
  disabled?: boolean;
  dismissible?: boolean;
  shape?: TagShape;
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
