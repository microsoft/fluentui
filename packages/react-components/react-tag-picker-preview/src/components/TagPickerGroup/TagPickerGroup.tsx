import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerGroup_unstable } from './useTagPickerGroup';
import type { TagPickerGroupProps } from './TagPickerGroup.types';
import { useTagGroupContextValues_unstable } from '@fluentui/react-tags';
import { renderTagPickerGroup_unstable } from './renderTagPickerGroup';
import { useTagPickerGroupStyles_unstable } from './useTagPickerGroupStyles.styles';

/**
 * TagPickerGroup component - TODO: add more docs
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerGroup_unstable(props, ref);

  useTagPickerGroupStyles_unstable(state);
  return renderTagPickerGroup_unstable(state, useTagGroupContextValues_unstable(state));
});

TagPickerGroup.displayName = 'TagPickerGroup';
