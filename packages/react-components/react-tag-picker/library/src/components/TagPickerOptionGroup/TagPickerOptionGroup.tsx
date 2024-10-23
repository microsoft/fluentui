import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerOptionGroup } from './useTagPickerOptionGroup';
import { renderTagPickerOptionGroup } from './renderTagPickerOptionGroup';
import { useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles.styles';
import type { TagPickerOptionGroupProps } from './TagPickerOptionGroup.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TagPickerOptionGroup component -
 * A TagPickerOptionGroup is a composite component that allows users to group TagPickerOptions.
 */
export const TagPickerOptionGroup: ForwardRefComponent<TagPickerOptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOptionGroup(props, ref);

  useTagPickerOptionGroupStyles(state);
  useCustomStyleHook_unstable('useTagPickerOptionGroupStyles_unstable')(state);
  return renderTagPickerOptionGroup(state);
});

TagPickerOptionGroup.displayName = 'TagPickerOptionGroup';
