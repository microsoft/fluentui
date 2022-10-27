import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarSizes } from '@fluentui/react-avatar';

export type TableCellLayoutContextValues = {
  avatar: {
    size?: AvatarSizes;
  };
};

export type TableCellLayoutSlots = {
  root: Slot<'div'>;

  /**
   * Slot for an icon or other visual element
   */
  media: Slot<'span'>;

  /**
   * Main text for the table cell. Children of the root slot are automatically rendered here
   */
  main: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  description: Slot<'span'>;

  /**
   * A layout wrapper for the main and description slots
   */
  wrapper: Slot<'div'>;
};

/**
 * TableCellLayout Props
 */
export type TableCellLayoutProps = ComponentProps<Partial<TableCellLayoutSlots>> & {
  appearance?: 'primary';
};

/**
 * State used in rendering TableCellLayout
 */
export type TableCellLayoutState = ComponentState<TableCellLayoutSlots> &
  Pick<TableCellLayoutProps, 'appearance'> & { avatarSize: AvatarSizes | undefined };
