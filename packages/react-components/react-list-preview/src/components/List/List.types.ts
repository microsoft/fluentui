import * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  OnSelectionChangeData,
  Slot,
  SelectionMode,
  SelectionItemId,
} from '@fluentui/react-utilities';
import type { UseArrowNavigationGroupOptions } from '@fluentui/react-components';
import { ListSelectionState } from '../../hooks/types';

export type ListLayout = 'horizontal' | 'vertical' | 'grid';

// Component ref interface
export type IList = {
  selection: ListState['selection'];
};

export type ListSlots = {
  root: NonNullable<Slot<'ul', 'div' | 'ol' | 'dl'>>;
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {
  layout?: ListLayout;
  customArrowNavigationOptions?: Partial<UseArrowNavigationGroupOptions>;
  focusableItems?: boolean;
  selectable?: boolean;
  selectionMode?: SelectionMode;
  defaultSelectedItems?: SelectionItemId[];
  onSelectionChange?: (event: React.SyntheticEvent, data: OnSelectionChangeData) => void;
  componentRef?: React.Ref<IList>;
};

export type ListContextValue = {
  focusableItems: boolean;
  items: Array<{ id: string | number }>;
  selection?: ListSelectionState;
  registerItem?: (id: string | number, ref: React.RefObject<HTMLElement>) => void;
  deregisterItem?: (id: string | number, ref: React.RefObject<HTMLElement>) => void;
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & Required<Pick<ListProps, 'layout'>> & ListContextValue;
