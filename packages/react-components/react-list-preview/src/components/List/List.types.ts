import * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  OnSelectionChangeData,
  Slot,
  SelectionMode,
} from '@fluentui/react-utilities';
import type { UseArrowNavigationGroupOptions } from '@fluentui/react-components';
import { ListSelectionState } from '../../hooks/types';

export enum ListLayout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

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
  onSelectionChange?: (event: React.SyntheticEvent, data: OnSelectionChangeData) => void;
  componentRef: React.Ref<IList>;
};

export type ListContextValue = {
  focusableItems: boolean;
  items: Array<{ id: string | number }>;
  registerItem: (id: string | number, ref: React.RefObject<HTMLElement>) => void;
  deregisterItem: (id: string | number, ref: React.RefObject<HTMLElement>) => void;
  selection: ListSelectionState;
  selectable: boolean;
};

export type ListContextValues = {
  listContext: ListContextValue;
};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots> & Required<Pick<ListProps, 'layout'>> & ListContextValue;
