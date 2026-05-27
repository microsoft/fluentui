'use client';

import { useTagGroupContextValues_unstable } from '@fluentui/react-tags';

import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export const useTagGroupContextValues = useTagGroupContextValues_unstable as (
  state: TagGroupState,
) => TagGroupContextValues;
