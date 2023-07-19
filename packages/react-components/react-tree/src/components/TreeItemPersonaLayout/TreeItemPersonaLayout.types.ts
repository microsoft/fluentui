import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarContextValue, AvatarSize } from '@fluentui/react-avatar';
import { ButtonContextValue } from '@fluentui/react-button';
import { TreeItemSlots } from '../TreeItem/TreeItem.types';

export type TreeItemPersonaLayoutContextValues = {
  avatar: AvatarContextValue;
};

export type TreeItemPersonaLayoutSlots = {
  root: NonNullable<Slot<'div'>>;
  /**
   * Avatar to display.
   */
  media: NonNullable<Slot<'div'>>;
  /**
   * Content. Children of the root slot are automatically rendered here
   */
  content: NonNullable<Slot<'div'>>;
  /**
   * Secondary text that describes or complements the content
   */
  description?: Slot<'div'>;
};

export type TreeItemPersonaLayoutInternalSlots = TreeItemPersonaLayoutSlots &
  Pick<TreeItemSlots, 'actions' | 'aside' | 'expandIcon'>;

/**
 * TreeItemPersonaLayout Props
 */
export type TreeItemPersonaLayoutProps = ComponentProps<Partial<TreeItemPersonaLayoutSlots>>;

/**
 * State used in rendering TreeItemPersonaLayout
 */
export type TreeItemPersonaLayoutState = ComponentState<TreeItemPersonaLayoutInternalSlots> & {
  avatarSize: AvatarSize;
  buttonContextValue: ButtonContextValue;
};
