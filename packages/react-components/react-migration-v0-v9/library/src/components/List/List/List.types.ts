import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, SelectionMode, SelectionItemId } from '@fluentui/react-utilities';
import type { ListSelectionState } from '../hooks/types';

type ListLayout = 'horizontal' | 'vertical' | 'grid';

export type ListSlots = {
  root: NonNullable<Slot<'ul', 'div' | 'ol'>>;
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  /**
   * Defines the layout orientation.
   *
   * @default vertical
   */
  layout?: ListLayout;

  /**
   * Defines if the list should be navigable. Set this to true when adding an `onClick` handler.
   *
   * @default false
   */
  navigable?: boolean;

  /**
   * Defines if the List items should be selectable.
   *
   * @default false
   */
  selectable?: boolean;

  /**
   * Defines selection mode for the List.
   *
   * @default single
   */
  selectionMode?: SelectionMode;

  /**
   * For controlled selection - defines selected items
   */
  selectedItems?: SelectionItemId[];

  /**
   * For uncontrolled selection - defines default selected items
   */
  defaultSelectedItems?: SelectionItemId[];

  /**
   * Callback for selection change events, used for both controlled and uncontrolled (as notification)
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onSelectionChange?: (event: React.SyntheticEvent, data: { selectedItems: SelectionItemId[] }) => void;

  /**
   * Truncates header
   *
   * @default false
   */
  truncateHeader?: boolean;

  /**
   * Truncates content
   *
   * @default false
   */
  truncateContent?: boolean;
};

export type ListContextValue = {
  navigable: boolean;
  selection?: ListSelectionState;
  as?: 'div' | 'ol' | 'ul';
  truncateHeader?: ListProps['truncateHeader'];
  truncateContent?: ListProps['truncateContent'];
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & Required<Pick<ListProps, 'layout'>> & ListContextValue;
