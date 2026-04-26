'use client';
import {
  useFlatTree_unstable,
  useFlatTreeContextValues_unstable,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree';
import type { FlatTreeState, FlatTreeContextValues } from './FlatTree.types';
export const useFlatTree = useFlatTree_unstable;
export const useFlatTreeContextValues = useFlatTreeContextValues_unstable as (
  state: FlatTreeState,
) => FlatTreeContextValues;
export const useHeadlessFlatTree = useHeadlessFlatTree_unstable;
