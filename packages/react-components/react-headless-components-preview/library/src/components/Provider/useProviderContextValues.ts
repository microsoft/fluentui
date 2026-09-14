'use client';

import { useFluentProviderContextValues_unstable as useFluentProviderContextValues } from '@fluentui/react-provider';
import type { ProviderContextValues, ProviderState } from './Provider.types';

export const useProviderContextValues = useFluentProviderContextValues as (
  state: ProviderState,
) => ProviderContextValues;
