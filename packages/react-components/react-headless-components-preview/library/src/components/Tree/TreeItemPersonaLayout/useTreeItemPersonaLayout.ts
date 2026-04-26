'use client';
import {
  useTreeItemPersonaLayout_unstable,
  useTreeItemPersonaLayoutContextValues_unstable,
} from '@fluentui/react-tree';
import type { TreeItemPersonaLayoutState, TreeItemPersonaLayoutContextValues } from './TreeItemPersonaLayout.types';
export const useTreeItemPersonaLayout = useTreeItemPersonaLayout_unstable;
export const useTreeItemPersonaLayoutContextValues = useTreeItemPersonaLayoutContextValues_unstable as (
  state: TreeItemPersonaLayoutState,
) => TreeItemPersonaLayoutContextValues;
