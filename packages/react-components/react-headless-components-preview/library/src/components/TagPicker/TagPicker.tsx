'use client';

import type { JSXElement } from '@fluentui/react-utilities';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import { useTagPickerContextValues } from './useTagPickerContextValues';
import type { TagPickerProps } from './TagPicker.types';

/**
 * Headless TagPicker component.
 *
 * Composes the trigger and popover via context — it has no DOM root of its own, so there is no
 * element to forward a ref to (mirrors the styled `TagPicker`, which is likewise refless).
 */
export const TagPicker = (props: TagPickerProps): JSXElement => {
  const state = useTagPicker(props);
  const contextValues = useTagPickerContextValues(state);

  return renderTagPicker(state, contextValues);
};

TagPicker.displayName = 'TagPicker';
