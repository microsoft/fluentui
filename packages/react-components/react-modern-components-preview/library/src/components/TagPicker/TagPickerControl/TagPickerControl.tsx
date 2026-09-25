'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerControlProps } from './TagPickerControl.types';
import { renderTagPickerControl } from './renderTagPickerControl';
import { useTagPickerControl } from './useTagPickerControl';
import { useTagPickerControlStyles } from './useTagPickerControlStyles.styles';

export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerControl(props, ref);
  useTagPickerControlStyles(state);
  return renderTagPickerControl(state);
});

TagPickerControl.displayName = 'TagPickerControl';
