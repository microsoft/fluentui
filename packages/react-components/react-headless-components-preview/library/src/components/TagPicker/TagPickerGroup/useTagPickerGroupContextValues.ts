'use client';

import { useTagGroupContextValues_unstable } from '@fluentui/react-tags';

import type { TagGroupContextValues } from '../../TagGroup/TagGroup.types';
import type { TagPickerGroupState } from './TagPickerGroup.types';

export function useTagPickerGroupContextValues(state: TagPickerGroupState): TagGroupContextValues {
  // Headless group state omits styled variants, but the shared tag context requires neutral defaults.
  return useTagGroupContextValues_unstable({
    ...state,
    appearance: 'filled',
    size: 'medium',
  });
}
