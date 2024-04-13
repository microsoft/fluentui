import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerList } from './useTagPickerList';
import { renderTagPickerList } from './renderTagPickerList';
import { useTagPickerListStyles } from './useTagPickerListStyles.styles';
import type { TagPickerListProps } from './TagPickerList.types';

/**
 * TagPickerList component - TODO: add more docs
 */
export const TagPickerList: ForwardRefComponent<TagPickerListProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerList(props, ref);

  useTagPickerListStyles(state);
  return renderTagPickerList(state);
});

TagPickerList.displayName = 'TagPickerList';
