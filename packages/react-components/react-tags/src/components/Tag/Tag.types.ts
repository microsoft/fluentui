import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TagContextValues = {
  avatar: {
    size?: AvatarSize;
    shape?: AvatarShape;
  };
};

export type TagSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Slot for an icon or other visual element
   */
  media: Slot<'span'>;

  /**
   * A layout wrapper for the icon slot, the primaryText and secondaryText slots
   */
  content: Slot<'div'>;

  icon: Slot<'span'>;

  /**
   * Main text for the Tag. Children of the root slot are automatically rendered here
   */
  primaryText: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  secondaryText: Slot<'span'>;

  dismissButton: Slot<'button'>;
};

/**
 * Tag Props
 */
export type TagProps = ComponentProps<Partial<TagSlots>> & {
  size?: 'extra-small' | 'small' | 'medium';
  shape?: 'rounded' | 'circular';
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  checked?: boolean;
  dismissable?: boolean;
};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots> &
  Required<
    Pick<TagProps, 'appearance' | 'checked' | 'disabled' | 'dismissable' | 'shape' | 'size'> & {
      avatarSize: AvatarSize | undefined;
      avatarShape: AvatarShape | undefined;
    }
  >;
