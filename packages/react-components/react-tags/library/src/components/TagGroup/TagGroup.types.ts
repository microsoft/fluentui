import type { ComponentProps, ComponentState, Slot, EventHandler } from '@fluentui/react-utilities';
import type {
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
export type TagGroupProps<Value = TagValue> = ComponentProps<TagGroupSlots> & {
  /**
   * Callback for when a tag is dismissed
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onDismiss?: TagDismissHandler<Value>;

  /**
   * Sets selected values for an uncontrolled component.
   */
  defaultSelectedValues?: Value[];

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
  onTagSelect?: EventHandler<TagSelectData<Value>>;

  /**
   * Values of the selected tags
   */
  selectedValues?: Value[];
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState<Value = TagValue> = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'appearance' | 'dismissible' | 'disabled' | 'size' | 'selectedValues'>> & {
    handleTagDismiss: TagDismissHandler<Value>;
    handleTagSelect?: TagSelectHandler<Value>;
    role?: React.AriaRole;
  };
