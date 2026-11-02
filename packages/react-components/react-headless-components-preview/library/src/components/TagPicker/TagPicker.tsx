'use client';

import { useTagPickerContextValues } from '@fluentui/react-tag-picker';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Headless TagPicker component.
 */
export const TagPicker = /*#__PURE__*/ composeComponentWithoutRef(
  'TagPicker',
  useTagPicker,
  useTagPickerContextValues,
  renderTagPicker,
);
