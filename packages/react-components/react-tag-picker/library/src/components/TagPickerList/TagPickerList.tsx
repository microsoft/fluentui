import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerList_unstable } from './useTagPickerList';
import { renderTagPickerList_unstable } from './renderTagPickerList';
import { useTagPickerListStyles_unstable } from './useTagPickerListStyles.styles';
import type { TagPickerListProps } from './TagPickerList.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TagPickerList component -
 * A TagPickerList is a composite component that allows users to display a list of tag options to be selected.
 */
export const TagPickerList: ForwardRefComponent<TagPickerListProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerList_unstable(props, ref);

  useTagPickerListStyles_unstable(state);
  useCustomStyleHook_unstable('useTagPickerListStyles_unstable')(state);
  return renderTagPickerList_unstable(state);
});

TagPickerList.displayName = 'TagPickerList';
