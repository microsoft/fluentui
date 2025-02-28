import type { ComponentProps, ComponentState, Slot, EventHandler } from '@fluentui/react-utilities';
import {
  TagSize,
  TagValue,
  TagDismissHandler,
  TagAppearance,
  TagSelectHandler,
  TagSelectData,
} from '../../utils/types';
import { TagGroupContextValue } from '../../contexts/tagGroupContext';
import * as React from 'react';

export type TagGroupContextValues = {
  tagGroup: TagGroupContextValue;
};

export type TagGroupSlots = {
  root: Slot<'div'>;
};

/**
 * TagGroup Props
 */
export type TagGroupProps<Value = TagValue> = Omit<ComponentProps<TagGroupSlots>, 'onSelect'> & {
  /**
   * Callback for when a tag is dismissed
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onDismiss?: TagDismissHandler<Value>;

  /**
   * A TagGroup can show that it cannot be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  size?: TagSize;
  appearance?: TagAppearance;
  dismissible?: boolean;

  /**
   * Callback for when a tag is selected
   */
  onSelect?: EventHandler<TagSelectData<Value>>;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState<Value = TagValue> = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'disabled' | 'size' | 'appearance' | 'dismissible'>> & {
    handleTagDismiss: TagDismissHandler<Value>;
    handleTagSelect?: TagSelectHandler<Value>;
    role?: React.AriaRole;
    selectedValues: Value[];
  };
