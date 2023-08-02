import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarContextValue, AvatarSize } from '@fluentui/react-avatar';
import { ButtonContextValue } from '@fluentui/react-button';
import { TreeItemLayoutSlots } from '../TreeItemLayout/TreeItemLayout.types';

export type TreeItemPersonaLayoutContextValues = {
  avatar: AvatarContextValue;
};

export type TreeItemPersonaLayoutSlots = Pick<TreeItemLayoutSlots, 'actions' | 'aside' | 'expandIcon' | 'selector'> & {
  root: NonNullable<Slot<'div'>>;
  /**
   * Avatar to display.
   */
  media: NonNullable<Slot<'div'>>;
  /**
   * Content. Children of the root slot are automatically rendered here
   */
  main: NonNullable<Slot<'div'>>;
  /**
   * Secondary text that describes or complements the content
   */
  description?: Slot<'div'>;
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
  buttonContextValue: ButtonContextValue;
};
