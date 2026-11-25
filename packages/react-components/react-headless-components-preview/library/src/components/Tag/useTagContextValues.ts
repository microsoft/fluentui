'use client';

import { useTagAvatarContextValues_unstable } from '@fluentui/react-tags';

import type { TagContextValues, TagState } from './Tag.types';

export const useTagContextValues = useTagAvatarContextValues_unstable as unknown as (
  state: TagState,
) => TagContextValues;
