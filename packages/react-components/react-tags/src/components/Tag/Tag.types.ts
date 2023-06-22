import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagSize = 'extra-small' | 'small' | 'medium';

export type TagContextValues = {
  avatar: {
    size?: AvatarSize;
    shape?: AvatarShape;
  };
};

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
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  dismissible?: boolean;
  shape?: 'rounded' | 'circular';
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
  Required<
    Pick<TagProps, 'appearance' | 'disabled' | 'dismissible' | 'shape' | 'size'> & {
      avatarSize: AvatarSize | undefined;
      avatarShape: AvatarShape | undefined;
    }
  >;
