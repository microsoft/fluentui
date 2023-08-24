import { TreeContextValues, renderTree_unstable } from '../../Tree';
import type { FlatTreeState } from './FlatTree.types';

export const renderFlatTree_unstable: (state: FlatTreeState, contextValues: TreeContextValues) => JSX.Element =
  renderTree_unstable;
