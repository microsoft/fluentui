import * as React from 'react';
import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { useTagPickerContextValues } from './useTagPickerContextValues';

/**
 * TagPicker component - TODO: add more docs
 */
export const TagPicker: React.FC<TagPickerProps> = React.memo(props => {
  const state = useTagPicker(props);
  const contextValues = useTagPickerContextValues(state);
  return renderTagPicker(state, contextValues);
});

TagPicker.displayName = 'TagPicker';
