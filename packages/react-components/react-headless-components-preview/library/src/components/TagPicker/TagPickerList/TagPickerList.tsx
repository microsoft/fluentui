'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerList } from './useTagPickerList';
import { renderTagPickerList } from './renderTagPickerList';
import type { TagPickerListProps } from './TagPickerList.types';

/**
 * The popover list of selectable options for a TagPicker. Holds `Option` and `OptionGroup`
 * children.
 */
export const TagPickerList: ForwardRefComponent<TagPickerListProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerList(props, ref);

  return renderTagPickerList(state);
});

TagPickerList.displayName = 'TagPickerList';
