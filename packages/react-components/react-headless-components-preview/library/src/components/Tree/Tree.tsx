'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeProps } from './Tree.types';
import { useTree, useTreeContextValues } from './useTree';
import { renderTree } from './renderTree';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Renders nested `TreeItem` children in a hierarchical structure.
 *
 * The root tree owns the `tree` role, the open and checked items, and keyboard navigation. A `Tree`
 * rendered inside a branch `TreeItem` becomes its `group` subtree. The root tree must be labelled with
 * `aria-label` or `aria-labelledby`.
 */
export const Tree: ForwardRefComponent<TreeProps> = /*#__PURE__*/ composeComponent(
  'Tree',
  useTree,
  useTreeContextValues,
  renderTree,
);
