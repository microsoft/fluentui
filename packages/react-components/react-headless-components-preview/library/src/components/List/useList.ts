'use client';

import { useList_unstable, useListContextValues_unstable } from '@fluentui/react-list';
import type { ListState, ListContextValues } from './List.types';

export const useList = useList_unstable;

export const useListContextValues = useListContextValues_unstable as (state: ListState) => ListContextValues;
