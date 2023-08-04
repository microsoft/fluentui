import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagSize } from '../../utils/types';
import { TagGroupContextValue } from '../../contexts/TagGroupContext';

export type TagGroupContextValues = {
  tagGroup: TagGroupContextValue;
};

export type TagGroupSlots = {
  root: Slot<'div'>;
};

export type TagGroupDismissData = {
  dismissedTagValue: string;
};

/**
 * TagGroup Props
 */
export type TagGroupProps = ComponentProps<TagGroupSlots> & {
  /**
   * Callback for when a tag is dismissed
   */
  onDismiss?: (e: React.MouseEvent | React.KeyboardEvent, data: TagGroupDismissData) => void;

  size?: TagSize;
};

/**
 * State used in rendering TagGroup
 */
export type TagGroupState<Value = string> = ComponentState<TagGroupSlots> &
  Required<Pick<TagGroupProps, 'size'>> & {
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, value: Value) => void;
  };
