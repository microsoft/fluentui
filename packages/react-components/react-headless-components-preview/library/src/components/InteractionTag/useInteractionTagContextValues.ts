'use client';

import { useInteractionTagContextValues_unstable } from '@fluentui/react-tags';

import type { InteractionTagContextValues, InteractionTagState } from './InteractionTag.types';

export const useInteractionTagContextValues = useInteractionTagContextValues_unstable as (
  state: InteractionTagState,
) => InteractionTagContextValues;
