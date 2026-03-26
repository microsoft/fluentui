import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarSize } from '@fluentui/react-avatar';
import { TableContextValue } from '../Table/Table.types';

export type TableCellLayoutContextValues = {
  avatar: {
    size?: AvatarSize;
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
  content: Slot<'div'>;
};

/**
 * TableCellLayout Props
 */
export type TableCellLayoutProps = Omit<ComponentProps<Partial<TableCellLayoutSlots>>, 'content'> &
  Pick<Partial<TableCellLayoutSlots>, 'content'> & {
    /**
     * Renders design variants of the table cell
     * @default undefined
     */
    appearance?: 'primary';

    /**
     * Renders content with overflow: hidden and text-overflow: ellipsis
     */
    truncate?: boolean;
  };

/**
 * State used in rendering TableCellLayout
 */
export type TableCellLayoutState = ComponentState<TableCellLayoutSlots> &
  Pick<TableCellLayoutProps, 'appearance' | 'truncate'> & { avatarSize: AvatarSize | undefined } & Pick<
    TableContextValue,
    'size'
  >;
