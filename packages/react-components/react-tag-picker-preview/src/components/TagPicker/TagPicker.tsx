import * as React from 'react';
import { useTagPicker_unstable } from './useTagPicker';
import { renderTagPicker_unstable } from './renderTagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { useTagPickerContextValues } from './useTagPickerContextValues';

/**
 * TagPicker component - TODO: add more docs
 */
export const TagPicker: React.FC<TagPickerProps> = React.memo(props => {
  const state = useTagPicker_unstable(props);
  const contextValues = useTagPickerContextValues(state);
  return renderTagPicker_unstable(state, contextValues);
});

TagPicker.displayName = 'TagPicker';
