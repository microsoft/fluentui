'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerGroupContextValues } from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerGroupProps } from './TagPickerGroup.types';
import { renderTagPickerGroup } from './renderTagPickerGroup';
import { useTagPickerGroup } from './useTagPickerGroup';
import { useTagPickerGroupStyles } from './useTagPickerGroupStyles.styles';

export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerGroup(props, ref);
  const contextValues = useTagPickerGroupContextValues(state);
  useTagPickerGroupStyles(state);
  return renderTagPickerGroup(state, contextValues);
});

TagPickerGroup.displayName = 'TagPickerGroup';
