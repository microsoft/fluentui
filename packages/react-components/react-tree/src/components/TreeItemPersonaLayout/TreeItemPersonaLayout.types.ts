import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarContextValue, AvatarSize } from '@fluentui/react-avatar';

export type TreeItemPersonaLayoutContextValues = {
  avatar: AvatarContextValue;
};

export type TreeItemPersonaLayoutSlots = {
  root: NonNullable<Slot<'div'>>;
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'div'>;
  /**
   * Avatar to display.
   */
  media: NonNullable<Slot<'div'>>;
  /**
   * Main text. Children of the root slot are automatically rendered here
   */
  main: NonNullable<Slot<'div'>>;
  /**
   * Secondary text that describes or complements the main text
   */
  description?: Slot<'div'>;
  /**
   * A layout wrapper for the main and description slots
   */
  content: NonNullable<Slot<'div'>>;
};

/**
 * TreeItemPersonaLayout Props
 */
export type TreeItemPersonaLayoutProps = ComponentProps<Partial<TreeItemPersonaLayoutSlots>>;

/**
 * State used in rendering TreeItemPersonaLayout
 */
export type TreeItemPersonaLayoutState = ComponentState<TreeItemPersonaLayoutSlots> & {
  avatarSize: AvatarSize;
};
