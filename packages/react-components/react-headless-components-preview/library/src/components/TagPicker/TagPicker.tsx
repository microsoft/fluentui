'use client';

import { useTagPickerContextValues } from '@fluentui/react-tag-picker';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { TagPickerProps } from './TagPicker.types';

/**
 * Headless TagPicker component.
 */
export const TagPicker: ComponentWithoutRef<TagPickerProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'TagPicker',
  useTagPicker,
  useTagPickerContextValues,
  renderTagPicker,
);
