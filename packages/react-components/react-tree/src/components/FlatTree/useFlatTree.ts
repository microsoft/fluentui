import * as React from 'react';
import { useRootTree } from '../../hooks/useRootTree';
import { FlatTreeProps, FlatTreeState } from './FlatTree.types';

export const useFlatTree_unstable: (props: FlatTreeProps, ref: React.Ref<HTMLElement>) => FlatTreeState = useRootTree;
