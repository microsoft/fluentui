'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerGroup_unstable } from './useTagPickerGroup';
import type { TagPickerGroupProps } from './TagPickerGroup.types';
import { useTagGroupContextValues_unstable } from '@fluentui/react-tags';
import { renderTagPickerGroup_unstable } from './renderTagPickerGroup';
import { useTagPickerGroupStyles_unstable } from './useTagPickerGroupStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TagPickerGroup component -
 * A TagPickerGroup is a composite component that allows users to group tags together.
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  let state = useTagPickerGroup_unstable(props, ref);

  state = useTagPickerGroupStyles_unstable(state);
  state = useCustomStyleHook_unstable('useTagPickerGroupStyles_unstable')(state);
  return renderTagPickerGroup_unstable(state, useTagGroupContextValues_unstable(state));
});

TagPickerGroup.displayName = 'TagPickerGroup';
