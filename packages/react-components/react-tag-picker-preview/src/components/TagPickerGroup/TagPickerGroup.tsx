import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerGroup } from './useTagPickerGroup';
import type { TagPickerGroupProps } from './TagPickerGroup.types';
import { useTagGroupContextValues } from '@fluentui/react-tags';
import { renderTagPickerGroup } from './renderTagPickerGroup';
import { useTagPickerGroupStyles } from './useTagPickerGroupStyles.styles';

/**
 * TagPickerGroup component - TODO: add more docs
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerGroup(props, ref);

  useTagPickerGroupStyles(state);
  return renderTagPickerGroup(state, useTagGroupContextValues(state));
});

TagPickerGroup.displayName = 'TagPickerGroup';
