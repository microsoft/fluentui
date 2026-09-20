'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerListProps } from './TagPickerList.types';
import { renderTagPickerList } from './renderTagPickerList';
import { useTagPickerList } from './useTagPickerList';
import { useTagPickerListStyles } from './useTagPickerListStyles.styles';

export const TagPickerList: ForwardRefComponent<TagPickerListProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerList(props, ref);
  useTagPickerListStyles(state);
  return renderTagPickerList(state);
});

TagPickerList.displayName = 'TagPickerList';
