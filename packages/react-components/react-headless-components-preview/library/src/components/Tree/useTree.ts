'use client';
import { useTree_unstable, useTreeContextValues_unstable } from '@fluentui/react-tree';
import type { TreeState, TreeContextValues } from './Tree.types';
export const useTree = useTree_unstable;
export const useTreeContextValues = useTreeContextValues_unstable as (state: TreeState) => TreeContextValues;
