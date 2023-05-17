import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagProps, TagSize } from '../Tag/Tag.types';
import { TagGroupContextValue } from '../../contexts/TagGroupContext';

export type TagGroupContextValues = {
  tagGroup: TagGroupContextValue;
};

export type TagGroupSlots = {
  root: Slot<'div'>;
};

export type ItemRenderFunction<TItem = TagProps> = (item: TItem) => React.ReactNode;

export type TagGroupDismissData = {
  dismissedTagId: string;
};

/**
 * TagGroup Props
 */
export type TagGroupProps<TItem = TagProps> = Omit<ComponentProps<TagGroupSlots>, 'children'> & {
  /**
   * Children tags or render function for tag items
   */
  children: React.ReactNode | ItemRenderFunction<TItem>;

  /**
   * tag items to be rendered in the group
   */
  items?: Array<TItem>;

  /**
   * Callback for when a tag is dismissed
   */
  onDismiss?: (e: React.MouseEvent | React.KeyboardEvent, data: TagGroupDismissData) => void;

  size?: TagSize;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'items' | 'size'>> & {
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, id: string) => void;
  };
