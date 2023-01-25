import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarContextValue, AvatarSize } from '@fluentui/react-avatar';
import type { TreeItemContextValue } from '../../contexts/treeItemContext';

export type TreeItemPersonaLayoutContextValues = {
  avatar: AvatarContextValue;
};

export type TreeItemPersonaLayoutSlots = {
  root: Slot<'span'>;
  /**
   * Avatar to display.
   */
  media: NonNullable<Slot<'span'>>;
  /**
   * Main text. Children of the root slot are automatically rendered here
   */
  main: Slot<'span'>;
  /**
   * Secondary text that describes or complements the main text
   */
  description?: Slot<'span'>;
  /**
   * aside text that works as extra textual information
   */
  aside?: Slot<'span'>;
  /**
   * A layout wrapper for the main and description slots
   */
  content: Slot<'div'>;
};

/**
 * TreeItemPersonaLayout Props
 */
export type TreeItemPersonaLayoutProps = ComponentProps<Partial<TreeItemPersonaLayoutSlots>>;

/**
 * State used in rendering TreeItemPersonaLayout
 */
export type TreeItemPersonaLayoutState = ComponentState<TreeItemPersonaLayoutSlots> &
  TreeItemContextValue & {
    avatarSize: AvatarSize;
  };
