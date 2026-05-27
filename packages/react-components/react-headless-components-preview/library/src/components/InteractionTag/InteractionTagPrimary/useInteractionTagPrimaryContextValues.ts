'use client';

import { useTagAvatarContextValues_unstable } from '@fluentui/react-tags';

import type { InteractionTagPrimaryContextValues, InteractionTagPrimaryState } from './InteractionTagPrimary.types';

export const useInteractionTagPrimaryContextValues = useTagAvatarContextValues_unstable as unknown as (
  state: InteractionTagPrimaryState,
) => InteractionTagPrimaryContextValues;
