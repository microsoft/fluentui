import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerControl_unstable } from './useTagPickerControl';
import { renderTagPickerControl_unstable } from './renderTagPickerControl';
import { useTagPickerControlStyles_unstable } from './useTagPickerControlStyles.styles';
import type { TagPickerControlProps } from './TagPickerControl.types';

/**
 * PickerControl component - TODO: add more docs
 */
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerControl_unstable(props, ref);

  useTagPickerControlStyles_unstable(state);
  return renderTagPickerControl_unstable(state);
});

TagPickerControl.displayName = 'TagPickerControl';
