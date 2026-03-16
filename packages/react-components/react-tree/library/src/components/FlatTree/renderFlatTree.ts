import { renderTree_unstable } from '../../Tree';
import type { FlatTreeContextValues, FlatTreeState } from './FlatTree.types';
import type { JSXElement } from '@fluentui/react-utilities';
export const renderFlatTree_unstable: (state: FlatTreeState, contextValues: FlatTreeContextValues) => JSXElement =
  renderTree_unstable;
