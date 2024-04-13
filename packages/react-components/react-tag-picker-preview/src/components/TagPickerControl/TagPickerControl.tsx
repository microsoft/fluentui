import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerControl } from './useTagPickerControl';
import { renderTagPickerControl } from './renderTagPickerControl';
import { useTagPickerControlStyles } from './useTagPickerControlStyles.styles';
import type { TagPickerControlProps } from './TagPickerControl.types';

/**
 * PickerControl component - TODO: add more docs
 */
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerControl(props, ref);

  useTagPickerControlStyles(state);
  return renderTagPickerControl(state);
});

TagPickerControl.displayName = 'TagPickerControl';
