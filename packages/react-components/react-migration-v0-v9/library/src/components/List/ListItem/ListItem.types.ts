import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ItemLayout } from '../../ItemLayout';

export type ListItemSlots = {
  root: NonNullable<Slot<'li', 'div'>>;
  media?: React.ComponentProps<typeof ItemLayout>['startMedia'];
  header?: React.ComponentProps<typeof ItemLayout>['header'];
  contentWrapper?: React.ComponentProps<typeof ItemLayout>['contentWrapper'];
  headerMedia?: React.ComponentProps<typeof ItemLayout>['headerMedia'];
  contentMedia?: React.ComponentProps<typeof ItemLayout>['contentMedia'];
  endMedia?: React.ComponentProps<typeof ItemLayout>['endMedia'];
};

/**
 * ListItem Props
 */
export type ListItemProps = ComponentProps<ListItemSlots> & {
  value?: string | number;
  truncateHeader?: boolean;
  truncateContent?: boolean;
};

/**
 * State used in rendering ListItem
 */
export type ListItemState = ComponentState<ListItemSlots> & {
  selectable?: boolean;
  selected?: boolean;
  navigable?: boolean;
  truncateHeader?: boolean;
  truncateContent?: boolean;
};
