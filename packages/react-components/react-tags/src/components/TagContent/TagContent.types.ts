import { AvatarShape, AvatarSize } from '@fluentui/react-avatar';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagContextValue } from '../Tag/index';

export type TagContentContextValues = {
  avatar: {
    shape: AvatarShape;
    size: AvatarSize;
  };
};

export type TagContentSlots = {
  root: Slot<'div', 'button'>;

  /**
   * Slot for an visual element, usually an Avatar
   */
  media: Slot<'span'>;

  /**
   * Slot for an icon
   */
  icon: Slot<'span'>;

  /**
   * Main text for the Tag. Children of the root slot are automatically rendered here
   */
  primaryText: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  secondaryText: Slot<'span'>;
};

/**
 * TagContent Props
 */
export type TagContentProps = ComponentProps<Partial<TagContentSlots>>;

/**
 * State used in rendering TagContent
 */
export type TagContentState = ComponentState<TagContentSlots> &
  Required<
    Pick<TagContextValue, 'dismissable' | 'shape' | 'interactive'> & {
      avatarSize: AvatarSize;
      avatarShape: AvatarShape;
    }
  >;
