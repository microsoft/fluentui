import { renderTree_unstable } from '../../Tree';
import type { FlatTreeContextValues, FlatTreeState } from './FlatTree.types';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const renderFlatTree_unstable: (state: FlatTreeState, contextValues: FlatTreeContextValues) => JSX.Element =
  renderTree_unstable;
