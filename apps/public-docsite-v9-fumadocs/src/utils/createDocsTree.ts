import type { Root } from 'fumadocs-core/page-tree';
import { groupSiblings } from './groupSiblings';

export function createDocsTree(tree: Root): Root {
  return { ...tree, children: groupSiblings(tree.children) };
}
