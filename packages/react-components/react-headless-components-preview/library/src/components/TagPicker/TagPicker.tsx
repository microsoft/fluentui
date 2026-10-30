'use client';

import { useTagPickerContextValues } from '@fluentui/react-tag-picker';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Headless TagPicker component.
 */
export const TagPicker: {
  (props: TagPickerProps): ReturnType<typeof renderTagPicker>;
  displayName: string;
} = /*#__PURE__*/ composeComponentWithoutRef('TagPicker', useTagPicker, useTagPickerContextValues, renderTagPicker);
