import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagProps, TagSize } from '../Tag/Tag.types';

export type TagGroupSlots = {
  root: Slot<'div'>;
};

export type ItemRenderFunction<TItem = TagProps> = (item: TItem) => React.ReactNode;

/**
 * TagGroup Props
 */
export type TagGroupProps<TItem = TagProps> = Omit<ComponentProps<TagGroupSlots>, 'children'> & {
  children: React.ReactNode | ItemRenderFunction<TItem>;
  items?: Array<TItem>;
  onDismiss?: (e: React.MouseEvent | React.KeyboardEvent, dismissedTagIds: string[]) => void;
  size?: TagSize;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'items' | 'size'>> & {
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, id: string) => void;
  };
