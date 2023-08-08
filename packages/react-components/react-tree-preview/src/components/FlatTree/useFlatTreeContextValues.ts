import { TreeContextValues, useTreeContextValues_unstable } from '../../Tree';
import type { FlatTreeState } from './FlatTree.types';

export const useFlatTreeContextValues_unstable: (state: FlatTreeState) => TreeContextValues =
  useTreeContextValues_unstable;
