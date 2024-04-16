import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagSize, TagValue, TagDismissHandler, TagAppearance } from '../../utils/types';
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
export type TagGroupProps<Value = TagValue> = ComponentProps<TagGroupSlots> & {
  /**
   * Callback for when a tag is dismissed
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onDismiss?: TagDismissHandler<Value>;

  size?: TagSize;
  appearance?: TagAppearance;
  dismissible?: boolean;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState<Value = TagValue> = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'size' | 'appearance' | 'dismissible'>> & {
    handleTagDismiss: TagDismissHandler<Value>;
    role?: React.AriaRole;
  };
