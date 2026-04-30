'use client';

import { useTabListContextValues_unstable } from '@fluentui/react-tabs';

import type { TabListContextValues, TabListState } from './TabList.types';

export const useTabListContextValues = useTabListContextValues_unstable as (
  state: TabListState,
) => TabListContextValues;
